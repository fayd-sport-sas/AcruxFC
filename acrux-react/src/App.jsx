// src/App.jsx - VERSIÓN JÓVENES (12-27 AÑOS)
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [plazas, setPlazas] = useState(3);
  const [formEnviado, setFormEnviado] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
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

      {/* ===== EFECTOS DE FONDO CON ENERGÍA ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A3A8A]/5 to-black"></div>
        {/* Efectos de luz más intensos */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4A8BFF]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1A3A8A]/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4A8BFF]/5 rounded-full blur-3xl"></div>
      </div>

      {/* ========================================== */}
      {/* NAVBAR - MÁS COMPACTO Y CLARO             */}
      {/* ========================================== */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-2.5 bg-black/80 backdrop-blur-xl border-b border-[#4A8BFF]/20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4A8BFF] rounded-xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-[#1A3A8A]/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              A
            </div>
          </div>
          <div>
            <h1 className="font-black text-2xl leading-none tracking-tight group-hover:tracking-wider transition-all duration-300">
              AC<span className="text-[#4A8BFF] group-hover:text-[#6AABFF] transition-all duration-300">RUX</span>
            </h1>
            <p className="text-[10px] text-white/30 tracking-[4px] leading-none group-hover:text-white/50 group-hover:tracking-[5px] transition-all duration-300">
              FÚTBOL CLUB
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Contador de plazas - MÁS GRANDE */}
          <div className="hidden sm:flex items-center gap-3 bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/30 px-4 py-1.5 rounded-full text-sm font-black text-[#4A8BFF] shadow-lg shadow-[#1A3A8A]/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4A8BFF]"></span>
            </span>
            <span className="text-white">{plazas}</span> PLAZAS
          </div>
          
          {/* BOTÓN NAVBAR - MÁS GRANDE */}
          <a 
            href="#contacto" 
            className="relative overflow-hidden bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] transition-all duration-300 px-6 py-3 rounded-full font-bold text-base text-white shadow-xl shadow-[#1A3A8A]/40 hover:scale-110 hover:shadow-[#1A3A8A]/60"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></span>
            <span className="hidden sm:inline">⚡ ¡QUIERO PROBAR!</span>
            <span className="sm:hidden">⚡</span>
          </a>
        </div>
      </nav>

      {/* ========================================== */}
      {/* HERO - IMPACTO TOTAL PARA JÓVENES         */}
      {/* ========================================== */}
      <section className="relative pt-32 pb-16 px-4 sm:px-8 text-center overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920')] bg-cover bg-center opacity-10 scale-110"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* ===== BADGE DE URGENCIA - IMPACTANTE ===== */}
          <div 
            className="inline-flex items-center gap-3 bg-[#1A3A8A]/40 backdrop-blur-sm text-[#4A8BFF] px-6 py-2.5 rounded-full text-sm font-black mb-6 border-2 border-[#4A8BFF]/30 shadow-2xl shadow-[#1A3A8A]/30 hover:scale-105 transition-all duration-300"
            data-aos="fade-down"
          >
            <span className="animate-pulse text-2xl">⚠️</span>
            <span className="text-white text-xl">ÚLTIMAS</span>
            <span className="text-3xl text-[#4A8BFF]">{plazas}</span>
            <span className="text-white text-xl">PLAZAS</span>
            <span className="text-white/60 text-sm line-through ml-2">$150.000</span>
            <span className="text-[#4A8BFF] text-lg font-black">$105.000</span>
          </div>

          {/* ===== TÍTULO GIGANTE ===== */}
          <h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            DONDE LOS <br />
            <span className="bg-gradient-to-r from-[#4A8BFF] via-[#6AABFF] to-[#1A3A8A] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient text-6xl sm:text-8xl lg:text-9xl">
              CAMPEONES
            </span> <br />
            SE FORJAN
          </h1>
          
          {/* ===== DESCRIPCIÓN MÁS ENERGÉTICA ===== */}
          <p 
            className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            En Acrux no entrenamos fútbol, <strong className="text-white text-2xl">🔥 FORJAMOS ÉLITE</strong>.<br />
            Metodología profesional, valores y camino al fútbol profesional.
          </p>

          {/* ===== BARRA DE PROGRESO GIGANTE ===== */}
          <div 
            className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 mb-10 shadow-2xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/30 transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex justify-between text-base font-black mb-3">
              <span className="text-white/70"><span className="text-[#4A8BFF] text-2xl">{plazas}</span> de 20 disponibles</span>
              <span className="text-white/60 text-xl">70% ocupado</span>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] rounded-full shadow-[0_0_40px_rgba(74,139,255,0.4)]"
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>

          {/* ===== BOTONES GIGANTES ===== */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {/* Botón Principal - GIGANTE */}
            <a 
              href="#contacto" 
              className="relative group inline-flex items-center gap-4 bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] px-10 py-5 rounded-full font-black text-lg sm:text-xl text-white transition-all duration-300 hover:scale-110 shadow-2xl shadow-[#1A3A8A]/50 hover:shadow-[#1A3A8A]/80"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4A8BFF] to-[#1A3A8A] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
              <span className="text-4xl group-hover:animate-bounce">⚽</span>
              <span>¡QUIERO MI PRUEBA GRATIS!</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
            
            {/* Botón Secundario - MÁS GRANDE */}
            <a 
              href="#galeria" 
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border-2 border-white/20 px-8 py-4 rounded-full font-bold text-base sm:text-lg text-white/80 transition-all duration-300 hover:scale-110 hover:text-white hover:border-white/40"
            >
              <span className="text-[#4A8BFF] text-3xl group-hover:scale-125 transition-transform">▶</span>
              Ver entrenamientos
            </a>
          </div>

          {/* ===== SCROLL INDICATOR MÁS LLAMATIVO ===== */}
          <div 
            className="mt-16 text-white/30 text-sm animate-bounce"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <span className="tracking-[4px]">⬇ DESLIZA PARA CONOCER MÁS ⬇</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full mx-auto mt-2 flex justify-center">
              <div className="w-1.5 h-3 bg-gradient-to-b from-[#4A8BFF] to-transparent rounded-full mt-1.5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* GALERÍA - CON ICONOS GRANDES               */}
      {/* ========================================== */}
      <section id="galeria" className="py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
  <div className="max-w-6xl mx-auto">
    <div data-aos="fade-up">
      <h2 className="text-4xl sm:text-5xl font-black text-center mb-4">
        VIVE <span className="text-[#4A8BFF]">ACRUX</span> POR DENTRO
      </h2>
      <p className="text-white/50 text-center mb-14 max-w-lg mx-auto text-lg">
        Momentos reales de nuestros entrenamientos y partidos
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
      {/* FOTO 1 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_a04.jpg" 
          alt="Entrenamiento técnico en Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">⚡ Entrenamiento técnico</p>
        </div>
      </div>
      
      {/* FOTO 2 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_a01.jpg" 
          alt="Entrenamiento físico en Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">💪 Entrenamiento físico</p>
        </div>
      </div>
      
      {/* FOTO 3 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_09.jpg" 
          alt="Partido amistoso Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">🏟️ Partido amistoso</p>
        </div>
      </div>
      
      {/* FOTO 4 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_10.jpg" 
          alt="Celebración Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">🎉 Celebración</p>
        </div>
      </div>
      
      {/* FOTO 5 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_11.jpg" 
          alt="Equipo Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">🤝 Equipo Acrux</p>
        </div>
      </div>
      
      {/* FOTO 6 */}
      <div className="group relative aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border-2 border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:scale-[1.08] hover:shadow-2xl hover:shadow-[#1A3A8A]/40">
        <img 
          src="public/foto/img_a02.jpg"
          alt="Entrenamiento con balón Acrux" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white font-black text-lg">⚽ Entrenamiento con balón</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ========================================== */}
      {/* TESTIMONIOS - CON ESTRELLAS GIGANTES       */}
      {/* ========================================== */}
      <section id="testimonios" className="py-24 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up">
            <h2 className="text-4xl sm:text-5xl font-black text-center mb-4">
              LO QUE DICEN <span className="text-[#4A8BFF]">LAS FAMILIAS</span>
            </h2>
            <p className="text-white/50 text-center mb-14 max-w-lg mx-auto text-lg">
              Testimonios reales de padres que confiaron en Acrux
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div 
              className="bg-white/5 backdrop-blur-sm border-2 border-[#1A3A8A]/30 rounded-2xl p-8 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#1A3A8A]/30"
              data-aos="flip-left"
              data-aos-delay="100"
            >
              <div className="flex items-center gap-1 text-[#4A8BFF] text-2xl mb-4">★★★★★</div>
              <p className="text-white/80 text-lg mb-4 italic">"Mi hijo llegó sin confianza y en 2 meses ya es titular"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#1A3A8A]/30">M</div>
                <div>
                  <p className="font-bold text-lg">Mamá de Santiago</p>
                  <p className="text-white/40 text-sm">10 años · 3 meses</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-white/5 backdrop-blur-sm border-2 border-[#1A3A8A]/30 rounded-2xl p-8 hover:border-[#4A8BFF]/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#1A3A8A]/30"
              data-aos="flip-right"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-1 text-[#4A8BFF] text-2xl mb-4">★★★★★</div>
              <p className="text-white/80 text-lg mb-4 italic">"El cambio en mi hijo ha sido increíble"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1A3A8A] to-[#4A8BFF] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#1A3A8A]/30">P</div>
                <div>
                  <p className="font-bold text-lg">Papá de Mateo</p>
                  <p className="text-white/40 text-sm">12 años · 1 año</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* CONTACTO - FORMULARIO CON ESTILO JOVEN    */}
      {/* ========================================== */}
      <section id="contacto" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black border-t border-[#1A3A8A]/30">
        <div className="absolute inset-0 bg-[#1A3A8A]/10 blur-3xl animate-pulse-slow"></div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <div 
            className="text-center mb-10"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="text-[#4A8BFF] text-lg font-black tracking-[3px] bg-[#1A3A8A]/20 px-6 py-2 rounded-full border-2 border-[#4A8BFF]/20">🚀 ÚLTIMO PASO</span>
            <h2 className="text-4xl font-black mt-4">
              ASEGURA <span className="text-[#4A8BFF] animate-pulse">TU CUPO</span>
            </h2>
            <p className="text-white/40 text-base mt-2">
              Completa el formulario y te contactamos en 24h
            </p>
            <div className="mt-4 inline-flex items-center gap-3 bg-[#1A3A8A]/20 border-2 border-[#4A8BFF]/20 px-5 py-2 rounded-full text-sm font-black text-[#4A8BFF] backdrop-blur-sm animate-pulse">
              ⚠️ Solo <span className="text-white font-bold text-xl">{plazas}</span> plazas disponibles
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-5 bg-white/5 backdrop-blur-sm p-8 rounded-3xl border-2 border-white/5 shadow-2xl shadow-[#1A3A8A]/10 hover:shadow-[#1A3A8A]/30 transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            <div>
              <label className="text-sm font-bold text-white/50 block mb-2 tracking-wider">👤 NOMBRE DEL ACUDIENTE *</label>
              <input 
                type="text"
                className="w-full p-4 rounded-xl bg-black/50 border-2 border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-base text-white placeholder-white/20 focus:shadow-2xl focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: Carlos Rodríguez"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-bold text-white/50 block mb-2 tracking-wider">📱 WHATSAPP *</label>
              <input 
                type="tel"
                className="w-full p-4 rounded-xl bg-black/50 border-2 border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-base text-white placeholder-white/20 focus:shadow-2xl focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white/50 block mb-2 tracking-wider">⚽ NOMBRE DEL JUGADOR</label>
              <input 
                type="text"
                className="w-full p-4 rounded-xl bg-black/50 border-2 border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-all duration-300 text-base text-white placeholder-white/20 focus:shadow-2xl focus:shadow-[#1A3A8A]/30 focus:scale-[1.02]"
                placeholder="Ej: Santiago Rodríguez"
              />
            </div>

            {/* BOTÓN FORMULARIO GIGANTE */}
            <button 
              type="submit" 
              className="relative group w-full max-w-md mx-auto block bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] py-5 px-8 rounded-xl font-black text-lg text-white transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-3 shadow-2xl shadow-[#1A3A8A]/50 hover:shadow-[#1A3A8A]/80 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              {formEnviado ? (
                <>
                  <span className="animate-bounce text-3xl">✅</span> ¡CUPO ASEGURADO!
                </>
              ) : (
                <>
                  <span className="text-3xl">🏆</span> ¡QUIERO MI CUPO!
                </>
              )}
            </button>

            <p className="text-center text-sm text-white/30">
              ⚠️ Plazas limitadas. Te contactaremos en menos de 24 horas.
            </p>
          </form>
        </div>
      </section>

      {/* ========================================== */}
      {/* STICKY CTA - MÁS IMPACTANTE                */}
      {/* ========================================== */}
      <div className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t-2 border-[#4A8BFF]/30 p-4 transition-transform duration-500 z-40 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-base sm:text-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A8BFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4A8BFF]"></span>
            </span>
            <span><strong className="text-[#4A8BFF] text-2xl">{plazas}</strong> plazas libres · ¡Últimas oportunidades!</span>
          </div>
          <a 
            href="#contacto" 
            className="bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] hover:from-[#2A5AC8] hover:to-[#5A9BFF] px-8 py-3 rounded-full font-black text-base text-white transition-all duration-300 hover:scale-110 shadow-2xl shadow-[#1A3A8A]/40 hover:shadow-[#1A3A8A]/70 whitespace-nowrap"
          >
            🚀 ¡ASEGURA TU CUPO!
          </a>
        </div>
      </div>

      {/* ========================================== */}
      {/* WHATSAPP FLOTANTE - MÁS GRANDE             */}
      {/* ========================================== */}
      <a 
        href="https://wa.me/573001234567?text=Hola%20Acrux%2C%20quiero%20asegurar%20el%20cupo%20de%20mi%20hijo" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-40"></div>
          <div className="relative bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-[#25D366]/40 hover:scale-110 hover:rotate-12 transition-all duration-300">
            💬
          </div>
        </div>
      </a>

      {/* ===== ANIMACIONES CSS ===== */}
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

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

    </div>
  );
}

export default App;