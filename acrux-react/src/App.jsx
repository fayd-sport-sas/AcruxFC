/**
 * ✅ ACRUX FC — App.jsx CORREGIDO
 * ─────────────────────────────────────────────
 * CORRECCIONES APLICADAS:
 *   1. ✅ Texto "245" suelto eliminado del botón WhatsApp
 *   2. ✅ Hook useReveal movido fuera de .map() → componentes separados
 *   3. ✅ Logo del navbar cambiado de <h1> a <span> (SEO: un solo h1 en Hero)
 *   4. ✅ Prop "shine" eliminada del Button (no existía)
 *   5. ✅ Padding-bottom agregado al footer para no ser tapado por StickyCTA
 *   6. ✅ Formulario integrado con Formspree (cambiar YOUR_FORM_ID)
 *   7. ✅ Meta tags OG y Twitter Card agregados en index.html
 *   8. ✅ Fallback de fuente Inter cargada desde Google Fonts en index.html
 *   9. ✅ Sección "Metodología" agregada entre Hero y Galería
 */

import { useState, useEffect, useId, useRef } from 'react';

// ════════════════════════════════════════════
// CONFIGURACIÓN — cambia aquí números y copy
// ════════════════════════════════════════════
const CONFIG = {
  brand: {
    name: 'ACRUX',
    fullName: 'Acrux Fútbol Club',
    logo: '/foto/logo/logo_web_200px.png',
  },
  whatsapp: {
    number: '573001234567',
    defaultMessage: 'Hola Acrux, quiero asegurar el cupo de mi hijo',
  },
  formspree: {
    // Reemplaza con tu ID de Formspree: https://formspree.io
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
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
  { href: '#metodologia', label: 'Metodología' },
  { href: '#galeria', label: 'Galería' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto', label: 'Contacto' },
];

const GALLERY = [
  { src: '/foto/img_a04.jpg', alt: 'Entrenamiento técnico', caption: 'Entrenamiento técnico', emoji: '⚡' },
  { src: '/foto/img_a01.jpg', alt: 'Entrenamiento físico', caption: 'Entrenamiento físico', emoji: '💪' },
  { src: '/foto/img_09.jpg', alt: 'Partido amistoso', caption: 'Partido amistoso', emoji: '🏟️' },
  { src: '/foto/img_10.jpg', alt: 'Celebración', caption: 'Celebración', emoji: '🎉' },
  { src: '/foto/img_11.jpg', alt: 'Equipo Acrux', caption: 'Equipo Acrux', emoji: '🤝' },
  { src: '/foto/img_a02.jpg', alt: 'Trabajo con balón', caption: 'Trabajo con balón', emoji: '⚽' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Mamá de Santiago', age: 14, months: 3, initials: 'S', quote: 'Mi hijo llegó sin confianza y en 2 meses ya es titular del equipo. La metodología y el ambiente son increíbles.' },
  { id: 2, name: 'Papá de Mateo', age: 16, months: 12, initials: 'M', quote: 'El cambio en mi hijo ha sido increíble, no solo en lo deportivo sino también en su disciplina y valores.' },
  { id: 3, name: 'Mamá de Valentina', age: 13, months: 6, initials: 'V', quote: 'Como mamá quedé encantada. Entrenadores serios, comunicación constante y mi hija ama ir a entrenar.' },
  { id: 4, name: 'Papá de Nicolás', age: 17, months: 18, initials: 'N', quote: 'Llevamos año y medio y los resultados se notan. Pasó de la banca a ser capitán del equipo escolar.' },
];

// ════════════════════════════════════════════
// UTILIDADES
// ════════════════════════════════════════════
const cls = (...a) => a.filter(Boolean).join(' ');
const percentage = (a, b) => (!b ? 0 : Math.round((a / b) * 100));
const formatNumber = (n) => new Intl.NumberFormat('es-CO').format(n);
const buildWaLink = (phone, msg = '') => {
  const clean = phone.replace(/\D/g, '');
  return `https://wa.me/${clean}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
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

// ════════════════════════════════════════════
// UI REUTILIZABLE
// ════════════════════════════════════════════
function Button({ children, variant = 'primary', size = 'md', href, fullWidth, onClick, type = 'button', disabled, className = '' }) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] text-white shadow-xl shadow-[#1A3A8A]/40',
    secondary: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 text-white/80 hover:text-white',
  };
  const sizes = { sm: 'px-4 py-2 text-sm rounded-lg', md: 'px-6 py-3 text-base rounded-xl', lg: 'px-8 py-4 text-lg sm:text-xl rounded-full' };
  const base = 'group relative inline-flex items-center justify-center gap-3 font-bold transition-[transform,box-shadow,background-color] duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:hover:scale-100 motion-reduce:transition-none overflow-hidden disabled:opacity-50 disabled:pointer-events-none';
  const classes = cls(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
  const content = (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative flex items-center justify-center gap-3">{children}</span>
    </>
  );
  if (href) return <a href={href} className={classes}>{content}</a>;
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

function SectionHeader({ title, highlight, description }) {
  return (
    <header className="text-center mb-12 sm:mb-14">
      <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
        {title} {highlight && <span className="text-[#4A8BFF]">{highlight}</span>}
      </h2>
      {description && <p className="text-white/50 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">{description}</p>}
    </header>
  );
}

// ════════════════════════════════════════════
// COMPONENTES SEPARADOS (hooks fuera de .map)
// ════════════════════════════════════════════
function GalleryItem({ item, delay }) {
  const r = useReveal(0.15, delay);
  return (
    <li ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
      <button type="button" className="group relative w-full aspect-square overflow-hidden rounded-2xl bg-[#1A3A8A]/10 border-2 border-[#1A3A8A]/30 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:scale-[1.04] hover:border-[#4A8BFF]/60 hover:shadow-2xl hover:shadow-[#1A3A8A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] motion-reduce:hover:scale-100 motion-reduce:transition-none" aria-label={`Ver imagen: ${item.alt}`}>
        <img src={item.src} alt={item.alt} loading="lazy" decoding="async" width="600" height="600" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'; }} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:translate-y-0">
          <p className="text-white font-black text-base sm:text-lg drop-shadow-lg"><span aria-hidden="true" className="mr-2">{item.emoji}</span>{item.caption}</p>
        </div>
      </button>
    </li>
  );
}

function TestimonialCard({ t, delay }) {
  const r = useReveal(0.15, delay);
  return (
    <li ref={r.ref} className={cls('transition-all ease-out', r.className)} style={r.style}>
      <article className="h-full bg-white/5 backdrop-blur-sm border-2 border-[#1A3A8A]/30 rounded-2xl p-6 sm:p-8 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-2 hover:border-[#4A8BFF]/50 hover:shadow-2xl hover:shadow-[#1A3A8A]/30 motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
        <div className="flex items-center gap-1 text-[#4A8BFF] text-xl sm:text-2xl mb-4" aria-label={`${t.rating || 5} de 5 estrellas`}>★★★★★</div>
        <blockquote className="text-white/80 text-base sm:text-lg mb-4 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
        <footer className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-xl shadow-[#1A3A8A]/30" aria-hidden="true">{t.initials}</div>
          <div>
            <p className="font-bold text-base sm:text-lg">{t.name}</p>
            <p className="text-white/40 text-xs sm:text-sm">Jugador {t.age} años · {t.months} {t.months === 1 ? 'mes' : 'meses'} con nosotros</p>
          </div>
        </footer>
      </article>
    </li>
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
              {/* CORRECCIÓN 3: Cambiado de <h1> a <span> — el h1 real está en Hero */}
              <span className="font-black text-xl sm:text-2xl tracking-tight">AC<span className="text-[#4A8BFF]">RUX</span></span>
              <p className="text-[10px] text-white/30 tracking-[4px]">FÚTBOL CLUB</p>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-6">
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
              <span>PLAZAS</span>
            </div>
            <Button href="#contacto" size="sm" className="hidden sm:inline-flex">
              <span aria-hidden="true">⚡</span><span>¡QUIERO PROBAR!</span>
            </Button>
            <button type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /> : (<><path d="M3 6h18" strokeLinecap="round" /><path d="M3 12h18" strokeLinecap="round" /><path d="M3 18h18" strokeLinecap="round" /></>)}
              </svg>
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={cls('md:hidden overflow-hidden transition-[max-height,opacity] duration-300', open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0')}>
          <ul className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">{l.label}</a></li>
            ))}
            <li className="pt-2"><Button href="#contacto" size="md" fullWidth onClick={() => setOpen(false)}><span aria-hidden="true">⚡</span>¡Quiero probar!</Button></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function StickyCTA({ spots }) {
  const passed = useScrollY(400);
  return (
    <aside aria-label="Llamado a la acción fijo" className={cls('fixed bottom-0 inset-x-0 z-40 bg-black/90 backdrop-blur-xl border-t-2 border-[#4A8BFF]/30 p-3 sm:p-4 transition-transform duration-500 motion-reduce:transition-none', passed ? 'translate-y-0' : 'translate-y-full')}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm sm:text-base text-center sm:text-left">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75 animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#4A8BFF]" />
          </span>
          <span><strong className="text-[#4A8BFF] text-lg sm:text-xl font-black">{formatNumber(spots)}</strong> plazas libres · ¡Últimas oportunidades!</span>
        </div>
        <Button href="#contacto" size="md" className="w-full sm:w-auto"><span aria-hidden="true">🚀</span>¡ASEGURA TU CUPO!</Button>
      </div>
    </aside>
  );
}

function WhatsAppFloat() {
  return (
    <a href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-40 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full">
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping motion-reduce:animate-none" />
      <span className="relative flex w-14 h-14 sm:w-16 sm:h-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 motion-reduce:transition-none">
        {/* CORRECCIÓN 1: Eliminado el texto "245" suelto */}
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
// SECCIONES
// ════════════════════════════════════════════
function Hero({ spots, total }) {
  const occupied = total - spots;
  const occ = percentage(occupied, total);
  const r1 = useReveal(0.15, 0);
  const r2 = useReveal(0.15, 100);
  const r3 = useReveal(0.15, 200);
  const r4 = useReveal(0.15, 300);
  const r5 = useReveal(0.15, 400);
  const r6 = useReveal(0.15, 500);
  return (
    <section id="top" className="relative pt-32 pb-16 px-4 sm:px-8 text-center overflow-hidden min-h-screen flex items-center" aria-label="Introducción a Acrux Fútbol Club">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920')" }} role="img" aria-label="Fondo de estadio de fútbol" />
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div ref={r1.ref} className={cls('transition-all ease-out', r1.className)} style={r1.style}>
          <div className="inline-flex items-center gap-3 bg-[#1A3A8A]/40 backdrop-blur-sm px-6 py-2.5 rounded-full text-sm font-black mb-6 border-2 border-[#4A8BFF]/30 shadow-2xl shadow-[#1A3A8A]/30">
            <span className="text-[#4A8BFF]">PASIÓN</span><span className="text-white/30">•</span><span className="text-white">CONSTANCIA</span><span className="text-white/30">•</span><span className="text-white">SACRIFICIO</span>
          </div>
        </div>
        <div ref={r2.ref} className={cls('transition-all ease-out', r2.className)} style={r2.style}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] mb-6">
            ACRUX ES LA CLAVE<br />
            <span className="bg-gradient-to-r from-[#4A8BFF] via-[#6AABFF] to-[#1A3A8A] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient motion-reduce:animate-none">PARA FORMAR</span><br />
            FUTURAS ESTRELLAS
          </h1>
        </div>
        <div ref={r3.ref} className={cls('transition-all ease-out', r3.className)} style={r3.style}>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            No solo entrenamos fútbol, <strong className="text-white">lo vivimos.</strong> Metodología profesional para llegar al fútbol profesional.
          </p>
        </div>
        <div ref={r4.ref} className={cls('transition-all ease-out', r4.className)} style={r4.style}>
          <GlassCard glowing className="max-w-2xl mx-auto p-6 sm:p-8 mb-10" role="region" aria-label="Plazas disponibles">
            <div className="flex justify-between items-baseline text-sm sm:text-base font-bold mb-3">
              <span className="text-white/70"><span className="text-[#4A8BFF] text-2xl font-black">{formatNumber(spots)}</span> de {formatNumber(total)} disponibles</span>
              <span className="text-white/60">{occ}% ocupado</span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={occ} aria-valuemin="0" aria-valuemax="100" aria-label="Porcentaje de plazas ocupadas">
              <div className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] rounded-full shadow-[0_0_40px_rgba(74,139,255,0.4)] transition-[width] duration-700 ease-out" style={{ width: `${occ}%` }} />
            </div>
            <p className="mt-4 text-xs sm:text-sm text-white/40 text-center">Plazas actualizadas · Cupos para {CONFIG.enrollment.minAge}-{CONFIG.enrollment.maxAge} años</p>
          </GlassCard>
        </div>
        <div ref={r5.ref} className={cls('transition-all ease-out', r5.className)} style={r5.style}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button href="#contacto" size="lg">
              <span className="text-2xl sm:text-3xl motion-safe:group-hover:animate-bounce" aria-hidden="true">⚽</span>
              <span>¡QUIERO MI PRUEBA GRATIS!</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Button>
            <Button href="#galeria" variant="secondary" size="lg">
              <span className="text-[#4A8BFF] text-2xl" aria-hidden="true">▶</span>Ver entrenamientos
            </Button>
          </div>
        </div>
        <div ref={r6.ref} className={cls('transition-all ease-out', r6.className)} style={r6.style}>
          <div className="mt-16 text-white/30 text-xs sm:text-sm" aria-hidden="true">
            <p className="tracking-[3px] sm:tracking-[4px]">⬇ DESLIZA PARA CONOCER MÁS ⬇</p>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto mt-3 flex justify-center">
              <div className="w-1.5 h-3 bg-gradient-to-b from-[#4A8BFF] to-transparent rounded-full mt-1.5 animate-pulse motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// NUEVA SECCIÓN: Metodología (entre Hero y Galería)
function Metodologia() {
  const r1 = useReveal(0.15, 0);
  const r2 = useReveal(0.15, 100);
  const r3 = useReveal(0.15, 200);
  const r4 = useReveal(0.15, 300);

  const pilares = [
    { icon: '🧠', title: 'Mentalidad', desc: 'Desarrollo del carácter, disciplina y actitud ganadora dentro y fuera de la cancha.' },
    { icon: '⚙️', title: 'Técnica', desc: 'Fundamentos individuales, control de balón, pase, recepción y definición.' },
    { icon: '🏃', title: 'Táctica', desc: 'Comprensión del juego, posicionamiento, lectura de espacios y toma de decisiones.' },
    { icon: '💪', title: 'Físico', desc: 'Preparación atlética adaptada a la edad, velocidad, resistencia y coordinación.' },
  ];

  return (
    <section id="metodologia" className="py-20 sm:py-24 px-4 sm:px-8" aria-labelledby="metodologia-title">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="NUESTRA" highlight="METODOLOGÍA" description="Formación integral de 4 pilares para llegar al fútbol profesional." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div ref={r1.ref} className={cls('transition-all ease-out', r1.className)} style={r1.style}>
            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-4">{pilares[0].icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{pilares[0].title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pilares[0].desc}</p>
            </GlassCard>
          </div>
          <div ref={r2.ref} className={cls('transition-all ease-out', r2.className)} style={r2.style}>
            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-4">{pilares[1].icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{pilares[1].title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pilares[1].desc}</p>
            </GlassCard>
          </div>
          <div ref={r3.ref} className={cls('transition-all ease-out', r3.className)} style={r3.style}>
            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-4">{pilares[2].icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{pilares[2].title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pilares[2].desc}</p>
            </GlassCard>
          </div>
          <div ref={r4.ref} className={cls('transition-all ease-out', r4.className)} style={r4.style}>
            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-4">{pilares[3].icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{pilares[3].title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pilares[3].desc}</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// CORRECCIÓN 2: Componentes separados para evitar hooks en .map()
function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <section id="galeria" className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black" aria-labelledby="galeria-title">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="VIVE" highlight="ACRUX POR DENTRO" description="Momentos reales de nuestros entrenamientos y partidos." />
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 list-none">
          {GALLERY.map((item, i) => (
            <GalleryItem key={item.src} item={item} delay={i * 80} />
          ))}
        </ul>
      </div>
      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setActive(null)}>
          <button type="button" onClick={() => setActive(null)} aria-label="Cerrar" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">✕</button>
          <img src={active.src} alt={active.alt} className="max-w-full max-h-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

// CORRECCIÓN 2: Componente separado para Testimonials
function Testimonials() {
  return (
    <section id="testimonios" className="py-20 sm:py-24 px-4 sm:px-8" aria-labelledby="testimonios-title">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="LO QUE DICEN" highlight="LAS FAMILIAS" description="Testimonios reales de padres que confiaron en Acrux." />
        <ul className="grid sm:grid-cols-2 gap-6 sm:gap-8 list-none">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 100} />
          ))}
        </ul>
      </div>
    </section>
  );
}

// CORRECCIÓN 6: Formulario integrado con Formspree
function ContactForm({ spots }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formId = useId();

  const validate = (d) => {
    const e = {};
    if (!d.parentName?.trim()) e.parentName = 'Requerido';
    if (!d.phone?.trim()) e.phone = 'Requerido';
    else if (!/^[+\d\s()-]{7,}$/.test(d.phone.trim())) e.phone = 'Teléfono inválido';
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Email inválido';
    if (d.playerAge) {
      const a = parseInt(d.playerAge, 10);
      if (Number.isNaN(a) || a < CONFIG.enrollment.minAge || a > CONFIG.enrollment.maxAge) e.playerAge = `Edad entre ${CONFIG.enrollment.minAge} y ${CONFIG.enrollment.maxAge}`;
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

    try {
      // CORRECCIÓN 6: Envío real a Formspree
      const response = await fetch(CONFIG.formspree.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 6000);
  };

  const inputBase = 'w-full p-4 rounded-xl bg-black/50 border-2 text-base text-white placeholder-white/20 transition-[border-color,box-shadow,transform] duration-300 focus:outline-none focus:scale-[1.01] motion-reduce:focus:scale-100 motion-reduce:transition-none';
  const inputOk = 'border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:shadow-2xl focus:shadow-[#1A3A8A]/30';
  const inputErr = 'border-red-500/70 focus:border-red-400';

  return (
    <section id="contacto" className="relative py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black border-t border-[#1A3A8A]/30" aria-labelledby="contacto-title">
      <div aria-hidden="true" className="absolute inset-0 bg-[#1A3A8A]/10 blur-3xl animate-pulse-slow motion-reduce:animate-none" />
      <div className="relative z-10 max-w-md mx-auto">
        <header className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-[#4A8BFF] text-sm sm:text-base font-black tracking-[3px] bg-[#1A3A8A]/20 px-5 py-2 rounded-full border-2 border-[#4A8BFF]/20 mb-4">🚀 ÚLTIMO PASO</span>
          <h2 id="contacto-title" className="text-3xl sm:text-4xl font-black mt-4 leading-tight">ASEGURA <span className="text-[#4A8BFF] animate-pulse motion-reduce:animate-none">TU CUPO</span></h2>
          <p className="text-white/40 text-sm sm:text-base mt-2">Completa el formulario y te contactamos en menos de {CONFIG.enrollment.guaranteeHours}h</p>
          <div className="mt-4 inline-flex items-center gap-3 bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/20 px-5 py-2 rounded-full text-sm font-black text-[#4A8BFF] backdrop-blur-sm" role="status" aria-live="polite">
            <span aria-hidden="true">⚠️</span> Solo <span className="text-white font-bold text-xl">{formatNumber(spots)}</span> plazas disponibles
          </div>
        </header>
        <form onSubmit={onSubmit} noValidate className="space-y-5 bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-white/5 shadow-2xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/30 transition-shadow duration-300 motion-reduce:transition-none" aria-describedby={`${formId}-help`}>
          <div>
            <label htmlFor={`${formId}-parent`} className="text-xs sm:text-sm font-bold text-white/50 block mb-2 tracking-wider">👤 Nombre del acudiente <span className="text-[#4A8BFF]" aria-hidden="true">*</span></label>
            <input id={`${formId}-parent`} type="text" name="parentName" autoComplete="name" placeholder="Ej: Carlos Rodríguez" required aria-invalid={!!errors.parentName} className={cls(inputBase, errors.parentName ? inputErr : inputOk)} />
            {errors.parentName && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.parentName}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="text-xs sm:text-sm font-bold text-white/50 block mb-2 tracking-wider">📱 WhatsApp <span className="text-[#4A8BFF]" aria-hidden="true">*</span></label>
            <input id={`${formId}-phone`} type="tel" name="phone" inputMode="tel" autoComplete="tel" placeholder="Ej: 300 123 4567" required aria-invalid={!!errors.phone} className={cls(inputBase, errors.phone ? inputErr : inputOk)} />
            {errors.phone && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-email`} className="text-xs sm:text-sm font-bold text-white/50 block mb-2 tracking-wider">✉️ Email (opcional)</label>
            <input id={`${formId}-email`} type="email" name="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" aria-invalid={!!errors.email} className={cls(inputBase, errors.email ? inputErr : inputOk)} />
            {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${formId}-player`} className="text-xs sm:text-sm font-bold text-white/50 block mb-2 tracking-wider">⚽ Jugador</label>
              <input id={`${formId}-player`} type="text" name="playerName" placeholder="Nombre" className={cls(inputBase, inputOk)} />
            </div>
            <div>
              <label htmlFor={`${formId}-age`} className="text-xs sm:text-sm font-bold text-white/50 block mb-2 tracking-wider">🎂 Edad</label>
              <input id={`${formId}-age`} type="number" name="playerAge" min={CONFIG.enrollment.minAge} max={CONFIG.enrollment.maxAge} placeholder="14" aria-invalid={!!errors.playerAge} className={cls(inputBase, errors.playerAge ? inputErr : inputOk)} />
              {errors.playerAge && <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.playerAge}</p>}
            </div>
          </div>
          {/* CORRECCIÓN 4: Prop "shine" eliminada */}
          <Button type="submit" size="lg" fullWidth disabled={status === 'sending'}>
            {status === 'sending' && (<><svg className="animate-spin motion-reduce:animate-none w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" /><path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>Enviando…</>)}
            {status === 'success' && (<><span className="text-2xl motion-safe:animate-bounce" aria-hidden="true">✅</span>¡CUPO ASEGURADO!</>)}
            {status === 'error' && (<><span className="text-2xl" aria-hidden="true">❌</span>Error. Intenta de nuevo.</>)}
            {status === 'idle' && (<><span className="text-2xl" aria-hidden="true">🏆</span>¡QUIERO MI CUPO!</>)}
          </Button>
          <p id={`${formId}-help`} className="text-center text-xs sm:text-sm text-white/30" aria-live="polite">{status === 'success' ? '🎉 Te contactaremos pronto. Revisa tu WhatsApp.' : status === 'error' ? '❌ Hubo un error. Verifica tus datos e intenta de nuevo.' : '⚠️ Plazas limitadas. Te contactaremos en menos de 24 horas.'}</p>
        </form>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════
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
      <BackgroundGlows />
      <Navbar spots={spots} />
      <main>
        <Hero spots={spots} total={CONFIG.enrollment.totalSpots} />
        <Metodologia />
        <Gallery />
        <Testimonials />
        <ContactForm spots={spots} />
      </main>
      {/* CORRECCIÓN 5: Footer con padding-bottom para no ser tapado por StickyCTA */}
      <footer className="relative z-10 border-t border-[#1A3A8A]/30 py-8 pb-28 sm:pb-32 px-4 text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} {CONFIG.brand.fullName}. Todos los derechos reservados.</p>
      </footer>
      <StickyCTA spots={spots} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
