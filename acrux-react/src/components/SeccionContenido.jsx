import { useEffect, useState } from "react";

/**
 * Sección de Contenido — los videos que publica el agente (/publicar → Web).
 * Lee /content/videos-latest.json (lo escribe publicar_video_en_web()).
 * Muestra solo los videos de YouTube, con el mismo diseño de la sección
 * Entrevistas: grilla de tarjetas con miniatura + modal para reproducir.
 */

const pad2 = (n) => String(n).padStart(2, "0");

function formatearFecha(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
  } catch {
    return "";
  }
}

function youtubeId(url) {
  if (!url) return null;
  const m =
    String(url).match(/[?&]v=([\w-]{11})/) ||
    String(url).match(/youtu\.be\/([\w-]{11})/);
  return m ? m[1] : null;
}

export default function SeccionContenido() {
  const [videos, setVideos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [sinContenido, setSinContenido] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch("/content/videos-latest.json")
      .then((res) => {
        if (res.status === 404) {
          setSinContenido(true);
          return [];
        }
        if (!res.ok) throw new Error("No se pudo cargar");
        return res.json();
      })
      .then((json) => {
        // Solo entradas con enlace de YouTube → extraer el ID del video
        const lista = (Array.isArray(json) ? json : [])
          .map((v) => ({
            id: youtubeId(v?.enlaces?.YouTube),
            titulo: v?.titulo || "Video Acrux FC",
            fecha: formatearFecha(v?.fecha),
          }))
          .filter((v) => v.id);
        setVideos(lista);
      })
      .catch(() => setSinContenido(true))
      .finally(() => setCargando(false));
  }, []);

  // Cerrar el modal con Escape y bloquear el scroll de fondo
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (cargando)
    return (
      <section id="contenido" className="w-full py-16 px-4" aria-label="Contenido">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/40 animate-pulse">Cargando videos…</p>
        </div>
      </section>
    );

  if (sinContenido || videos.length === 0) return null;

  return (
    <section
      id="contenido"
      className="py-20 sm:py-24 px-4 sm:px-8"
      aria-labelledby="contenido-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado — mismo formato que Entrevistas */}
        <div className="text-center mb-10">
          <p className="text-[#4A8BFF] font-black tracking-widest text-xs uppercase mb-2">
            Contenido Acrux
          </p>
          <h2
            id="contenido-title"
            className="text-white text-3xl sm:text-4xl font-black"
          >
            LO ÚLTIMO <span className="text-[#4A8BFF]">DEL CLUB</span>
          </h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            Videos editados y publicados automáticamente en nuestro canal de
            YouTube.
          </p>
        </div>

        {/* Grilla de tarjetas — mismo estilo que Entrevistas */}
        <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 list-none">
          {videos.map((video) => (
            <li key={video.id} className="transition-all ease-out">
              <button
                type="button"
                onClick={() => setActive(video)}
                className="group w-full text-left relative aspect-video overflow-hidden rounded-2xl bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/30 hover:border-[#4A8BFF]/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1A3A8A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                aria-label={`Reproducir video: ${video.titulo}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  width="800"
                  height="450"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4A8BFF]/90 group-hover:bg-[#4A8BFF] flex items-center justify-center text-white text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110 shadow-2xl shadow-[#1A3A8A]/50"
                    aria-hidden="true"
                  >
                    ▶
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#4A8BFF] mb-1">
                    <span aria-hidden="true">⚽</span>
                    <span>Acrux FC</span>
                    {video.fecha && (
                      <span className="ml-auto bg-black/70 px-2 py-0.5 rounded text-white text-xs">
                        {video.fecha}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black leading-tight line-clamp-2">
                    {video.titulo}
                  </h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para reproducir — mismo formato que Entrevistas */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.titulo}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out] motion-reduce:animate-none"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Cerrar video"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ✕
          </button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-white">
              <p className="text-sm text-[#4A8BFF] font-black mb-1">
                Acrux FC
              </p>
              <h3 className="text-xl sm:text-2xl font-black">{active.titulo}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
