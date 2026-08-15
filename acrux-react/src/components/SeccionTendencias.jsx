// Si tu proyecto es Next.js con App Router, agrega esta línea como primera
// línea del archivo (no es necesaria en Vite/CRA/Next Pages Router):
// "use client";

import { useEffect, useState } from "react";

/**
 * Sección de Noticias/Tendencias.
 * Lee directamente el archivo estático que publica el agente en
 * public/content/tendencias-latest.json — no necesita backend propio.
 */
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

  if (cargando) return <p>Cargando tendencias...</p>;
  if (error) return <p>No se pudieron cargar las tendencias por ahora.</p>;
  if (!datos) return null;

  return (
    <section>
      <h2>Tendencias y novedades</h2>
      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
        Actualizado: {new Date(datos.fecha_publicacion).toLocaleDateString("es-CO")}
      </p>

      <h3>Lo que está en tendencia</h3>
      <ul>
        {datos.tendencias_producto?.map((t, i) => (
          <li key={i}>
            <strong>{t.tendencia}</strong>: {t.descripcion}
          </li>
        ))}
      </ul>

      <h3>Ideas de contenido</h3>
      <ul>
        {datos.ideas_contenido?.map((idea, i) => (
          <li key={i}>{idea}</li>
        ))}
      </ul>
    </section>
  );
}
