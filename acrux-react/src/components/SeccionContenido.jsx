import { useEffect, useState } from "react";

/**
 * Sección de Videos — los videos que publica el agente (/publicar → Web).
 * Lee /content/videos-latest.json (lo escribe publicar_video_en_web()).
 * Diseño con la paleta del club (#1A3A8A / #4A8BFF), igual que SeccionTendencias.
 * El último video se reproduce embebido de YouTube; el resto quedan como tarjetas.
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
  const m = url.match(/[?&]v=([\w-]{11})/) || url.match(/youtu\.be\/([\w-]{11})/);
  return m ? m[1] : null;
}

const ETIQUETAS = {
  YouTube: { icono: "▶", color: "#FF0000" },
  Facebook: { icono: "f", color: "#1877F2" },
  Instagram: { icono: "◙", color: "#E1306C" },
};

export default function SeccionContenido() {
  const [videos, setVideos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [sinContenido, setSinContenido] = useState(false);

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
      .then((json) => setVideos(Array.isArray(json) ? json : []))
      .catch(() => setSinContenido(true))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return (
    <section id="contenido" className="w-full py-16 px-4" aria-label="Videos">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/40 animate-pulse">Cargando videos…</p>
      </div>
    </section>
  );

  if (sinContenido || !videos || videos.length === 0) return null;

  const [destacado, ...anteriores] = videos;
  const ytDestacado = youtubeId(destacado?.enlaces?.YouTube);

  return (
    <section id="contenido" className="w-full py-16 px-4" aria-label="Contenido publicado del club">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <p className="text-[#4A8BFF] font-semibold tracking-widest text-xs uppercase mb-2">
            Contenido Acrux
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-black">
            Lo último del club
          </h2>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto">
            Videos editados por nuestro sistema automatizado y publicados en todas
            nuestras plataformas.
          </p>
        </div>

        {/* Video destacado (embebido si es YouTube) */}
        {destacado && (
          <div className="rounded-2xl overflow-hidden border border-[#1A3A8A]/60 bg-[#0B1531] shadow-2xl mb-8">
            {ytDestacado ? (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ytDestacado}`}
                  title={destacado.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-white font-bold text-lg">{destacado.titulo}</h3>
                <p className="text-white/40 text-sm">
                  {formatearFecha(destacado.fecha)}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(destacado.enlaces || {}).map(([plataforma, url]) => {
                  const info = ETIQUETAS[plataforma] || { icono: "•", color: "#4A8BFF" };
                  return (
                    <a
                      key={plataforma}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition hover:brightness-110"
                      style={{ backgroundColor: info.color }}
                    >
                      <span aria-hidden>{info.icono}</span> {plataforma}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Videos anteriores */}
        {anteriores.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anteriores.map((v, i) => {
              const yt = youtubeId(v?.enlaces?.YouTube);
              return (
                <article
                  key={`${v.fecha}-${i}`}
                  className="rounded-xl border border-[#1A3A8A]/50 bg-[#0B1531] p-4 hover:border-[#4A8BFF]/60 transition"
                >
                  {yt && (
                    <img
                      src={`https://i.ytimg.com/vi/${yt}/mqdefault.jpg`}
                      alt={v.titulo}
                      className="rounded-lg w-full mb-3"
                      loading="lazy"
                    />
                  )}
                  <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {v.titulo}
                  </h4>
                  <p className="text-white/40 text-xs mb-3">
                    {formatearFecha(v.fecha)}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(v.enlaces || {}).map(([plataforma, url]) => {
                      const info = ETIQUETAS[plataforma] || { icono: "•", color: "#4A8BFF" };
                      return (
                        <a
                          key={plataforma}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full font-semibold text-white transition hover:brightness-110"
                          style={{ backgroundColor: info.color }}
                        >
                          {info.icono} {plataforma}
                        </a>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
