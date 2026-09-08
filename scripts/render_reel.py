"""Renderiza un reel MP4 9:16 a partir de láminas PNG 4:5 (carrusel Acrux).

Uso en GitHub Actions (o local con ffmpeg + Pillow):
    python3 scripts/render_reel.py <carpeta_laminas> <musica.mp3> <salida.mp4> [duracion_s]

Ken Burns alternado + transiciones fundidas + música normalizada a -14 LUFS.
Diseñado para correr en runners gratuitos: súpermuestra 1.5x y sin deps
raras (solo Pillow + ffmpeg, ambos preinstalados/instalables en ubuntu).
"""
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

# Los runners nuevos de GitHub ya no traen ffmpeg preinstalado: instalarlo
# aquí mismo (el runner tiene sudo sin contraseña).
if not shutil.which('ffmpeg'):
    print('ffmpeg no presente: instalando...')
    subprocess.run(['sudo', 'apt-get', 'update', '-qq'], check=True)
    subprocess.run(['sudo', 'apt-get', 'install', '-y', '-qq', 'ffmpeg'], check=True)

W, H, FPS, FADE = 1080, 1920, 30, 0.6
FONDO = (11, 27, 58)  # #0B1B3A — azul Acrux


def main():
    carpeta = Path(sys.argv[1])
    musica = Path(sys.argv[2]) if len(sys.argv) > 2 else None
    salida = Path(sys.argv[3]) if len(sys.argv) > 3 else Path('renders/reels_listos/reel.mp4')
    dur_total = float(sys.argv[4]) if len(sys.argv) > 4 else 15.0

    slides = sorted(carpeta.glob('*.png'))
    if len(slides) < 2:
        raise SystemExit(f'Se necesitan >=2 láminas PNG en {carpeta} (hay {len(slides)})')

    # Lienzos 9:16: lámina centrada sobre el fondo del club
    tmp = Path('renders/tmp_lienzos')
    tmp.mkdir(parents=True, exist_ok=True)
    rutas = []
    for i, s in enumerate(slides):
        img = Image.open(s).convert('RGB')
        img.thumbnail((W, H), Image.LANCZOS)
        lienzo = Image.new('RGB', (W, H), FONDO)
        lienzo.paste(img, ((W - img.width) // 2, (H - img.height) // 2))
        p = tmp / f'{i:02d}.png'
        lienzo.save(p)
        rutas.append(p)

    n = len(rutas)
    dur_foto = (dur_total + (n - 1) * FADE) / n
    frames = max(1, int(dur_foto * FPS))

    cmd = ['ffmpeg', '-y', '-v', 'error']
    for r in rutas:
        cmd += ['-loop', '1', '-t', str(dur_foto), '-i', str(r)]

    fc = []
    for i in range(n):
        z = f"1+0.12*on/{frames}" if i % 2 == 0 else f"1.12-0.12*on/{frames}"
        fc.append(
            f"[{i}:v]scale={int(W * 1.5)}:{int(H * 1.5)},"
            f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
            f":d={frames}:s={W}x{H}:fps={FPS},setsar=1,format=yuv420p[v{i}]"
        )
    prev, t = 'v0', dur_foto - FADE
    for i in range(1, n):
        out = f'x{i}' if i < n - 1 else 'vout'
        fc.append(f"[{prev}][v{i}]xfade=transition=fade:duration={FADE}:offset={t:.2f}[{out}]")
        prev, t = out, t + dur_foto - FADE

    tiene_musica = musica and musica.exists()
    if tiene_musica:
        cmd += ['-stream_loop', '-1', '-i', str(musica)]
        fc.append(
            f"[{n}:a]afade=t=out:st={dur_total - 1:.2f}:d=1.0,"
            f"alimiter=limit=0.95,loudnorm=I=-14:TP=-1.5:LRA=11[aout]"
        )

    cmd += ['-filter_complex', ';'.join(fc), '-map', f'[{prev}]']
    if tiene_musica:
        cmd += ['-map', '[aout]']
    else:
        cmd += ['-an']
    cmd += ['-t', f'{dur_total:.2f}', '-r', str(FPS), '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p', '-preset', 'fast', '-crf', '23',
            '-c:a', 'aac', '-b:a', '128k', '-shortest', str(salida)]

    salida.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0 or not salida.exists():
        raise SystemExit(f'ffmpeg falló: {r.stderr[-500:]}')
    print(f'REEL OK: {salida} ({salida.stat().st_size // 1024} KB, {dur_total:.0f}s, {n} láminas)')


if __name__ == '__main__':
    main()
