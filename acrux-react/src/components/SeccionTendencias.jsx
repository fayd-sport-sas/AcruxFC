import { useEffect, useState } from "react";

/**
 * Sección de Tendencias — lo que publica el agente (/publicar-web).
 * Modelo de diseño z.ai con paleta del club (#1A3A8A / #4A8BFF):
 * 4 botones tipo píldora; cada uno despliega su grupo en un panel
 * expandible de altura fija que se lee con scroll interno.
 */

const pad2 = (n) => String(n).padStart(2, "0");

export default function SeccionTendencias() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [activa, setActiva] = useState("producto");

  useEffect(() => {
    fetch("/content/tendencias-latest.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el contenido");
        return res.json();
      })
      .then((json) => setDatos(json))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return (
    <section className="w-full py-16 px-4" aria-label="Tendencias">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/40 animate-pulse">Cargando tendencias…</p>
      </div>
    </section>
  );

  if (error) return null;

  if (!datos) return null;

  const fechaFormateada = datos.fecha_publicacion
    ? new Date(datos.fecha_publicacion).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const grupos = [
    { id: "producto", numero: "01", etiqueta: "Lo que está en tendencia", items: datos.tendencias_producto || [] },
    { id: "redes", numero: "02", etiqueta: "Tendencias en redes", items: datos.tendencias_contenido || [] },
    { id: "ideas", numero: "03", etiqueta: "Ideas listas para grabar", items: datos.ideas_contenido || [] },
    { id: "campana", numero: "04", etiqueta: "Sugerencias de campañas", items: datos.sugerencias_campana || [] },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="tendencias" className="w-full py-16 sm:py-20 px-4 sm:px-8" aria-labelledby="tendencias-title">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado centrado */}
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-xs font-semibold tracking-[2px] uppercase mb-5">
            Tendencias del mercado
          </span>
          <h2 id="tendencias-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Tendencias y{" "}
            <span className="bg-gradient-to-r from-[#4A8BFF] to-[#6AABFF] bg-clip-text text-transparent">Novedades</span>
          </h2>
          {fechaFormateada && (
            <p className="text-white/40 text-sm">
              Actualizado: {fechaFormateada}
            </p>
          )}
        </header>

        {/* Botones: cada uno despliega su sección */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6" role="tablist" aria-label="Secciones de tendencias">
          {grupos.map((g) => {
            const esActiva = activa === g.id;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={esActiva}
                aria-controls={`panel-${g.id}`}
                onClick={() => setActiva(g.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] ${
                  esActiva
                    ? "bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] text-white shadow-lg shadow-[#1A3A8A]/40 scale-105"
                    : "bg-white/5 text-white/70 border border-white/10 hover:border-[#4A8BFF]/50 hover:text-white"
                }`}
              >
                <span className={`tabular-nums text-xs ${esActiva ? "text-white/70" : "text-[#4A8BFF]"}`}>{g.numero}</span>
                {g.etiqueta}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${esActiva ? "bg-white/20 text-white" : "bg-white/10 text-white/50"}`}>
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel expandible de altura fija, se lee con scroll */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div
            className="max-h-[26rem] overflow-y-auto p-5 sm:p-6"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#4A8BFF transparent" }}
          >
            {/* 01 — Tendencias de producto */}
            {activa === "producto" && (
              <ul id="panel-producto" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {datos.tendencias_producto.map((t, i) => (
                  <li key={i}>
                    <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05]">
                      <div className="text-3xl font-extrabold text-white/10 tabular-nums mb-2 group-hover:text-[#4A8BFF]/25 transition-colors">{pad2(i + 1)}</div>
                      <h4 className="text-white font-bold text-sm mb-2 leading-snug">{t.tendencia}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{t.descripcion}</p>
                      {t.fuente && (
                        <p className="mt-3 text-[11px] text-white/30 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#4A8BFF]" aria-hidden="true" />
                          {t.fuente}
                        </p>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {/* 02 — Tendencias en redes */}
            {activa === "redes" && (
              <ul id="panel-redes" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {datos.tendencias_contenido.map((item, i) => (
                  <li key={i}>
                    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05]">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-3xl font-extrabold text-white/10 tabular-nums">{pad2(i + 1)}</div>
                        {item.plataforma && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-[11px] font-semibold tracking-wide">
                            {item.plataforma}
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-sm mb-2 leading-snug">{item.formato}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{item.descripcion}</p>
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {/* 03 — Ideas de contenido */}
            {activa === "ideas" && (
              <ul id="panel-ideas" role="tabpanel" className="space-y-3 list-none">
                {datos.ideas_contenido.map((idea, i) => (
                  <li key={i} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[#4A8BFF]/30">
                    <span className="text-sm font-bold text-[#4A8BFF] tabular-nums pt-0.5 shrink-0">{pad2(i + 1)}</span>
                    <p className="text-white/60 text-sm leading-relaxed">{idea}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* 04 — Sugerencias de campaña */}
            {activa === "campana" && (
              <div id="panel-campana" role="tabpanel" className="bg-gradient-to-b from-[#1A3A8A]/20 via-[#1A3A8A]/5 to-transparent rounded-xl border border-[#4A8BFF]/25 p-5 sm:p-6">
                <ul className="space-y-4 list-none">
                  {datos.sugerencias_campana.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-1 shrink-0 text-[#4A8BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-white/70 text-sm leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
