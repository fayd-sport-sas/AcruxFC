/**
 * ✅ ACRUX FC — App.jsx v4.0
 * ─────────────────────────────────────────────
 * Evolución de v3 con 3 secciones nuevas ultra-interactivas.
 * Drop-in replacement: reemplaza tu src/App.jsx actual.
 *
 * 🆕 Novedades vs v3:
 * - Quiz "Qué posición jugás" — 5 preguntas, resultado compartible
 * - Countdown al próximo partido en tiempo real
 * - Galería con filtros por categoría
 *
 * ⚠️  ANTES DE DESPLEGAR — CONFIGURAR (además de v3):
 *   10. CONFIG.nextMatch → datos del próximo partido
 *   11. QUIZ_QUESTIONS → personalizá las preguntas si querés
 *   12. POSITIONS → ajustá los colores/traits si querés
 *   13. GALLERY → agregá `category` a cada item
 */

import { useState, useEffect, useId, useRef, useCallback, useMemo } from 'react';

// ════════════════════════════════════════════
// CONFIGURACIÓN
// ════════════════════════════════════════════
const CONFIG = {
  brand: {
    name: 'ACRUX',
    fullName: 'Acrux Fútbol Club',
    logo: '/foto/logo/logo_web_200px.png',
    city: 'Sibaté Cundinamarca',
  },
  whatsapp: {
    number: '573222676860', // ⚠️ CAMBIAR por tu número real con código de país
    defaultMessage: 'Hola Acrux, quiero asegurar la prueba gratis para mi hijo',
  },
  location: {
    venue: 'Cancha Sanmartín',
    address: 'Carrera 13 #6 -80 San Juan',
    neighborhood: 'Sibate Cundinamarca',
    mapsUrl: 'https://maps.google.com/?q=Acrux+Futbol+Club+Sibate+Cundinamarca',
    city: 'Sibate, Cundinamarca',
  },
  schedule: {
    weekdays: 'Lunes, miércoles y viernes · 7:00 AM - 10:00 AM',
    weekends: 'Sábados · 9:00 AM - 11:00 AM',
    ageGroups: 'Categorías sub-13, sub-15, sub-17 y mayores',
  },
  price: {
    monthly: 'Mensualidad desde $90.000 COP',
    trial: 'Primera clase gratis · Sin compromiso',
  },
  social: {
    instagram: 'https://www.instagram.com/acruxfutbolclub?igsh=am5qYmhteWlhdXUw',
    facebook: 'https://www.facebook.com/AcruxfcFutbolclub',
    tiktok: 'https://tiktok.com/@acruxfc',
  },
  stats: {
    players: 85,
    trainings: 480,
    yearsActive: 6,
    cupsWon: 12,
  },
  // 🆕 Próximo partido (countdown)
  nextMatch: {
    opponent: 'Envigado',
    date: '2026-08-10T16:00:00', // ⚠️ CAMBIAR a la fecha real
    location: 'Cancha San Martin',
    isHome: true,
    category: 'Sub-17',
  },
  enrollment: {
    totalSpots: 20,
    initialAvailable: 6,
    minAge: 12,
    maxAge: 27,
    guaranteeHours: 24,
  },
};

const NAV_LINKS = [
  { href: '#info', label: 'Info' },
  { href: '#galeria', label: 'Galería' },
  { href: '#news', label: 'Noticias' },
  { href: '#videos', label: 'Videos' },
  { href: '#quiz', label: 'Quiz' },
  { href: '#vota', label: 'Votá' },
  { href: '#contacto', label: 'Contacto' },
];

// 🆕 GALLERY ahora con category para filtros
const GALLERY = [
  { src: '/foto/img_a04.jpg', alt: 'Entrenamiento técnico', caption: 'Entrenamiento técnico', emoji: '⚡', category: 'sub15' },
  { src: '/foto/img_a01.jpg', alt: 'Entrenamiento físico', caption: 'Entrenamiento físico', emoji: '💪', category: 'sub17' },
  { src: '/foto/img_09.jpg', alt: 'Partido amistoso', caption: 'Partido amistoso', emoji: '🏟️', category: 'sub17' },
  { src: '/foto/img_10.jpg', alt: 'Celebración de gol', caption: 'Celebración', emoji: '🎉', category: 'sub15' },
  { src: '/foto/img_11.jpg', alt: 'Equipo completo', caption: 'Equipo Acrux', emoji: '🤝', category: 'all' },
  { src: '/foto/img_a02.jpg', alt: 'Trabajo con balón', caption: 'Trabajo con balón', emoji: '⚽', category: 'sub13' },
  { src: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800', alt: 'Gol en el último minuto', caption: 'Gol en el último minuto', emoji: '🔥', category: 'sub17' },
  { src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800', alt: 'Entrenamiento táctico', caption: 'Trabajo táctico', emoji: '🧠', category: 'sub15' },
  { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', alt: 'Resistencia física', caption: 'Resistencia', emoji: '🏃', category: 'sub13' },
];

const GALLERY_FILTERS = [
  { id: 'all', label: 'Todas', emoji: '📸' },
  { id: 'sub13', label: 'Sub-13', emoji: '🧒' },
  { id: 'sub15', label: 'Sub-15', emoji: '👦' },
  { id: 'sub17', label: 'Sub-17', emoji: '🧑' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Carolina H., mamá de Santiago', age: 14, months: 3, initials: 'CH', quote: 'Mi hijo llegó sin confianza y en 2 meses ya es titular del equipo. La metodología y el ambiente son increíbles.' },
  { id: 2, name: 'Andrés M., papá de Mateo', age: 16, months: 12, initials: 'AM', quote: 'El cambio en mi hijo ha sido increíble, no solo en lo deportivo sino también en su disciplina y valores.' },
  { id: 3, name: 'Diana P., mamá de Valentina', age: 13, months: 6, initials: 'DP', quote: 'Entrenadores serios, comunicación constante y mi hija ama ir a entrenar. Lo recomiendo con los ojos cerrados.' },
  { id: 4, name: 'Roberto S., papá de Nicolás', age: 17, months: 18, initials: 'RS', quote: 'Llevamos año y medio y los resultados se notan. Pasó de la banca a ser capitán del equipo escolar.' },
];

const NEWS = [
  { id: 'n1', type: 'match', title: 'Sub-17 venció 3-1 a Academia Sur en el clásico', description: 'Goles de Mateo, Santiago y Nicolás. Gran actuación de todo el equipo en condición de visitante.', date: '2026-07-28', badge: '🏆 PARTIDO', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800', href: '#' },
  { id: 'n2', type: 'campaign', title: 'Becas deportivas 2026 abiertas', description: 'Hasta 50% de descuento para jugadores con talento y buen rendimiento académico. Postulate hasta el 30 de agosto.', date: '2026-08-01', badge: '🎁 CAMPAÑA', badgeColor: 'yellow', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800', href: '#contacto' },
  { id: 'n3', type: 'news', title: 'Valentina fue convocada a la selección Valle', description: 'Nuestra jugadora de 13 años representará al Valle del Cauca en el torneo nacional sub-15.', date: '2026-07-22', badge: '⭐ NOTICIA', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', href: '#' },
  { id: 'n4', type: 'match', title: 'Sub-15 ganó la Copa Comfandi 2026', description: 'Torneo invicto: 5 partidos, 4 victorias, 1 empate. ¡Campeones!', date: '2026-07-15', badge: '🏆 TÍTULO', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', href: '#' },
  { id: 'n5', type: 'campaign', title: 'Torneo Relámpago este sábado', description: '3v3 mixto para todas las categorías. Inscripción gratis para jugadores Acrux. Cupos limitados.', date: '2026-08-05', badge: '🔥 EVENTO', badgeColor: 'red', image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800', href: '#contacto' },
  { id: 'n6', type: 'news', title: 'Scouting de Millonarios en nuestras canchas', description: 'Ojeadores del club bogotano visitaron nuestros entrenamientos. 3 jugadores fueron preseleccionados.', date: '2026-07-10', badge: '⭐ NOTICIA', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800', href: '#' },
  { id: 'n6', type: 'news', title: 'Scouting de Millonarios en nuestras canchas', description: 'Ojeadores del club bogotano visitaron nuestros entrenamientos. 3 jugadores fueron preseleccionados.', date: '2026-07-10', badge: '⭐ NOTICIA', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800', href: '#' },

];

const VIDEOS = [
  { id: 'v1', title: 'Mateo: "Acrux me cambió la vida"', player: 'Mateo R. · Sub-17', duration: '2:14', youtubeId: 'dQw4w9WgXcQ', description: 'Mateo cuenta cómo llegó a Acrux hace un año y su progreso en el equipo.', emoji: '🎙️' },
  { id: 'v2', title: 'Valentina: de 0 a seleccionada', player: 'Valentina P. · Sub-15', duration: '1:48', youtubeId: 'dQw4w9WgXcQ', description: 'El camino de Valentina hasta la convocatoria a la selección Valle.', emoji: '⭐' },
  { id: 'v3', title: 'Entrenador: "Nuestra metodología"', player: 'Prof. Carlos · DT Principal', duration: '3:22', youtubeId: 'dQw4w9WgXcQ', description: 'El profe Carlos explica cómo entrenamos y qué nos diferencia de otras academias.', emoji: '👨‍🏫' },
  { id: 'v4', title: 'Mamá de Santiago: testimonio', player: 'Carolina H. · Mamá de jugador', duration: '1:35', youtubeId: 'dQw4w9WgXcQ', description: 'Carolina nos cuenta por qué eligió Acrux y qué vio en su hijo en estos meses.', emoji: '💬' },
];

const PLAYERS = [
  { id: 'p1', name: 'Mateo Restrepo', position: 'Delantero', age: 16, category: 'Sub-17', achievement: '8 goles en 6 partidos', initials: 'MR', color: 'from-[#1A3A8A] to-[#4A8BFF]' },
  { id: 'p2', name: 'Valentina Pérez', position: 'Mediocampista', age: 13, category: 'Sub-15', achievement: 'Convocada a la selección Valle', initials: 'VP', color: 'from-[#4A8BFF] to-[#6AABFF]' },
  { id: 'p3', name: 'Santiago Henao', position: 'Defensor', age: 14, category: 'Sub-15', achievement: '0 goles recibidos en su zona', initials: 'SH', color: 'from-[#1A3A8A] to-[#2A5AC8]' },
  { id: 'p4', name: 'Nicolás Salazar', position: 'Portero', age: 17, category: 'Sub-17', achievement: '5 porterías imbatidas', initials: 'NS', color: 'from-[#2A5AC8] to-[#5A9BFF]' },
];

// 🆕 Posiciones para el quiz
const POSITIONS = [
  {
    id: 'GK',
    name: 'Arquero',
    emoji: '🧤',
    tagline: 'El muro del equipo',
    color: 'from-yellow-500 to-amber-600',
    traits: ['Reflejos rápidos', 'Lectura del juego', 'Personalidad fuerte', 'Líder silencioso'],
  },
  {
    id: 'DEF',
    name: 'Defensor',
    emoji: '🛡️',
    tagline: 'El que nunca pasa',
    color: 'from-blue-600 to-blue-800',
    traits: ['Fuerza física', 'Marcaje férreo', 'Visión táctica', 'Cabeza fría'],
  },
  {
    id: 'MID',
    name: 'Mediocampista',
    emoji: '⚙️',
    tagline: 'El cerebro de la cancha',
    color: 'from-emerald-500 to-emerald-700',
    traits: ['Visión de juego', 'Pases precisos', 'Resistencia total', 'Conecta todo'],
  },
  {
    id: 'FWD',
    name: 'Delantero',
    emoji: '⚽',
    tagline: 'El que hace gol',
    color: 'from-red-500 to-red-700',
    traits: ['Velocidad letal', 'Definición implacable', 'Desmarques', 'Personalidad ganadora'],
  },
];

// 🆕 Preguntas del quiz (5 preguntas, 4 opciones cada una)
const QUIZ_QUESTIONS = [
  {
    q: 'En un partido, ¿qué te sale natural?',
    options: [
      { label: '🚫 Impedir que el rival avance, marcando con fuerza', weights: { DEF: 3, GK: 1 } },
      { label: '🧠 Organizar a tus compañeros y mandar pases largos', weights: { MID: 3, DEF: 1 } },
      { label: '⚡ Correr al espacio y pedir la pelota en el área', weights: { FWD: 3, MID: 1 } },
      { label: '🛑 Posicionarte para atajar o cubrir los espacios', weights: { GK: 3, DEF: 1 } },
    ],
  },
  {
    q: '¿Qué superpoder te gustaría tener?',
    options: [
      { label: '👀 Ver el futuro (anticipar jugadas)', weights: { GK: 2, MID: 3, DEF: 1 } },
      { label: '💨 Supervelocidad', weights: { FWD: 3, DEF: 1 } },
      { label: '🧠 Telequinesis (mover el balón con la mente)', weights: { MID: 3 } },
      { label: '💪 Superfuerza', weights: { DEF: 3, GK: 2 } },
    ],
  },
  {
    q: 'En el recreo, ¿cómo pasás el tiempo?',
    options: [
      { label: '🎮 Juegos de estrategia online', weights: { MID: 3, GK: 1 } },
      { label: '⚽ Echando unos penales con los amigos', weights: { FWD: 3, GK: 2 } },
      { label: '🏋️ Ejercicios de fuerza o correr', weights: { DEF: 2, GK: 2 } },
      { label: '🎬 Viendo resúmenes de partidos en YouTube', weights: { MID: 2, FWD: 1, DEF: 1, GK: 1 } },
    ],
  },
  {
    q: 'En una final por penales, ¿qué rol querés?',
    options: [
      { label: '🥅 El que los patea todos', weights: { FWD: 3, MID: 2 } },
      { label: '🛡️ El que tira los penalties al 9', weights: { DEF: 2, FWD: 1 } },
      { label: '🧤 El arquero, obvio', weights: { GK: 4 } },
      { label: '🙌 El que mira desde atrás rezando', weights: { MID: 1, DEF: 1 } },
    ],
  },
  {
    q: '¿Cuál de estas canciones te representa más?',
    options: [
      { label: '🎵 "We Will Rock You" (Queen)', weights: { DEF: 2, FWD: 2 } },
      { label: '🎵 "Eye of the Tiger" (Survivor)', weights: { FWD: 2, MID: 2 } },
      { label: '🎵 "Another One Bites the Dust" (Queen)', weights: { DEF: 3, GK: 2 } },
      { label: '🎵 "Billie Jean" (Michael Jackson)', weights: { MID: 3, FWD: 2 } },
    ],
  },
];

// ════════════════════════════════════════════
// UTILIDADES
// ════════════════════════════════════════════
const cls = (...a) => a.filter(Boolean).join(' ');
const percentage = (a, b) => (!b ? 0 : Math.round((a / b) * 100));
const formatNumber = (n) => new Intl.NumberFormat('es-CO').format(n);
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
};
const pad2 = (n) => String(n).padStart(2, '0');
const buildWaLink = (phone, msg = '') => {
  const clean = phone.replace(/\D/g, '');
  return `https://wa.me/${clean}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
};
const buildWaLinkWithData = (phone, data) => {
  const msg = `Hola Acrux, soy *${data.parentName || '—'}*.\n\n` +
    `Mi hijo *${data.playerName || '—'}* (${data.playerAge || '—'} años) quiere la prueba gratis.\n` +
    `Mi WhatsApp: ${data.phone || '—'}.\n\n` +
    `¿Me confirman horarios disponibles?`;
  return buildWaLink(phone, msg);
};

// ════════════════════════════════════════════
// HOOKS
// ════════════════════════════════════════════
function useScrollY(threshold = 0) {
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setPassed(window.scrollY > threshold);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return passed;
}

function useReveal(threshold = 0.15, delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); io.unobserve(e.target); }
      }),
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, className: visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6', style: { transitionDuration: '700ms', transitionDelay: `${delay}ms` } };
}

function RevealOnScroll({ children, as: Tag = 'div', delay = 0, className = '' }) {
  const { ref, className: revealClass, style } = useReveal(0.15, delay);
  return (
    <Tag ref={ref} className={`transition-all ease-out ${revealClass} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

function useCountUp(target, duration = 1500) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setValue(target); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.floor(target * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, value };
}

function useVoting(storageKey, initial) {
  const [votes, setVotes] = useState(() => {
    if (typeof window === 'undefined') return initial;
    try { const stored = window.localStorage.getItem(storageKey); if (stored) return JSON.parse(stored); } catch {}
    return initial;
  });
  const [votedFor, setVotedFor] = useState(() => {
    if (typeof window === 'undefined') return null;
    try { return window.localStorage.getItem(`${storageKey}-choice`); } catch { return null; }
  });
  const vote = useCallback((id) => {
    setVotes((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
    setVotedFor(id);
    try { window.localStorage.setItem(`${storageKey}-choice`, id); } catch {}
  }, [storageKey]);
  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem(`${storageKey}-choice`);
    } catch {}
    setVotes(initial);
    setVotedFor(null);
  }, [storageKey, initial]);
  return { votes, votedFor, vote, reset };
}

/**
 * Devuelve el tiempo restante hasta una fecha objetivo, actualizado cada segundo.
 */
function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  const diff = target - now;
  if (diff <= 0) {
    return { expired: true, totalSeconds: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    expired: false,
    totalSeconds,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds / 3600) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: totalSeconds % 60,
  };
}

// ════════════════════════════════════════════
// UI REUTILIZABLE
// ════════════════════════════════════════════
function Button({ children, variant = 'primary', size = 'md', href, fullWidth, onClick, type = 'button', disabled, className = '' }) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] text-white shadow-xl shadow-[#1A3A8A]/40',
    secondary: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 text-white/80 hover:text-white',
    whatsapp: 'bg-[#25D366] hover:bg-[#1FB957] text-white shadow-xl shadow-[#25D366]/40',
    ghost: 'bg-transparent hover:bg-white/5 text-white/70 hover:text-white border border-white/10',
  };
  const sizes = { sm: 'px-4 py-2 text-sm rounded-lg', md: 'px-6 py-3 text-base rounded-xl', lg: 'px-8 py-4 text-lg sm:text-xl rounded-full' };
  const base = 'group relative inline-flex items-center justify-center gap-3 font-bold transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:hover:scale-100 motion-reduce:transition-none overflow-hidden disabled:opacity-50 disabled:pointer-events-none';
  const classes = cls(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
  const content = (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative flex items-center justify-center gap-3">{children}</span>
    </>
  );
  if (href) return <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}</a>;
  return <button type={type} className={classes} onClick={onClick} disabled={disabled}>{content}</button>;
}

function GlassCard({ children, glowing, className = '' }) {
  return (
    <div className={cls('relative bg-gradient-to-br from-[#1A3A8A]/10 to-[#4A8BFF]/10 backdrop-blur-md backdrop-saturate-150 border-2 border-[#4A8BFF]/30 rounded-2xl shadow-2xl shadow-[#1A3A8A]/20 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:scale-[1.02] hover:border-[#4A8BFF]/60 hover:shadow-[#4A8BFF]/40 motion-reduce:hover:scale-100 motion-reduce:transition-none', glowing && 'group', className)}>
      {glowing && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#4A8BFF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, highlight, description }) {
  return (
    <header className="text-center mb-12 sm:mb-14">
      {eyebrow && (
        <span className="inline-block text-[#4A8BFF] text-sm sm:text-base font-black tracking-[3px] bg-[#1A3A8A]/20 px-5 py-2 rounded-full border-2 border-[#4A8BFF]/20 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
        {title} {highlight && <span className="text-[#4A8BFF]">{highlight}</span>}
      </h2>
      {description && <p className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{description}</p>}
    </header>
  );
}

// ════════════════════════════════════════════
// LAYOUT
// ════════════════════════════════════════════
function Navbar({ spots }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav aria-label="Principal" className="bg-black/80 backdrop-blur-xl border-b border-[#4A8BFF]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-2.5">
          <a href="#top" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <img
              src={CONFIG.brand.logo}
              alt={`${CONFIG.brand.fullName} logo`}
              width="56"
              height="56"
              loading="eager"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 motion-reduce:transition-none"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="leading-tight">
              <h1 className="font-black text-xl sm:text-2xl tracking-tight">AC<span className="text-[#4A8BFF]">RUX</span></h1>
              <p className="text-[10px] text-white/50 tracking-[4px]">FÚTBOL · {CONFIG.brand.city.toUpperCase()}</p>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]">{l.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#1A3A8A]/20 border border-[#4A8BFF]/30 px-3 py-1.5 rounded-full text-sm font-bold text-white" role="status" aria-live="polite">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4A8BFF]" />
              </span>
              <span className="text-[#4A8BFF] font-black">{formatNumber(spots)}</span>
            </div>
            <Button href="#contacto" size="sm" variant="whatsapp" className="hidden sm:inline-flex">
              <span aria-hidden="true">⚡</span><span>¡PROBAR!</span>
            </Button>
            <button type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /> : (<><path d="M3 6h18" strokeLinecap="round" /><path d="M3 12h18" strokeLinecap="round" /><path d="M3 18h18" strokeLinecap="round" /></>)}
              </svg>
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={cls('md:hidden overflow-hidden transition-[max-height,opacity] duration-300', open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0')}>
          <ul className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">{l.label}</a></li>
            ))}
            <li className="pt-2"><Button href="#contacto" size="md" fullWidth onClick={() => setOpen(false)}><span aria-hidden="true">⚡</span>¡Probar gratis!</Button></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function StickyCTA({ spots }) {
  const passed = useScrollY(400);
  return (
    <aside aria-label="Llamado a la acción fijo" className={cls('fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-xl border-t-2 border-[#4A8BFF]/30 p-3 sm:p-4 transition-transform duration-500 motion-reduce:transition-none', passed ? 'translate-y-0' : 'translate-y-full')}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm sm:text-base text-center sm:text-left">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75 animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#4A8BFF]" />
          </span>
          <span><strong className="text-[#4A8BFF] text-lg sm:text-xl font-black">{formatNumber(spots)}</strong> cupos esta semana · <span className="text-white/60">prueba gratis</span></span>
        </div>
        <Button href="#contacto" size="md" variant="whatsapp" className="w-full sm:w-auto"><span aria-hidden="true">🚀</span>¡ASEGURAR CUPO!</Button>
      </div>
    </aside>
  );
}

function WhatsAppFloat() {
  return (
    <a href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full">
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping motion-reduce:animate-none" />
      <span className="relative flex w-14 h-14 sm:w-16 sm:h-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 motion-reduce:transition-none">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
      </span>
    </a>
  );
}

function BackgroundGlows() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A3A8A]/5 to-black" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] bg-[#4A8BFF]/15 rounded-full blur-3xl animate-pulse-slow motion-reduce:animate-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-[#1A3A8A]/15 rounded-full blur-3xl animate-pulse-slow motion-reduce:animate-none" style={{ animationDelay: '1s' }} />
    </div>
  );
}

// ════════════════════════════════════════════
// 🆕 SECCIÓN: Countdown al próximo partido
// ════════════════════════════════════════════
function NextMatchCountdown() {
  const { days, hours, minutes, seconds, expired, totalSeconds } = useCountdown(CONFIG.nextMatch.date);
  const isUrgent = !expired && totalSeconds < 86400; // menos de 24h
  const isToday = !expired && totalSeconds < 3600 * 6; // menos de 6h

  if (expired) {
    return (
      <section className="py-6 px-4 sm:px-8 border-b border-white/5 bg-black/60" aria-label="Próximo partido">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/60 text-sm">🏟️ El partido ya empezó o terminó. ¡Mirá los resultados en <a href="#news" className="text-[#4A8BFF] hover:underline">Noticias</a>!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cls('py-6 px-4 sm:px-8 border-b transition-colors', isToday ? 'border-red-500/40 bg-red-500/5' : isUrgent ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/5 bg-black/40')} aria-label="Cuenta regresiva al próximo partido">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-3xl sm:text-4xl" aria-hidden="true">⚽</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Próximo partido</p>
            <p className="text-base sm:text-lg font-black text-white">
              {CONFIG.nextMatch.isHome ? '🏠 Local' : '✈️ Visita'} vs <span className="text-[#4A8BFF]">{CONFIG.nextMatch.opponent}</span> · {CONFIG.nextMatch.category}
            </p>
            <p className="text-xs text-white/40">📍 {CONFIG.nextMatch.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3" role="timer" aria-live="polite" aria-label={`Faltan ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`}>
          {days > 0 && <CountUnit value={days} label="días" />}
          <CountUnit value={hours} label="hrs" small />
          <CountUnit value={minutes} label="min" small />
          <CountUnit value={seconds} label="seg" small highlight={isToday} />
        </div>
      </div>
    </section>
  );
}

function CountUnit({ value, label, small, highlight }) {
  return (
    <div className={cls(
      'flex flex-col items-center justify-center rounded-xl border-2 tabular-nums min-w-[3.5rem] sm:min-w-[4rem]',
      small ? 'px-2 py-1.5' : 'px-3 py-2',
      highlight
        ? 'bg-red-500/20 border-red-500/50 text-white animate-pulse motion-reduce:animate-none'
        : 'bg-white/5 border-white/10 text-white/80'
    )}>
      <span className={cls('font-black leading-none', small ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl')}>{pad2(value)}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold mt-0.5">{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════
// SECCIONES (mantenidas de v3)
// ════════════════════════════════════════════
function Hero({ spots, total }) {
  const occupied = total - spots;
  const occ = percentage(occupied, total);
  const r1 = useReveal(0.15, 0);
  const r2 = useReveal(0.15, 100);
  const r3 = useReveal(0.15, 200);
  const r4 = useReveal(0.15, 300);
  const r5 = useReveal(0.15, 400);
  return (
    <section id="top" className="relative pt-32 pb-16 px-4 sm:px-8 text-center overflow-hidden min-h-[80vh] flex items-center" aria-label={`Academia de fútbol en ${CONFIG.brand.city}`}>
      <div className="absolute inset-0 bg-cover bg-center opacity-30 scale-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920')" }} role="img" aria-label="Fondo de estadio de fútbol" />
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div ref={r1.ref} className={cls('transition-all ease-out', r1.className)} style={r1.style}>
          <div className="inline-flex items-center gap-3 bg-[#1A3A8A]/40 backdrop-blur-sm px-6 py-2.5 rounded-full text-sm font-black mb-6 border-2 border-[#4A8BFF]/30 shadow-2xl shadow-[#1A3A8A]/30">
            <span className="text-[#4A8BFF]">⚽ METODOLOGÍA</span>
            <span className="text-white/40">•</span>
            <span className="text-white">PROFESIONAL</span>
          </div>
        </div>
        <div ref={r2.ref} className={cls('transition-all ease-out', r2.className)} style={r2.style}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            ACADEMIA DE FÚTBOL EN <span className="bg-gradient-to-r from-[#4A8BFF] via-[#6AABFF] to-[#1A3A8A] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient motion-reduce:animate-none">{CONFIG.brand.city.toUpperCase()}</span>
            <br />
            Pre-Juvenil - Juvenil
          </h1>
        </div>
        <div ref={r3.ref} className={cls('transition-all ease-out', r3.className)} style={r3.style}>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            En <strong className="text-white">Acrux Fútbol Club</strong> formamos jugadores con metodología profesional, valores y disciplina. <strong className="text-[#4A8BFF]">Tu primera clase es gratis.</strong>
          </p>
        </div>
        <div ref={r4.ref} className={cls('transition-all ease-out', r4.className)} style={r4.style}>
          <GlassCard glowing className="max-w-2xl mx-auto p-6 sm:p-8 mb-10" role="region" aria-label="Plazas disponibles">
            <div className="flex justify-between items-baseline text-sm sm:text-base font-bold mb-3">
              <span className="text-white/80"><span className="text-[#4A8BFF] text-2xl font-black">{formatNumber(spots)}</span> de {formatNumber(total)} cupos esta semana</span>
              <span className="text-white/60 text-sm">{occ}% ocupado</span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={occ} aria-valuemin="0" aria-valuemax="100" aria-label="Porcentaje de plazas ocupadas">
              <div className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] rounded-full shadow-[0_0_40px_rgba(74,139,255,0.4)] transition-[width] duration-700 ease-out" style={{ width: `${occ}%` }} />
            </div>
            <p className="mt-4 text-xs sm:text-sm text-white/50 text-center">⚠️ Cupos limitados · Se confirman por orden de llegada</p>
          </GlassCard>
        </div>
        <div ref={r5.ref} className={cls('transition-all ease-out', r5.className)} style={r5.style}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button href={buildWaLink(CONFIG.whatsapp.number, 'Hola Acrux, quiero reservar la prueba gratis')} size="lg" variant="whatsapp">
              <span className="text-2xl sm:text-3xl" aria-hidden="true">⚽</span>
              <span>¡RESERVAR MI PRUEBA!</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Button>
            <Button href="#info" variant="secondary" size="lg">
              <span className="text-[#4A8BFF] text-2xl" aria-hidden="true">📍</span>Ver horarios y ubicación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerStats() {
  const stats = [
    { value: CONFIG.stats.players, label: 'Jugadores activos', emoji: '👥', suffix: '+' },
    { value: CONFIG.stats.trainings, label: 'Entrenamientos al año', emoji: '🏃', suffix: '' },
    { value: CONFIG.stats.yearsActive, label: 'Años formando', emoji: '🏆', suffix: '' },
    { value: CONFIG.stats.cupsWon, label: 'Copas ganadas', emoji: '🥇', suffix: '' },
  ];
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 border-y border-[#1A3A8A]/20 bg-gradient-to-b from-black via-[#0A0A8A]/10 to-black" aria-label="Estadísticas de Acrux">
      <div className="max-w-6xl mx-auto">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          {stats.map((s, i) => (<StatItem key={s.label} {...s} delay={i * 100} />))}
        </ul>
      </div>
    </section>
  );
}

function StatItem({ value, label, emoji, suffix = '', delay = 0 }) {
  const { ref, value: current } = useCountUp(value, 1500);
  return (
    <li ref={ref} className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1A3A8A]/10 to-[#4A8BFF]/10 border-2 border-[#4A8BFF]/20 hover:border-[#4A8BFF]/50 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100" style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-4xl sm:text-5xl mb-2" aria-hidden="true">{emoji}</div>
      <div className="text-3xl sm:text-5xl font-black text-white mb-1 tabular-nums">{formatNumber(current)}<span className="text-[#4A8BFF]">{suffix}</span></div>
      <div className="text-xs sm:text-sm text-white/60 font-medium">{label}</div>
    </li>
  );
}

function InfoSection() {
  const cards = [
    { emoji: '📍', title: 'Dónde entrenamos', lines: [CONFIG.location.venue, CONFIG.location.address, `${CONFIG.location.neighborhood}`], cta: { label: 'Ver en Google Maps', href: CONFIG.location.mapsUrl, external: true } },
    { emoji: '🕐', title: 'Horarios', lines: [CONFIG.schedule.weekdays, CONFIG.schedule.weekends, CONFIG.schedule.ageGroups] },
    { emoji: '💰', title: 'Precios y prueba', lines: [CONFIG.price.trial, CONFIG.price.monthly, 'Sin matrícula, sin permanencia'] },
  ];
  return (
    <section id="info" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black" aria-labelledby="info-title">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="TODO LO QUE NECESITÁS SABER" title="INFORMACIÓN" highlight="PRÁCTICA" description="Antes de escribirnos, despejá tus dudas en 30 segundos." />
        </RevealOnScroll>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
          {cards.map((card, i) => {
            const r = useReveal(0.15, i * 100);
            return (
              <li key={card.title} ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
                <article className="h-full bg-gradient-to-br from-[#1A3A8A]/10 to-[#4A8BFF]/10 backdrop-blur-md border-2 border-[#4A8BFF]/30 rounded-2xl p-6 sm:p-8 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-[#4A8BFF]/60 hover:shadow-2xl hover:shadow-[#1A3A8A]/30 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
                  <div className="text-4xl mb-4" aria-hidden="true">{card.emoji}</div>
                  <h3 className="text-xl font-black mb-4 text-white">{card.title}</h3>
                  <ul className="space-y-2 list-none">
                    {card.lines.map((line, j) => (<li key={j} className="text-white/70 text-sm sm:text-base leading-relaxed">· {line}</li>))}
                  </ul>
                  {card.cta && (
                    <a href={card.cta.href} target={card.cta.external ? '_blank' : undefined} rel={card.cta.external ? 'noopener noreferrer' : undefined} className="mt-5 inline-flex items-center gap-2 text-[#4A8BFF] hover:text-[#6AABFF] font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] rounded-md px-1">
                      {card.cta.label} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// 🆕 SECCIÓN: Gallery CON FILTROS por categoría
function Gallery() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <section id="galeria" className="py-20 sm:py-24 px-4 sm:px-8" aria-labelledby="galeria-title">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="VIVÍ ACRUX" title="MOMENTOS" highlight="REALES" description="Entrenamientos, partidos y celebraciones por categoría." />
        </RevealOnScroll>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8" role="tablist" aria-label="Filtro de galería por categoría">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cls(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]',
                filter === f.id
                  ? 'bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] text-white shadow-lg shadow-[#1A3A8A]/40 scale-105'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:border-[#4A8BFF]/50 hover:text-white'
              )}
            >
              <span aria-hidden="true">{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 list-none min-h-[200px]">
          {filtered.map((item) => {
            const r = useReveal(0.15, 0);
            return (
              <li key={item.src + filter} ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
                <button type="button" onClick={() => setActive(item)} className="group relative w-full aspect-square overflow-hidden rounded-2xl bg-[#1A3A8A]/10 border-2 border-[#1A3A8A]/30 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:scale-[1.04] hover:border-[#4A8BFF]/60 hover:shadow-2xl hover:shadow-[#1A3A8A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] motion-reduce:hover:scale-100 motion-reduce:transition-none" aria-label={`Ver imagen ampliada: ${item.alt}`}>
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" width="600" height="600" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'; }} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:translate-y-0">
                    <p className="text-white font-black text-base sm:text-lg drop-shadow-lg"><span aria-hidden="true" className="mr-2">{item.emoji}</span>{item.caption}</p>
                  </div>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="col-span-full text-center py-12 text-white/50">No hay fotos en esta categoría todavía.</li>
          )}
        </ul>
      </div>
      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setActive(null)}>
          <button type="button" onClick={() => setActive(null)} aria-label="Cerrar imagen" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">✕</button>
          <img src={active.src} alt={active.alt} width="1200" height="1200" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

function NewsCarousel() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNews, setActiveNews] = useState(null);  // ← NUEVO
  const scrollToIndex = useCallback((i) => {
    if (!scrollerRef.current) return;
    const card = scrollerRef.current.children[i];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);
  const onScroll = useCallback(() => {
    if (!scrollerRef.current) return;
    const el = scrollerRef.current;
    const center = el.scrollLeft + el.clientWidth / 2;
    const kids = Array.from(el.children);
    const idx = kids.findIndex((k) => {
      const kCenter = k.offsetLeft + k.offsetWidth / 2;
      return Math.abs(kCenter - center) < k.offsetWidth / 2;
    });useEffect(() => {
  if (!activeNews) return;
  const onKey = (e) => { if (e.key === 'Escape') setActiveNews(null); };
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  return () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
  };
}, [activeNews]);
    if (idx >= 0 && idx !== activeIndex) setActiveIndex(idx);
  }, [activeIndex]);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  const badgeColors = {
    blue: 'bg-[#4A8BFF]/20 text-[#4A8BFF] border-[#4A8BFF]/40',
    green: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    yellow: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    red: 'bg-red-500/20 text-red-300 border-red-400/40',
  };
  return (
    <section id="news" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden" aria-labelledby="news-title">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="LO QUE PASA EN ACRUX" title="NOTICIAS, PARTIDOS Y" highlight="CAMPAÑAS" description="Mirá lo más reciente: resultados, eventos y novedades." />
        </RevealOnScroll>
        <div className="relative">
          <div className="hidden sm:flex absolute -top-16 right-0 gap-2">
            <button type="button" onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Anterior" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4A8BFF]/20 border border-white/10 hover:border-[#4A8BFF]/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]">
              <span className="text-white text-xl" aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => scrollToIndex(Math.min(NEWS.length - 1, activeIndex + 1))} disabled={activeIndex >= NEWS.length - 1} aria-label="Siguiente" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4A8BFF]/20 border border-white/10 hover:border-[#4A8BFF]/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]">
              <span className="text-white text-xl" aria-hidden="true">→</span>
            </button>
          </div>
          <ul ref={scrollerRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4A8BFF transparent' }} aria-label="Lista de noticias y partidos">
            {NEWS.map((item) => (
              <li key={item.id} className="snap-center shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <article className="group h-full bg-gradient-to-br from-[#1A3A8A]/10 to-[#4A8BFF]/10 backdrop-blur-md border-2 border-[#4A8BFF]/30 rounded-2xl overflow-hidden transition-[transform,border-color,box-shadow] duration-500 hover:border-[#4A8BFF]/60 hover:shadow-2xl hover:shadow-[#1A3A8A]/30 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={item.image} alt="" loading="lazy" width="800" height="450" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'; }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none" />
                    <span className={cls('absolute top-3 left-3 text-xs font-black px-3 py-1.5 rounded-full border backdrop-blur-md', badgeColors[item.badgeColor] || badgeColors.blue)}>{item.badge}</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <time className="text-xs text-white/40 font-bold tracking-wider uppercase" dateTime={item.date}>{formatDate(item.date)}</time>
                    <h3 className="mt-2 text-lg sm:text-xl font-black text-white leading-tight line-clamp-2">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">{item.description}</p>
                    {item.href && (
                      <button
  type="button"
  onClick={() => setActiveNews(item)}
  className="mt-4 inline-flex items-center gap-2 text-[#4A8BFF] hover:text-[#6AABFF] font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] rounded-md px-1"
>
  {item.type === 'campaign' ? 'Quiero participar' : 'Leer más'} 
  <span aria-hidden="true">→</span>
</button>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Selector de slide">
            {NEWS.map((_, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === activeIndex} aria-label={`Ir a slide ${i + 1}`} onClick={() => scrollToIndex(i)} className={cls('h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]', i === activeIndex ? 'w-8 bg-[#4A8BFF]' : 'w-2 bg-white/20 hover:bg-white/40')} />
            ))}
          </div>
        </div>
      </div>
      {activeNews && (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={activeNews.title}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
    onClick={() => setActiveNews(null)}
  >
    <button
      type="button"
      onClick={() => setActiveNews(null)}
      aria-label="Cerrar"
      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      ✕
    </button>
    <div 
      className="w-full max-w-2xl my-8" 
      onClick={(e) => e.stopPropagation()}
    >
      <article className="bg-gradient-to-br from-[#1A3A8A]/20 to-[#4A8BFF]/20 backdrop-blur-xl border-2 border-[#4A8BFF]/40 rounded-3xl overflow-hidden shadow-2xl">
        {/* Imagen destacada */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={activeNews.image} 
            alt={activeNews.title}
            className="w-full h-full object-cover"
          />
          <span className={cls(
            'absolute top-4 left-4 text-sm font-black px-3 py-1.5 rounded-full border backdrop-blur-md',
            badgeColors[activeNews.badgeColor] || badgeColors.blue
          )}>
            {activeNews.badge}
          </span>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          <time className="text-xs text-white/50 font-bold tracking-widest uppercase" dateTime={activeNews.date}>
            {formatDate(activeNews.date)}
          </time>
          <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white leading-tight">
            {activeNews.title}
          </h3>
          
          {/* Descripción corta */}
          <p className="mt-3 text-white/70 text-base leading-relaxed">
            {activeNews.description}
          </p>

          {/* Contenido largo (con saltos de línea) */}
          {activeNews.fullContent && (
            <div className="mt-6 text-white/80 text-base leading-relaxed whitespace-pre-line border-t border-white/10 pt-6">
              {activeNews.fullContent}
            </div>
          )}

          {/* Galería adicional (opcional) */}
          {activeNews.gallery && activeNews.gallery.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {activeNews.gallery.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt="" 
                  loading="lazy"
                  className="w-full aspect-video object-cover rounded-xl border border-white/10"
                />
              ))}
            </div>
          )}

          {/* CTAs según el tipo */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {activeNews.type === 'campaign' && (
              <a
                href="#contacto"
                onClick={() => setActiveNews(null)}
                className="flex-1 text-center bg-[#25D366] hover:bg-[#1FB957] px-5 py-3 rounded-xl font-bold text-white transition-colors"
              >
                🏆 Quiero participar
              </a>
            )}
            {activeNews.type === 'match' && (
              <a
                href="#galeria"
                onClick={() => setActiveNews(null)}
                className="flex-1 text-center bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-xl font-bold text-white transition-colors"
              >
                📸 Ver fotos del partido
              </a>
            )}
            <button
              type="button"
              onClick={() => setActiveNews(null)}
              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-bold text-white/80 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
)}
    </section>
  );
}

function VideosSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);
  return (
    <section id="videos" className="py-20 sm:py-24 px-4 sm:px-8" aria-labelledby="videos-title">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="CONOCÉ A NUESTRA GENTE" title="ENTREVISTAS" highlight="EN VIDEO" description="Jugadores, padres y entrenadores cuentan su experiencia en Acrux." />
        </RevealOnScroll>
        <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 list-none">
          {VIDEOS.map((video, i) => {
            const r = useReveal(0.15, i * 100);
            return (
              <li key={video.id} ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
                <button type="button" onClick={() => setActive(video)} className="group w-full text-left relative aspect-video overflow-hidden rounded-2xl bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/30 hover:border-[#4A8BFF]/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1A3A8A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] motion-reduce:hover:scale-100" aria-label={`Reproducir entrevista: ${video.title}`}>
                  <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" width="800" height="450" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'; }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4A8BFF]/90 group-hover:bg-[#4A8BFF] flex items-center justify-center text-white text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110 shadow-2xl shadow-[#1A3A8A]/50" aria-hidden="true">▶</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#4A8BFF] mb-1">
                      <span aria-hidden="true">{video.emoji}</span>
                      <span>{video.player}</span>
                      <span className="ml-auto bg-black/70 px-2 py-0.5 rounded text-white text-xs">{video.duration}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black leading-tight line-clamp-2">{video.title}</h3>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out] motion-reduce:animate-none" onClick={() => setActive(null)}>
          <button type="button" onClick={() => setActive(null)} aria-label="Cerrar video" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">✕</button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe src={`https://www.youtube-nocookie.com/embed/wpi07vjfwwc?rel=0`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
            <div className="mt-4 text-white">
              <p className="text-sm text-[#4A8BFF] font-black mb-1">{active.player}</p>
              <h3 className="text-xl sm:text-2xl font-black">{active.title}</h3>
              <p className="mt-2 text-white/70 text-sm sm:text-base">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ════════════════════════════════════════════
// 🆕 SECCIÓN: QUIZ — ¿Qué posición jugás?
// ════════════════════════════════════════════
function PositionQuiz() {
  const storageKey = 'acrux-quiz-2026';
  const [step, setStep] = useState(0); // 0 = intro, 1..N = questions, N+1 = result
  const [answers, setAnswers] = useState([]); // array of selected option indices
  const [copied, setCopied] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const isIntro = step === 0;
  const isResult = step > total;

  const result = useMemo(() => {
    if (!isResult) return null;
    const scores = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    answers.forEach((optIdx, qIdx) => {
      const weights = QUIZ_QUESTIONS[qIdx].options[optIdx]?.weights || {};
      Object.entries(weights).forEach(([pos, w]) => { scores[pos] = (scores[pos] || 0) + w; });
    });
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return { scores, position: POSITIONS.find((p) => p.id === winner) };
  }, [isResult, answers]);

  const handleStart = () => {
    // reset o cargar de localStorage
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || []);
        setStep((parsed.answers || []).length + 1);
        return;
      }
    } catch {}
    setStep(1);
  };

  const handleAnswer = (optIdx) => {
    const next = [...answers, optIdx];
    setAnswers(next);
    try { window.localStorage.setItem(storageKey, JSON.stringify({ answers: next })); } catch {}
    if (step > total) setStep(total + 1);
    else setStep(step + 1);
  };

  const handleReset = () => {
    setAnswers([]);
    setStep(1);
    try { window.localStorage.removeItem(storageKey); } catch {}
  };

  const shareText = result
    ? `⚽ Hice el quiz de Acrux FC y soy ${result.position.emoji} ${result.position.name}! "${result.position.tagline}" ¿Y vos? Hacelo acá 👇`
    : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="quiz" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#1A0A4A]/30 to-black border-y border-[#1A3A8A]/20" aria-labelledby="quiz-title">
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="🎮 JUGÁ Y DESCUBRÍ"
            title="¿QUÉ POSICIÓN"
            highlight="JUGÁS?"
            description="5 preguntas rápidas. Descubrí tu posición ideal en la cancha y compartila con tus amigos."
          />
        </RevealOnScroll>

        {isIntro && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleStart}
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] px-10 py-5 rounded-full font-black text-xl text-white shadow-2xl shadow-[#1A3A8A]/50 hover:shadow-[#1A3A8A]/80 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black overflow-hidden"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative text-3xl group-hover:rotate-12 transition-transform" aria-hidden="true">🎮</span>
              <span className="relative">EMPEZAR EL QUIZ</span>
            </button>
            <p className="mt-4 text-white/50 text-sm">⏱️ Solo 60 segundos · 5 preguntas</p>
          </div>
        )}

        {!isIntro && !isResult && (
          <QuizStep
            step={step}
            total={total}
            question={QUIZ_QUESTIONS[step - 1]}
            onAnswer={handleAnswer}
            onBack={() => {
              const prev = answers.slice(0, -1);
              setAnswers(prev);
              setStep(step - 1);
              try { window.localStorage.setItem(storageKey, JSON.stringify({ answers: prev })); } catch {}
            }}
          />
        )}

        {isResult && result && (
          <QuizResult
            result={result}
            answers={answers}
            onReset={handleReset}
            onShareWa={() => window.open(buildWaLink(CONFIG.whatsapp.number, shareText), '_blank', 'noopener,noreferrer')}
            onCopy={copyToClipboard}
            copied={copied}
            onTryAgain={handleReset}
          />
        )}
      </div>
    </section>
  );
}

function QuizStep({ step, total, question, onAnswer, onBack }) {
  const progress = (step / total) * 100;
  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-black mb-2 text-white/70">
          <span>Pregunta {step} de {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Progreso del quiz"
          />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-white text-center mb-8 leading-tight">
        {question.q}
      </h3>

      <ul className="space-y-3 list-none">
        {question.options.map((opt, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onAnswer(i)}
              className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/5 border-2 border-white/10 hover:border-[#4A8BFF] hover:bg-[#4A8BFF]/10 transition-all duration-300 hover:scale-[1.02] motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] text-white text-base sm:text-lg font-bold"
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>

      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 mx-auto block text-sm text-white/50 hover:text-white underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] rounded"
        >
          ← Volver a la pregunta anterior
        </button>
      )}
    </div>
  );
}

function QuizResult({ result, answers, onReset, onShareWa, onCopy, copied, onTryAgain }) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-widest text-white/50 font-black mb-2">Tu resultado</p>
      <div className={cls('inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br mb-4 shadow-2xl', result.position.color, 'shadow-[#1A3A8A]/40')}>
        <span className="text-5xl sm:text-7xl" aria-hidden="true">{result.position.emoji}</span>
      </div>
      <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
        ¡Sos <span className="text-[#4A8BFF]">{result.position.name}</span>!
      </h3>
      <p className="text-lg sm:text-xl text-white/70 italic mb-6">"{result.position.tagline}"</p>

      <ul className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 list-none">
        {result.position.traits.map((trait, i) => (
          <li key={i} className="bg-gradient-to-br from-[#1A3A8A]/10 to-[#4A8BFF]/10 border border-[#4A8BFF]/30 rounded-xl p-3 text-white/80 text-sm font-bold">
            ✨ {trait}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onShareWa}
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FB957] px-5 py-3 rounded-xl font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        >
          <span aria-hidden="true">📱</span>Compartir en WhatsApp
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span aria-hidden="true">{copied ? '✅' : '📋'}</span>{copied ? '¡Copiado!' : 'Copiar resultado'}
        </button>
      </div>

      <button
        type="button"
        onClick={onTryAgain}
        className="mt-6 text-sm text-white/50 hover:text-white underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] rounded"
      >
        🔄 Hacer el quiz de nuevo
      </button>
    </div>
  );
}

function PlayerOfMonth() {
  const initialVotes = { p1: 42, p2: 38, p3: 15, p4: 22 };
  const { votes, votedFor, vote, reset } = useVoting('acrux-pom-2026-08', initialVotes);
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  return (
    <section id="vota" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A8A]/10 to-black border-y border-[#1A3A8A]/20" aria-labelledby="vota-title">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="VOTÁ A TU FAVORITO" title="JUGADOR DEL" highlight="MES" description="Reconocé al jugador que más se destacó este mes. ¡Tu voto cuenta!" />
        </RevealOnScroll>
        {votedFor ? (
          <div className="text-center mb-8 p-4 rounded-2xl bg-[#1A3A8A]/20 border border-[#4A8BFF]/30" role="status" aria-live="polite">
            <p className="text-white/80 text-sm">✅ Ya votaste por <strong className="text-white">{PLAYERS.find(p => p.id === votedFor)?.name}</strong>. ¡Gracias!</p>
            <button type="button" onClick={reset} className="mt-2 text-xs text-white/50 hover:text-white underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] rounded">Cambiar mi voto</button>
          </div>
        ) : (
          <p className="text-center mb-8 text-white/60 text-sm">👇 Elegí tu favorito y mirá los resultados en vivo</p>
        )}
        <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5 list-none">
          {PLAYERS.map((player, i) => {
            const playerVotes = votes[player.id] || 0;
            const pct = percentage(playerVotes, total);
            const isVoted = votedFor === player.id;
            const r = useReveal(0.15, i * 80);
            return (
              <li key={player.id} ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
                <article className={cls('relative p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300', 'bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm', isVoted ? 'border-[#4A8BFF] shadow-2xl shadow-[#4A8BFF]/30' : 'border-white/10 hover:border-[#4A8BFF]/50')}>
                  <div className="flex items-center gap-4">
                    <div className={cls('shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-xl', player.color)} aria-hidden="true">{player.initials}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white text-base sm:text-lg truncate">{player.name}</h3>
                      <p className="text-xs sm:text-sm text-white/60">{player.position} · {player.category}</p>
                      <p className="text-xs text-[#4A8BFF] font-bold mt-1 truncate">{player.achievement}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-white/60">{playerVotes} votos</span>
                      <span className="text-[#4A8BFF] tabular-nums">{pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={cls('h-full rounded-full transition-all duration-1000 ease-out', isVoted ? 'bg-[#4A8BFF]' : 'bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF]')} style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100" aria-label={`Porcentaje de votos de ${player.name}`} />
                    </div>
                  </div>
                  <button type="button" onClick={() => !votedFor && vote(player.id)} disabled={!!votedFor} aria-pressed={isVoted} className={cls('mt-4 w-full py-2.5 rounded-lg font-black text-sm transition-all duration-300', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black', isVoted ? 'bg-[#4A8BFF] text-white shadow-lg shadow-[#4A8BFF]/40 cursor-default' : votedFor ? 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed' : 'bg-white/5 hover:bg-[#4A8BFF] border border-[#4A8BFF]/40 hover:border-[#4A8BFF] text-white hover:scale-[1.02] motion-reduce:hover:scale-100')}>
                    {isVoted ? '✓ Tu voto' : votedFor ? 'Voto cerrado' : '🗳️ Votar'}
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
        <p className="text-center text-xs text-white/40 mt-8">Total de votos: <strong className="text-white">{total}</strong> · Votación abierta hasta el 31 de agosto</p>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonios" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black" aria-labelledby="testimonios-title">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <SectionHeader eyebrow="TESTIMONIOS REALES" title="LO QUE DICEN" highlight="LAS FAMILIAS" description="Historias de padres y jugadores que confiaron en Acrux." />
        </RevealOnScroll>
        <ul className="grid sm:grid-cols-2 gap-6 sm:gap-8 list-none">
          {TESTIMONIALS.map((t, i) => {
            const r = useReveal(0.15, i * 100);
            return (
              <li key={t.id} ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
                <article className="h-full bg-white/5 backdrop-blur-sm border-2 border-[#1A3A8A]/30 rounded-2xl p-6 sm:p-8 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-[#4A8BFF]/50 hover:shadow-2xl hover:shadow-[#1A3A8A]/30 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
                  <div className="flex items-center gap-1 text-[#4A8BFF] text-xl sm:text-2xl mb-4" aria-label={`${t.rating || 5} de 5 estrellas`}>★★★★★</div>
                  <blockquote className="text-white/80 text-base sm:text-lg mb-4 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white text-base sm:text-lg font-black shadow-xl shadow-[#1A3A8A]/30 shrink-0" aria-hidden="true">{t.initials}</div>
                    <div>
                      <p className="font-bold text-base sm:text-lg text-white">{t.name}</p>
                      <p className="text-white/50 text-xs sm:text-sm">Jugador {t.age} años · {t.months} {t.months === 1 ? 'mes' : 'meses'} con nosotros</p>
                    </div>
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ContactForm({ spots }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formId = useId();
  const validate = (d) => {
    const e = {};
    if (!d.parentName?.trim()) e.parentName = 'Necesitamos tu nombre para contactarte';
    if (!d.phone?.trim()) e.phone = 'Tu WhatsApp es para enviarte los horarios';
    else if (!/^[+\d\s()-]{7,}$/.test(d.phone.trim())) e.phone = 'Revisá el número, parece incompleto';
    if (d.playerAge) {
      const a = parseInt(d.playerAge, 10);
      if (Number.isNaN(a) || a < CONFIG.enrollment.minAge || a > CONFIG.enrollment.maxAge) e.playerAge = `Trabajamos con jugadores de ${CONFIG.enrollment.minAge} a ${CONFIG.enrollment.maxAge} años`;
    }
    return e;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 400));
    const waUrl = buildWaLinkWithData(CONFIG.whatsapp.number, data);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setStatus('success');
    e.currentTarget.reset();
    setTimeout(() => setStatus('idle'), 6000);
  };
  const inputBase = 'w-full p-4 rounded-xl bg-black/50 border-2 text-base text-white placeholder-white/50 transition-[border-color,box-shadow,transform] duration-300 focus:outline-none focus:scale-[1.01] motion-reduce:focus:scale-100 motion-reduce:transition-none';
  const inputOk = 'border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:shadow-2xl focus:shadow-[#1A3A8A]/30';
  const inputErr = 'border-red-500/70 focus:border-red-400';
  return (
    <section id="contacto" className="relative py-20 sm:py-24 px-4 sm:px-8 border-t border-[#1A3A8A]/30" aria-labelledby="contacto-title">
      <div aria-hidden="true" className="absolute inset-0 bg-[#1A3A8A]/10 blur-3xl animate-pulse-slow motion-reduce:animate-none" />
      <div className="relative z-10 max-w-md mx-auto">
        <header className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-[#4A8BFF] text-sm sm:text-base font-black tracking-[3px] bg-[#1A3A8A]/20 px-5 py-2 rounded-full border-2 border-[#4A8BFF]/20 mb-4">🚀 ÚLTIMO PASO</span>
          <h2 id="contacto-title" className="text-3xl sm:text-4xl font-black mt-4 leading-tight">RESERVÁ <span className="text-[#4A8BFF] animate-pulse motion-reduce:animate-none">TU PRUEBA</span></h2>
          <p className="text-white/60 text-sm sm:text-base mt-2">Completá el formulario y te contactamos por WhatsApp en menos de {CONFIG.enrollment.guaranteeHours}h.</p>
          <div className="mt-4 inline-flex items-center gap-3 bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/20 px-5 py-2 rounded-full text-sm font-black text-[#4A8BFF] backdrop-blur-sm" role="status" aria-live="polite">
            <span aria-hidden="true">⚠️</span> Quedan <span className="text-white font-bold text-xl">{formatNumber(spots)}</span> cupos esta semana
          </div>
        </header>
        <form onSubmit={onSubmit} noValidate className="space-y-5 bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-white/5 shadow-2xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/30 transition-shadow duration-300 motion-reduce:transition-none" aria-describedby={`${formId}-help`}>
          <div>
            <label htmlFor={`${formId}-parent`} className="text-xs sm:text-sm font-bold text-white/70 block mb-2 tracking-wider">👤 Tu nombre <span className="text-[#4A8BFF]" aria-hidden="true">*</span></label>
            <input id={`${formId}-parent`} type="text" name="parentName" autoComplete="name" placeholder="Ej: Carolina Hernández" required aria-invalid={!!errors.parentName} className={cls(inputBase, errors.parentName ? inputErr : inputOk)} />
            {errors.parentName && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.parentName}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="text-xs sm:text-sm font-bold text-white/70 block mb-2 tracking-wider">📱 Tu WhatsApp <span className="text-[#4A8BFF]" aria-hidden="true">*</span></label>
            <input id={`${formId}-phone`} type="tel" name="phone" inputMode="tel" autoComplete="tel" placeholder="Ej: 300 123 4567" required aria-invalid={!!errors.phone} className={cls(inputBase, errors.phone ? inputErr : inputOk)} />
            {errors.phone && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-email`} className="text-xs sm:text-sm font-bold text-white/70 block mb-2 tracking-wider">✉️ Email (opcional)</label>
            <input id={`${formId}-email`} type="email" name="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" className={cls(inputBase, inputOk)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${formId}-player`} className="text-xs sm:text-sm font-bold text-white/70 block mb-2 tracking-wider">⚽ Jugador</label>
              <input id={`${formId}-player`} type="text" name="playerName" placeholder="Nombre" className={cls(inputBase, inputOk)} />
            </div>
            <div>
              <label htmlFor={`${formId}-age`} className="text-xs sm:text-sm font-bold text-white/70 block mb-2 tracking-wider">🎂 Edad</label>
              <input id={`${formId}-age`} type="number" name="playerAge" min={CONFIG.enrollment.minAge} max={CONFIG.enrollment.maxAge} placeholder="14" aria-invalid={!!errors.playerAge} className={cls(inputBase, errors.playerAge ? inputErr : inputOk)} />
              {errors.playerAge && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.playerAge}</p>}
            </div>
          </div>
          <Button type="submit" size="lg" fullWidth variant="whatsapp">
            {status === 'sending' && (<><svg className="animate-spin motion-reduce:animate-none w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" /><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>Abriendo WhatsApp…</>)}
            {status === 'success' && (<><span className="text-2xl motion-safe:animate-bounce" aria-hidden="true">✅</span>¡TE ABRIÓ WHATSAPP!</>)}
            {status === 'idle' && (<><span className="text-2xl" aria-hidden="true">🏆</span>¡RESERVAR MI PRUEBA!</>)}
          </Button>
          <p id={`${formId}-help`} className="text-center text-xs sm:text-sm text-white/50" aria-live="polite">
            {status === 'success' ? '🎉 Si no se abrió WhatsApp, escribinos directo al botón verde abajo.' : '🔒 Tus datos solo se usan para contactarte sobre la prueba.'}
          </p>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm mb-3">¿No querés llenar el formulario?</p>
          <Button href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)} variant="whatsapp" size="md">
            <span aria-hidden="true">💬</span>Escribinos directo por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1A3A8A]/30 py-10 px-4 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-black text-lg mb-3 text-white">AC<span className="text-[#4A8BFF]">RUX</span></h3>
            <p className="text-white/50 text-sm leading-relaxed">Academia de fútbol en {CONFIG.brand.city}. Metodología profesional para formar futuras estrellas.</p>
          </div>
          <div>
            <h3 className="font-black text-sm tracking-widest text-white/80 mb-3">ENCONTRANOS</h3>
            <ul className="space-y-2 list-none">
              <li><a href={CONFIG.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#4A8BFF] text-sm transition-colors">📍 {CONFIG.location.address}</a></li>
              <li><a href={buildWaLink(CONFIG.whatsapp.number)} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#4A8BFF] text-sm transition-colors">💬 WhatsApp {CONFIG.whatsapp.number}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-sm tracking-widest text-white/80 mb-3">SEGUINOS</h3>
            <ul className="flex flex-wrap gap-3 list-none">
              <li><a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045] border border-white/10 hover:border-transparent flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"><span aria-hidden="true">📷</span></a></li>
              <li><a href={CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-transparent flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"><span aria-hidden="true">📘</span></a></li>
              <li><a href={CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/5 hover:bg-black border border-white/10 hover:border-white/40 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"><span aria-hidden="true">🎵</span></a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 text-center text-white/40 text-xs">
          <p>© {new Date().getFullYear()} {CONFIG.brand.fullName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: CONFIG.brand.fullName,
    description: `Academia de fútbol en ${CONFIG.brand.city} con metodología profesional para jóvenes de ${CONFIG.enrollment.minAge} a ${CONFIG.enrollment.maxAge} años.`,
    address: { '@type': 'PostalAddress', streetAddress: CONFIG.location.address, addressLocality: CONFIG.location.city, addressCountry: 'CO' },
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: `+${CONFIG.whatsapp.number}`,
    priceRange: '$$',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function App() {
  const [spots] = useState(CONFIG.enrollment.initialAvailable);
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden antialiased">
      <LocalBusinessSchema />
      <BackgroundGlows />
      <Navbar spots={spots} />
      <main>
        <Hero spots={spots} total={CONFIG.enrollment.totalSpots} />
        <NextMatchCountdown />
        <PlayerStats />
        <InfoSection />
        <PositionQuiz />
        <NewsCarousel />
        <Gallery />
        <VideosSection />
        <PlayerOfMonth />
        <Testimonials />
        <ContactForm spots={spots} />
      </main>
      <Footer />
      <StickyCTA spots={spots} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
