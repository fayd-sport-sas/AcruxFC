import { useEffect, useState } from "react";

/**
 * Sección de Tendencias — lo que publica el agente (/publicar-web).
 * Modelo de diseño inspirado en z.ai: tipografía grande, números fantasma,
 * bordes finos, etiquetas en píldora y divisores de pelo.
 * Paleta: azules del club (#1A3A8A / #4A8BFF).
 */

const pad2 = (n) => String(n).padStart(2, "0");

function EncabezadoGrupo({ indice, titulo }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] font-bold tracking-[2px] text-[#4A8BFF] tabular-nums">{indice}</span>
      <h3 className="text-sm font-bold tracking-[2px] uppercase text-white/70 whitespace-nowrap">{titulo}</h3>
      <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
    </div>
  );
}

export default function SeccionTendencias() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section id="tendencias" className="w-full py-16 sm:py-20 px-4 sm:px-8" aria-labelledby="tendencias-title">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado centrado */}
        <header className="text-center mb-14">
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

        {/* Tendencias de producto */}
        {datos.tendencias_producto?.length > 0 && (
          <div className="mb-14">
            <EncabezadoGrupo indice="01" titulo="Lo que está en tendencia" />
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
              {datos.tendencias_producto.map((tendencia, i) => (
                <li key={i}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05] hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
                    <div className="text-4xl font-extrabold text-white/10 tabular-nums mb-3 group-hover:text-[#4A8BFF]/25 transition-colors">{pad2(i + 1)}</div>
                    <h4 className="text-white font-bold text-base mb-2 leading-snug">{tendencia.tendencia}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{tendencia.descripcion}</p>
                    {tendencia.fuente && (
                      <p className="mt-4 text-xs text-white/30 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#4A8BFF]" aria-hidden="true" />
                        {tendencia.fuente}
                      </p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tendencias de contenido */}
        {datos.tendencias_contenido?.length > 0 && (
          <div className="mb-14">
            <EncabezadoGrupo indice="02" titulo="Tendencias en redes" />
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
              {datos.tendencias_contenido.map((item, i) => (
                <li key={i}>
                  <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05] hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="text-4xl font-extrabold text-white/10 tabular-nums">{pad2(i + 1)}</div>
                      {item.plataforma && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-[11px] font-semibold tracking-wide">
                          {item.plataforma}
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-bold text-base mb-2 leading-snug">{item.formato}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.descripcion}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ideas de contenido */}
        {datos.ideas_contenido?.length > 0 && (
          <div className="mb-14">
            <EncabezadoGrupo indice="03" titulo="Ideas listas para grabar" />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
              {datos.ideas_contenido.map((idea, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[#4A8BFF]/30">
                  <span className="text-sm font-bold text-[#4A8BFF] tabular-nums pt-0.5 shrink-0">{pad2(i + 1)}</span>
                  <p className="text-white/60 text-sm leading-relaxed">{idea}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sugerencias de campaña */}
        {datos.sugerencias_campana?.length > 0 && (
          <div className="rounded-2xl border border-[#4A8BFF]/25 bg-gradient-to-b from-[#1A3A8A]/20 via-[#1A3A8A]/5 to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-sm font-bold tracking-[2px] uppercase text-[#4A8BFF] whitespace-nowrap">Sugerencias de campaña</h3>
              <span className="h-px flex-1 bg-[#4A8BFF]/20" aria-hidden="true" />
            </div>
            <ul className="space-y-4 list-none">
              {datos.sugerencias_campana.map((sugerencia, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-1 shrink-0 text-[#4A8BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/70 text-sm leading-relaxed">{sugerencia}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}
