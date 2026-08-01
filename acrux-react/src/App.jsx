// src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [plazas, setPlazas] = useState(7);
  const [formEnviado, setFormEnviado] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlazas(prev => (prev > 0 ? prev - 1 : prev));
    }, 45000);
    
    const handleScroll = () => {
      setShowSticky(window.scrollY > 500);
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
    <div className="bg-black text-white min-h-screen font-sans">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-3 bg-black/95 backdrop-blur-md border-b border-[#1A3A8A]/50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1A3A8A] rounded-xl flex items-center justify-center font-black text-white text-xl border border-[#4A8BFF]/30">
            A
          </div>
          <div>
            <h1 className="font-black text-lg leading-none">AC<span className="text-[#4A8BFF]">RUX</span></h1>
            <p className="text-[8px] text-white/40 tracking-[2px] leading-none">FÚTBOL CLUB</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-[#1A3A8A]/20 border border-[#4A8BFF]/30 px-3 py-1 rounded-full text-xs font-bold text-[#4A8BFF]">
            <span className="w-2 h-2 bg-[#4A8BFF] rounded-full animate-pulse"></span>
            {plazas} plazas libres
          </div>
          <a 
            href="#contacto" 
            className="bg-[#1A3A8A] hover:bg-[#2A5AC8] transition-all px-4 sm:px-6 py-2 rounded-full font-bold text-sm text-white hover:scale-105 border border-[#4A8BFF]/30"
          >
            <span className="hidden sm:inline">¡Quiero probar!</span>
            <span className="sm:hidden">🔥</span>
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1A3A8A]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1A3A8A]/20 text-[#4A8BFF] px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-[#4A8BFF]/30">
            <span className="animate-pulse">⚠️</span>
            ÚLTIMAS <span className="text-white">{plazas}</span> PLAZAS
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-4">
            DONDE LOS <br />
            <span className="text-[#4A8BFF] bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] bg-clip-text text-transparent">
              CAMPEONES
            </span> <br />
            SE FORJAN
          </h1>
          
          <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8">
            En Acrux no entrenamos fútbol, <strong className="text-white">forjamos ÉLITE</strong>.
            Metodología profesional, valores y camino al fútbol profesional.
          </p>

          {/* Barra de progreso - 70% ocupado */}
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white/70"><span className="text-[#4A8BFF]">{plazas}</span> de 20 disponibles</span>
              <span className="text-white/40">70% ocupado</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] rounded-full transition-all duration-1000"
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>

          <a 
            href="#contacto" 
            className="inline-block bg-[#1A3A8A] hover:bg-[#2A5AC8] px-8 py-4 rounded-full font-black text-sm sm:text-base text-white transition-all hover:scale-105 shadow-lg shadow-[#1A3A8A]/40 border border-[#4A8BFF]/30"
          >
            ¡QUIERO MI PRUEBA GRATIS! →
          </a>
        </div>
      </section>

      {/* ===== GALERÍA - VIVE ACRUX POR DENTRO ===== */}
      <section className="py-16 px-4 sm:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            VIVE <span className="text-[#4A8BFF]">ACRUX</span> POR DENTRO
          </h2>
          <p className="text-white/50 text-center mb-10 max-w-lg mx-auto">
            Momentos reales de nuestros entrenamientos y partidos
          </p>

          {/* Galería 2 columnas en móvil, 3 en escritorio */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="aspect-square bg-[#1A3A8A]/10 rounded-2xl overflow-hidden border border-[#1A3A8A]/30 hover:border-[#4A8BFF]/50 transition-all hover:scale-[1.02]">
                <img 
                  src={`/fotos/foto${num}.jpg`} 
                  alt={`Entrenamiento Acrux ${num}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = `https://placehold.co/400x400/1A3A8A/FFFFFF?text=FOTO+${num}`}
                />
              </div>
            ))}
          </div>
          
          <p className="text-white/30 text-xs text-center mt-4">
            📸 Pon tus fotos en <code className="bg-white/10 px-2 py-1 rounded">public/fotos/</code> y cambia los nombres
          </p>
        </div>
      </section>

      {/* ===== TESTIMONIOS - LO QUE DICEN LAS FAMILIAS ===== */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-4">
            LO QUE DICEN <span className="text-[#4A8BFF]">LAS FAMILIAS</span>
          </h2>
          <p className="text-white/50 text-center mb-10 max-w-lg mx-auto">
            Testimonios reales de padres que confiaron en Acrux
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Testimonio 1 */}
            <div className="bg-white/5 border border-[#1A3A8A]/30 rounded-2xl p-6 hover:border-[#4A8BFF]/50 transition-all">
              <div className="flex items-center gap-1 text-[#4A8BFF] text-sm mb-3">★★★★★</div>
              <p className="text-white/80 text-sm mb-4">
                "Mi hijo llegó sin confianza y en 2 meses ya es titular"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A3A8A] rounded-full flex items-center justify-center text-white font-bold border border-[#4A8BFF]/30">
                  M
                </div>
                <div>
                  <p className="font-bold text-sm">Mamá de Santiago</p>
                  <p className="text-white/30 text-xs">10 años · 3 meses en Acrux</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 con video */}
            <div className="bg-white/5 border border-[#1A3A8A]/30 rounded-2xl p-6 hover:border-[#4A8BFF]/50 transition-all">
              <div className="flex items-center gap-1 text-[#4A8BFF] text-sm mb-3">★★★★★</div>
              <p className="text-white/80 text-sm mb-4">
                "El cambio en mi hijo ha sido increíble. Gracias Acrux"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A3A8A] rounded-full flex items-center justify-center text-white font-bold border border-[#4A8BFF]/30">
                  P
                </div>
                <div>
                  <p className="font-bold text-sm">Papá de Mateo</p>
                  <p className="text-white/30 text-xs">12 años · 1 año en Acrux</p>
                </div>
              </div>
              {/* Video embebido */}
              <div className="mt-4 aspect-video bg-black/50 rounded-xl overflow-hidden border border-[#1A3A8A]/30 flex items-center justify-center">
                <div className="text-center text-white/30">
                  <span className="text-3xl block mb-2">▶️</span>
                  <span className="text-xs">Aquí irá tu video de entrevista</span>
                  <br />
                  <span className="text-[10px] text-white/20">Pega link de YouTube en el iframe</span>
                </div>
                {/*
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/TU_VIDEO_ID" 
                  title="Entrevista Acrux"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACTO - ASEGURA TU CUPO ===== */}
      <section id="contacto" className="py-16 px-4 sm:px-8 bg-black border-t border-[#1A3A8A]/30">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#4A8BFF] text-xs font-black tracking-[2px]">🚀 ÚLTIMO PASO</span>
            <h2 className="text-3xl font-black mt-2">
              ASEGURA <span className="text-[#4A8BFF]">TU CUPO</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Completa el formulario y te contactamos en 24h
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-[#1A3A8A]/20 border border-[#4A8BFF]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#4A8BFF]">
              ⚠️ Solo <span className="text-white">{plazas}</span> plazas disponibles
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 block mb-1">NOMBRE DEL ACUDIENTE *</label>
              <input 
                className="w-full p-3 rounded-xl bg-white/5 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-colors text-sm text-white placeholder-white/30"
                placeholder="Ej: Carlos Rodríguez"
                required
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-white/50 block mb-1">WHATSAPP *</label>
              <input 
                className="w-full p-3 rounded-xl bg-white/5 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-colors text-sm text-white placeholder-white/30"
                placeholder="Ej: 300 123 4567"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/50 block mb-1">NOMBRE DEL JUGADOR</label>
              <input 
                className="w-full p-3 rounded-xl bg-white/5 border border-[#1A3A8A]/50 focus:border-[#4A8BFF] focus:outline-none transition-colors text-sm text-white placeholder-white/30"
                placeholder="Ej: Santiago Rodríguez"
              />
            </div>

            <button 
  type="submit" 
  className="w-full bg-[#1A3A8A] hover:bg-[#2A5AC8] p-4 rounded-xl font-black text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base border border-[#4A8BFF]/30"
>
  {formEnviado ? (
    <>
      <span>✅</span> ¡CUPO ASEGURADO!
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

      {/* ===== STICKY CTA ===== */}
      <div className={`fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-[#1A3A8A]/50 p-3 transition-transform duration-500 z-40 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="w-2 h-2 bg-[#4A8BFF] rounded-full animate-pulse"></span>
            <span><strong className="text-[#4A8BFF]">{plazas}</strong> plazas libres · ¡Últimas oportunidades!</span>
          </div>
          <a 
            href="#contacto" 
            className="bg-[#1A3A8A] hover:bg-[#2A5AC8] px-6 py-2 rounded-full font-black text-sm text-white border border-[#4A8BFF]/30"
          >
            ¡ASEGURA TU CUPO!
          </a>
        </div>
      </div>

      {/* ===== WHATSAPP FLOTANTE ===== */}
      <a 
        href="https://wa.me/573001234567?text=Hola%20Acrux%2C%20quiero%20asegurar%20el%20cupo%20de%20mi%20hijo" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all"
        aria-label="WhatsApp"
      >
        💬
      </a>

    </div>
  );
}

export default App;