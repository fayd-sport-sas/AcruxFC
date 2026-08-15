import { useEffect, useState } from "react";

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
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 animate-pulse">Cargando tendencias...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500">No se pudieron cargar las tendencias por ahora.</p>
      </div>
    </section>
  );

  if (!datos) return null;

  const fechaFormateada = datos.fecha_publicacion
    ? new Date(datos.fecha_publicacion).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-600/50 mb-4">
            <span className="text-green-400 text-sm font-medium">Tendencias del mercado</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Tendencias y <span className="text-green-400">Novedades</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Actualizado: {fechaFormateada}
          </p>
        </div>

        {/* Tendencias de Producto */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            Lo que está en tendencia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datos.tendencias_producto?.map((tendencia, i) => (
              <div
                key={i}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-green-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-lg">●</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-2">{tendencia.tendencia}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{tendencia.descripcion}</p>
                    {tendencia.fuente && (
                      <p className="text-green-600 text-xs mt-2">📌 {tendencia.fuente}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tendencias de Contenido */}
        {datos.tendencias_contenido && datos.tendencias_contenido.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Tendencias en redes sociales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {datos.tendencias_contenido?.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-blue-600/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400">
                        {item.plataforma === "TikTok" ? "🎵" : item.plataforma === "Instagram" ? "📸" : "📱"}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-2">{item.formato}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.descripcion}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                        {item.plataforma}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ideas de Contenido */}
        {datos.ideas_contenido && datos.ideas_contenido.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
              Ideas de contenido listas para grabar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {datos.ideas_contenido?.map((idea, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-yellow-900/20 to-transparent border border-yellow-800/30 rounded-xl p-4 flex items-start gap-3 hover:border-yellow-600/50 transition-all duration-300"
                >
                  <span className="w-6 h-6 rounded-full bg-yellow-600/30 flex items-center justify-center flex-shrink-0 text-yellow-400 text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed">{idea}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sugerencias de Campaña */}
        {datos.sugerencias_campana && datos.sugerencias_campana.length > 0 && (
          <div className="bg-green-900/10 border border-green-800/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
              💡 Sugerencias de campaña
            </h3>
            <ul className="space-y-3">
              {datos.sugerencias_campana?.map((sugerencia, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{sugerencia}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}
