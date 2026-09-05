/**
 * Serverless Vercel — recibe inscripciones de la convocatoria desde el
 * formulario y las guarda en el repo de GitHub (archivo privado fuera de
 * public/): convocatoria_data/inscripciones.jsonl
 *
 * El sistema de la casa (Acrux-Content-System) sincroniza desde este archivo
 * con POST /convocatoria/sincronizar-web cada 30 min (workflow I de n8n).
 * Así las inscripciones se capturan aunque el PC del club esté apagado.
 *
 * Requiere variables de entorno en Vercel:
 *   GITHUB_TOKEN  (PAT con acceso al repo)
 *   GITHUB_REPO   (ej: "fayd-sport-sas/pagina-web-acrux")
 *   GITHUB_BRANCH (opcional, default "main")
 */

const RUTA = 'convocatoria_data/inscripciones.jsonl';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'solo POST' });
  }
  const b = req.body || {};

  // Honeypot anti-bots: los campos ocultos llegan llenos solo de bots
  if (b.website) return res.status(200).json({ ok: true, id: 'ignorado' });

  // Validación server-side (espejo del backend de la casa)
  const nombre = String(b.nombre || '').trim();
  const telefono = String(b.telefono || '').replace(/\D/g, '');
  const nombre_jugador = String(b.nombre_jugador || '').trim();
  const edad = Number(b.edad) || 0;
  const categoria = String(b.categoria || '').trim();
  if (nombre.length < 3 || nombre_jugador.length < 3) {
    return res.status(400).json({ ok: false, error: 'datos incompletos' });
  }
  if (telefono.length < 7 || telefono.length > 15) {
    return res.status(400).json({ ok: false, error: 'teléfono inválido' });
  }
  if (edad < 8 || edad > 25) {
    return res.status(400).json({ ok: false, error: 'edad fuera de rango' });
  }
  if (!['2010', '2012', 'sub13', 'sub15', 'sub17', 'sub20'].includes(categoria)) {
    return res.status(400).json({ ok: false, error: 'categoría no válida' });
  }

  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO = process.env.GITHUB_REPO;
  const BRANCH = process.env.GITHUB_BRANCH || 'main';
  if (!TOKEN || !REPO) {
    return res.status(500).json({ ok: false, error: 'servidor sin configurar (GITHUB_TOKEN/GITHUB_REPO)' });
  }

  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'User-Agent': 'acrux-web-ingest',
    'Content-Type': 'application/json',
  };

  try {
    // 1) Leer el archivo actual (para anexar y obtener el sha)
    let sha = null;
    let contenido = '';
    const get = await fetch(`https://api.github.com/repos/${REPO}/contents/${RUTA}?ref=${BRANCH}`, { headers });
    if (get.status === 200) {
      const j = await get.json();
      sha = j.sha;
      contenido = Buffer.from(j.content, 'base64').toString('utf-8');
    } else if (get.status !== 404) {
      return res.status(502).json({ ok: false, error: `github leyó ${get.status}` });
    }

    // 2) Anexar la nueva inscripción
    const id = 'web-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const linea = JSON.stringify({
      id,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      nombre,
      telefono,
      nombre_jugador,
      edad,
      categoria,
      posicion: String(b.posicion || '').toUpperCase() || null,
      fecha_nacimiento: b.fecha_nacimiento || null,
      fuente: 'web',
    });
    const nuevo = (contenido ? contenido.trimEnd() + '\n' : '') + linea + '\n';

    // 3) Commit vía Contents API
    const put = await fetch(`https://api.github.com/repos/${REPO}/contents/${RUTA}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Inscripción web: ${nombre_jugador} (${categoria})`,
        content: Buffer.from(nuevo, 'utf-8').toString('base64'),
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!put.ok) {
      const t = await put.text();
      return res.status(502).json({ ok: false, error: `github escribió ${put.status}: ${t.slice(0, 120)}` });
    }

    return res.status(200).json({ ok: true, id });
  } catch (e) {
    return res.status(502).json({ ok: false, error: String(e).slice(0, 150) });
  }
}
