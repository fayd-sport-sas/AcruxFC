// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Galeria from './components/Galeria';
import Testimonios from './components/Testimonios';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [plazas, setPlazas] = useState(7);
  const [formEnviado, setFormEnviado] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // Inicializar AOS con configuración más notoria
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-cubic',
      offset: 120,
      delay: 100,
    });

    const interval = setInterval(() => {
      setPlazas(prev => (prev > 0 ? prev - 1 : prev));
    }, 45000);
    
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormEnviado(true);
    setTimeout(() => setFormEnviado(false), 5000);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">

      {/* ===== FONDO CON PARTÍCULAS Y EFECTOS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradientes animados de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A3A8A]/10 to-[#0A0A0A]"></div>
        
        {/* Esferas de luz flotantes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4A8BFF]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1A3A8A]/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4A8BFF]/5 rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Puntos de luz (estrellas) */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* NAVBAR CON EFECTO GLASS Y SOMBRA            */}
      {/* ========================================== */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-3 transition-all duration-500 ${
        window.scrollY > 20 
          ? 'bg-black/90 backdrop-blur-xl border-b border-[#4A8BFF]/20 shadow-2xl shadow-[#1A3A8A]/20' 
          : 'bg-black/50 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4A8BFF] rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[#1A3A8A]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              A
            </div>
          </div>
          <div>
            <h1 className="font-black text-lg leading-none tracking-tight group-hover:tracking-wider transition-all duration-300">
              AC<span className="text-[#4A8BFF] group-hover:text-[#6AABFF] transition-all duration-300">RUX</span>
            </h1>
            <p className="text-[8px] text-white/30 tracking-[3px] leading-none group-hover:text-white/50 group-hover:tracking-[4px] transition-all duration-300">
              FÚTBOL CLUB
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-[#1A3A8A]/20 border border-[#4A8BFF]/20 px-3 py-1.5 rounded-full text-xs font-bold text-[#4A8BFF] backdrop-blur-sm hover:bg-[#1A3A8A]/30 hover:border-[#4A8BFF]/40 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A8BFF]"></span>
            </span>
            {plazas} plazas libres
          </div>
          <a 
            href="#contacto" 
            className="relative group overflow-hidden bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] transition-all duration-300 px-4 sm:px-6 py-2 rounded-full font-bold text-sm text-white shadow-lg shadow-[#1A3A8A]/30 hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="hidden sm:inline">¡Quiero probar!</span>
            <span className="sm:hidden">🔥</span>
          </a>
        </div>
      </nav>

      {/* ========================================== */}
      {/* HERO CON EFECTO PARALLAX Y ANIMACIONES      */}
      {/* ========================================== */}
      <section className="relative pt-32 pb-16 px-4 sm:px-8 text-center overflow-hidden min-h-screen flex items-center">
        {/* Fondo parallax */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920')] bg-cover bg-center opacity-5 scale-110 animate-parallax"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div 
            className="inline-flex items-center gap-2 bg-[#1A3A8A]/30 backdrop-blur-sm text-[#4A8BFF] px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-[#4A8BFF]/20 shadow-lg transform hover:scale-105 transition-all duration-300"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <span className="animate-pulse">⚠️</span>
            ÚLTIMAS <span className="text-white font-bold">{plazas}</span> PLAZAS
          </div>

          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-4"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            DONDE LOS <br />
            <span className="bg-gradient-to-r from-[#4A8BFF] via-[#6AABFF] to-[#1A3A8A] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              CAMPEONES
            </span> <br />
            SE FORJAN
          </h1>
          
          <p 
            className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            En Acrux no entrenamos fútbol, <strong className="text-white">forjamos ÉLITE</strong>.
            Metodología profesional, valores y camino al fútbol profesional.
          </p>

          {/* Barra de progreso con glow */}
          <div 
            className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-8 shadow-xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/20 transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="300"
          >
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white/70"><span className="text-[#4A8BFF]">{plazas}</span> de 20 disponibles</span>
              <span className="text-white/40">70% ocupado</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(74,139,255,0.3)]"
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <a 
              href="#contacto" 
              className="relative group inline-block bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] px-8 py-4 rounded-full font-black text-sm sm:text-base text-white transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#1A3A8A]/40 hover:shadow-[#1A3A8A]/60"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4A8BFF] to-[#1A3A8A] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
              ¡QUIERO MI PRUEBA GRATIS! →
            </a>
            <a 
              href="#galeria" 
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white/80 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 hover:text-white"
            >
              <span className="animate-pulse">▶</span>
              Ver entrenamientos
            </a>
          </div>

          {/* Scroll indicator con animación */}
          <div 
            className="mt-12 text-white/20 text-xs animate-bounce"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="500"
          >
            <span>DESLIZA PARA CONOCER MÁS</span>
            <div className="w-4 h-6 border-2 border-white/20 rounded-full mx-auto mt-1 flex justify-center">
              <div className="w-1 h-2 bg-gradient-to-b from-[#4A8BFF] to-transparent rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* GALERÍA CON EFECTO 3D Y ANIMACIONES         */}
      {/* ========================================== */}
      <section id="galeria" className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
        <div className="absolute inset-0 bg-[#1A3A8A]/5 blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
              VIVE <span className="text-[#4A8BFF] animate-pulse">ACRUX</span> POR DENTRO
            </h2>
            <p className="text-white/50 text-center mb-12 max-w-lg mx-auto">
              Momentos reales de nuestros entrenamientos y partidos
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <div 
                key={num}
                className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={100 + index * 80}
                data-aos-offset="50"
              >
                <img 
                  src={`/fotos/foto${num}.jpg`} 
                  alt={`Entrenamiento Acrux ${num}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => e.target.src = `https://placehold.co/400x400/1A3A8A/FFFFFF?text=FOTO+${num}`}
                />
                {/* Overlay al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A8A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-bold text-sm">Entrenamiento Acrux</p>
                  <p className="text-white/60 text-xs">Ver más →</p>
                </div>
                {/* Icono flotante */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-white/20 text-xs text-center mt-6">
            📸 Pon tus fotos en <code className="bg-white/5 px-2 py-1 rounded border border-white/5">public/fotos/</code>
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* TESTIMONIOS CON TARJETAS 3D Y EFECTOS      */}
      {/* ========================================== */}
      <section id="testimonios" className="py-20 px-4 sm:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A3A8A]/10 to-black"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
              LO QUE DICEN <span className="text-[#4A8BFF] animate-pulse">LAS FAMILIAS</span>
            </h2>
            <p className="text-white/50 text-center mb-12 max-w-lg mx-auto">
              Testimonios reales de padres que confiaron en Acrux
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Testimonio 1 */}
            <div 
              className="group bg-white/5 backdrop-blur-sm border border-[#1A3A8A]/30 rounded-2xl p-6 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#1A3A8A]/30"
              data-aos="flip-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="flex items-center gap-1 text-[#4A8BFF] text-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="hover:scale-125 transition-transform duration-200">★</span>
                ))}
              </div>
              <p className="text-white/80 text-sm mb-4 italic group-hover:text-white transition-colors duration-300">
                "Mi hijo llegó sin confianza y en 2 meses ya es titular"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#1A3A8A]/30 group-hover:scale-110 transition-transform duration-300">
                  M
                </div>
                <div>
                  <p className="font-bold text-sm group-hover:text-[#4A8BFF] transition-colors duration-300">Mamá de Santiago</p>
                  <p className="text-white/30 text-xs">10 años · 3 meses en Acrux</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div 
              className="group bg-white/5 backdrop-blur-sm border border-[#1A3A8A]/30 rounded-2xl p-6 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#1A3A8A]/30"
              data-aos="flip-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-1 text-[#4A8BFF] text-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="hover:scale-125 transition-transform duration-200">★</span>
                ))}
              </div>
              <p className="text-white/80 text-sm mb-4 italic group-hover:text-white transition-colors duration-300">
                "El cambio en mi hijo ha sido increíble. Gracias Acrux"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#1A3A8A]/30 group-hover:scale-110 transition-transform duration-300">
                  P
                </div>
                <div>
                  <p className="font-bold text-sm group-hover:text-[#4A8BFF] transition-colors duration-300">Papá de Mateo</p>
                  <p className="text-white/30 text-xs">12 años · 1 año en Acrux</p>
                </div>
              </div>
              <div className="mt-4 aspect-video bg-black/50 rounded-xl overflow-hidden border border-[#1A3A8A]/30 flex items-center justify-center group-hover:border-[#4A8BFF]/30 transition-colors group-hover:shadow-lg group-hover:shadow-[#1A3A8A]/20">
                <div className="text-center text-white/30 transition-all duration-300 group-hover:text-white/50">
                  <span className="text-3xl block mb-2 group-hover:scale-125 group-hover:text-[#4A8BFF] transition-all duration-300">▶️</span>
                  <span className="text-xs">Video de entrevista</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* CONTACTO CON EFECTO GLOW Y ANIMACIONES      */}
      {/* ========================================== */}
      <section id="contacto" className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black border-t border-[#1A3A8A]/20">
        <div className="absolute inset-0 bg-[#1A3A8A]/10 blur-3xl animate-pulse-slow"></div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <div 
            className="text-center mb-8"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-[#4A8BFF] text-xs font-black tracking-[3px] bg-[#1A3A8A]/20 px-4 py-1.5 rounded-full border border-[#4A8BFF]/20">🚀 ÚLTIMO PASO</span>
            <h2 className="text-3xl font-black mt-4">
              ASEGURA <span className="text-[#4A8BFF] animate-pulse">TU CUPO</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Completa el formulario y te contactamos en 24h
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-[#1A3A8A]/20 border border-[#4A8BFF]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#4A8BFF] backdrop-blur-sm animate-pulse">
              ⚠️ Solo <span className="text-white font-bold text-sm">{plazas}</span> plazas disponibles
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-4 bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/5 shadow-2xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/20 transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            <div>
              <label className="text-xs font-bold text-white/50 block mb-1 tracking-wider">NOMBRE DEL ACUDIENTE *</label>
              <input 
                className="w-full p-3 rounded-xl bg-black/50 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-sm text-white placeholder-white/20 focus:shadow-lg focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: Carlos Rodríguez"
                required
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-white/50 block mb-1 tracking-wider">WHATSAPP *</label>
              <input 
                className="w-full p-3 rounded-xl bg-black/50 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-sm text-white placeholder-white/20 focus:shadow-lg focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/50 block mb-1 tracking-wider">NOMBRE DEL JUGADOR</label>
              <input 
                className="w-full p-3 rounded-xl bg-black/50 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-sm text-white placeholder-white/20 focus:shadow-lg focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: Santiago Rodríguez"
              />
            </div>

            <button 
              type="submit" 
              className="relative group w-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] p-4 rounded-xl font-black text-white transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-[#1A3A8A]/40 hover:shadow-[#1A3A8A]/60 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              {formEnviado ? (
                <>
                  <span className="animate-bounce">✅</span> ¡CUPO ASEGURADO!
                </>
              ) : (
                <>
                  <span>🏆</span> ¡QUIERO MI CUPO!
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-white/30">
              ⚠️ Plazas limitadas. Te contactaremos en menos de 24 horas.
            </p>
          </form>
        </div>
      </section>

      {/* ========================================== */}
      {/* STICKY CTA CON EFECTO GLOW                  */}
      {/* ========================================== */}
      <div className={`fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-[#4A8BFF]/20 p-3 transition-transform duration-500 z-40 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A8BFF]"></span>
            </span>
            <span><strong className="text-[#4A8BFF]">{plazas}</strong> plazas libres · ¡Últimas oportunidades!</span>
          </div>
          <a 
            href="#contacto" 
            className="bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] px-6 py-2 rounded-full font-black text-sm text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-[#1A3A8A]/30 hover:shadow-[#1A3A8A]/50"
          >
            ¡ASEGURA TU CUPO!
          </a>
        </div>
      </div>

      {/* ========================================== */}
      {/* WHATSAPP FLOTANTE CON EFECTO PULSO          */}
      {/* ========================================== */}
      <a 
        href="https://wa.me/573001234567?text=Hola%20Acrux%2C%20quiero%20asegurar%20el%20cupo%20de%20mi%20hijo" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
          <div className="relative bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-[#25D366]/30 hover:scale-110 hover:rotate-6 transition-all duration-300">
            💬
          </div>
        </div>
      </a>

      {/* ===== ANIMACIONES CSS PERSONALIZADAS ===== */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes parallax {
          0% { transform: scale(1.1) translateY(0); }
          50% { transform: scale(1.1) translateY(-20px); }
          100% { transform: scale(1.1) translateY(0); }
        }
        .animate-parallax {
          animation: parallax 15s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

    </div>
  );
}

export default App;