import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_DRINKS } from './data/gastrobarData';
import { Drink, UserAccount } from './types';
import { LoginView } from './components/LoginView';
import { Navbar, ActiveView } from './components/Navbar';
import { MenuView } from './components/MenuView';
import { ReservationView } from './components/ReservationView';
import { Sparkles, ArrowRight, Compass, MapPin, Clock, Wine, Flame, Disc3 } from 'lucide-react';
import luxuryBarImg from './assets/images/luxury_speakeasy_bar_1789510584046.jpg';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('inicio');

  const [drinks] = useState<Drink[]>(INITIAL_DRINKS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentDrink = drinks[activeIndex] || drinks[0];

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gastrobar_session_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Ensure 'nosotros' always directs smoothly to the Sobre Nosotros section in 'inicio'
  useEffect(() => {
    if (activeView === 'nosotros') {
      setActiveView('inicio');
      setTimeout(() => {
        const el = document.getElementById('sobre-nosotros');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeView]);

  const handleAuthenticate = (user: UserAccount) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('gastrobar_session_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    setActiveView('inicio');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('gastrobar_session_user');
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setActiveView('inicio');
  };

  const next = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % drinks.length);
  }, [drinks.length]);

  const prev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + drinks.length) % drinks.length);
  }, [drinks.length]);

  const selectDrink = (index: number) => {
    setActiveIndex(index);
  };

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      next();
    }, 3500);
  }, [next, stopAutoplay]);

  // Posicionamiento horizontal fluido en perspectiva 3D
  const getCardTransform = (index: number): React.CSSProperties => {
    const total = drinks.length;
    let offset = (index - activeIndex) % total;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isMobile = windowWidth < 768;

    if (offset === 0) {
      return {
        transform: 'translate(-50%, -50%) translateX(0%) scale(1) perspective(1400px) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }

    if (isMobile) {
      if (Math.abs(offset) >= 2) {
        return {
          transform: `translate(-50%, -50%) translateX(${offset * 120}%) scale(0.4)`,
          opacity: 0,
          zIndex: 1,
          visibility: 'hidden',
          pointerEvents: 'none'
        };
      }
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate(-50%, -50%) translateX(${dir * 88}%) scale(0.72) perspective(1000px) rotateY(${dir * -14}deg)`,
        opacity: 0.28,
        zIndex: 15,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }

    if (offset === -1) {
      return {
        transform: 'translate(-50%, -50%) translateX(-95%) scale(0.78) perspective(1400px) rotateY(16deg)',
        opacity: 0.45,
        zIndex: 20,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }
    if (offset === 1) {
      return {
        transform: 'translate(-50%, -50%) translateX(95%) scale(0.78) perspective(1400px) rotateY(-16deg)',
        opacity: 0.45,
        zIndex: 20,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }
    if (offset <= -2) {
      return {
        transform: 'translate(-50%, -50%) translateX(-175%) scale(0.6) perspective(1400px) rotateY(26deg)',
        opacity: 0.22,
        zIndex: 10,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }
    if (offset >= 2) {
      return {
        transform: 'translate(-50%, -50%) translateX(175%) scale(0.6) perspective(1400px) rotateY(-26deg)',
        opacity: 0.22,
        zIndex: 10,
        visibility: 'visible',
        pointerEvents: 'auto'
      };
    }
    return {};
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    startAutoplay();

    return () => {
      window.removeEventListener('resize', handleResize);
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  // Si no hay cuenta autenticada, se bloquea el acceso
  if (!currentUser) {
    return <LoginView onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="min-h-screen bg-[#07060b] text-white flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* MENÚ SUPERIOR PERSISTENTE EN TODO MOMENTO */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* CONTENIDO SEGÚN LA VISTA ACTIVA */}
      {activeView === 'menu' && (
        <MenuView onGoToReservation={() => setActiveView('reservas')} />
      )}

      {activeView === 'reservas' && (
        <ReservationView
          currentUser={currentUser}
          onGoToMenu={() => setActiveView('menu')}
        />
      )}

      {activeView === 'inicio' && (
        <>
          {/* Universo del Carrusel 3D */}
          <div className="gastrobar-universe flex-1 flex flex-col justify-center pt-20 sm:pt-24 pb-12">
            {/* Luces de neón difusas ambientales */}
            <div className="ambient-glow glow-red"></div>
            <div className="ambient-glow glow-purple"></div>
            <div className="stars-texture"></div>

            {/* Resplandores prismáticos celestiales */}
            <div className="holographic-aura aura-top-left"></div>
            <div className="holographic-aura aura-bottom-right"></div>
            <div className="light-ray"></div>

            {/* Subtítulo de bienvenida minimalista */}
            <div className="text-center z-20 mb-2 mt-4 sm:mt-6">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[4px] text-[#ffb703] px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-flex items-center gap-1.5">
                <Sparkles size={11} />
                COLECCIÓN DE ESPIRITUOSOS & DESTILADOS
              </span>
            </div>

            {/* Contenedor Principal Amplio del Carrusel (Sin barra inferior) */}
            <main
              className="carousel-wrapper"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <div className="carousel-stage">
                {drinks.map((drink, index) => (
                  <div
                    key={drink.id}
                    className={`capsule-card ${index === activeIndex ? 'is-active' : ''}`}
                    style={getCardTransform(index)}
                    onClick={() => selectDrink(index)}
                  >
                    {/* Contenedor Cápsula Oval Fluida */}
                    <div className="capsule-frame">
                      <img src={drink.image} alt={drink.name} className="capsule-img" />
                      <div className="capsule-overlay"></div>
                      <div className="capsule-rim-glow"></div>
                    </div>

                    {/* Tipografía de alta costura superpuesta */}
                    {index === activeIndex && (
                      <div className="overflow-title-container">
                        <h1 className="high-fashion-title">
                          {currentDrink.name}
                        </h1>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Botones circulares translúcidos (< y >) */}
              <div className="carousel-controls">
                <button
                  type="button"
                  className="control-btn prev"
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  type="button"
                  className="control-btn next"
                  aria-label="Siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Acciones directas sutiles bajo los controles */}
              <div className="mt-8 z-30 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-[#ffb703] text-black hover:bg-amber-300 font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,183,3,0.3)] flex items-center gap-2"
                  onClick={() => setActiveView('menu')}
                >
                  <span>Explorar Menú Completo</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 text-xs font-semibold uppercase tracking-wider transition-all"
                  onClick={() => setActiveView('reservas')}
                >
                  <span>Reservar Mesa</span>
                </button>
              </div>
            </main>
          </div>

          {/* Sección Editorial "Sobre Nosotros" integrada en la página principal */}
          <section id="sobre-nosotros" className="veloris-editorial-section flex flex-col items-center w-full">
            <div className="veloris-editorial-card">
              {/* Lado Izquierdo: Composición de Fotos Superpuestas */}
              <div className="veloris-editorial-gallery">
                <div className="veloris-photo-primary-frame">
                  <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop"
                    alt="Bartender preparando cóctel artesanal con destilados colombianos"
                    className="veloris-photo-img"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="veloris-photo-ambient-warmth"></div>
                </div>

                <div className="veloris-photo-secondary-frame">
                  <img
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop"
                    alt="Mesa con gastronomía colombiana de autor y copas"
                    className="veloris-photo-img"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="veloris-photo-rim-accent"></div>
                </div>
              </div>

              {/* Lado Derecho: Contenido Editorial "Sobre Nosotros" */}
              <div className="veloris-editorial-content">
                <h2 className="veloris-editorial-title">
                  <span className="veloris-title-row-1">
                    <span className="serif-bold">SABORES</span>
                    <span className="script-italic">colombianos</span>
                  </span>
                  <span className="veloris-title-row-2">
                    <span className="serif-italic">hechos para</span>
                    <span className="serif-bold uppercase">COMPARTIR</span>
                  </span>
                </h2>

                <div className="veloris-editorial-tagline">
                  COCTELERÍA DE AUTOR & DESTILADOS ANCESTRALES DE COLOMBIA
                </div>

                <p className="veloris-editorial-body">
                  Rescatamos la riqueza botánica y destiladora de Colombia: desde el viche del Pacífico
                  hasta los rones de solera del Caribe y los cafés de altura del Eje Cafetero. Platillos
                  y cócteles concebidos con ingredientes nativos para disfrutarse sin prisa.
                </p>

                <p className="veloris-editorial-quote">
                  Ya sea para degustar un trago de autor al caer la tarde frente al Río Fonce o quedarse a compartir toda la velada.
                  <br />
                  <span className="veloris-quote-sub">
                    (Sede Exclusiva: Cra. 9 # 11-45, Centro Histórico de San Gil, Santander.)
                  </span>
                </p>

                <div className="veloris-editorial-actions">
                  <button
                    type="button"
                    className="veloris-btn-reserve-pill"
                    onClick={() => setActiveView('reservas')}
                  >
                    <span>RESERVAR UNA MESA</span>
                  </button>
                  <button
                    type="button"
                    className="px-5 py-3 rounded-[4px] bg-[#6e1e2c]/10 hover:bg-[#6e1e2c] hover:text-white border border-[#6e1e2c]/25 text-[#6e1e2c] text-[11px] uppercase tracking-[2px] transition-all font-bold"
                    onClick={() => setActiveView('menu')}
                  >
                    VER LA CARTA
                  </button>
                </div>

                <div className="veloris-editorial-badges">
                  <div className="veloris-badge-item">
                    <span className="veloris-badge-dot"></span>
                    <span>Viches, Rones & Destilados Colombianos</span>
                  </div>
                  <div className="veloris-badge-item">
                    <span className="veloris-badge-dot"></span>
                    <span>Precios en Pesos Colombianos (COP)</span>
                  </div>
                  <div className="veloris-badge-item">
                    <span className="veloris-badge-dot"></span>
                    <span>Sede Exclusiva: San Gil, Santander</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INFORMACIÓN DETALLADA DEBAJO DE LA TARJETA PRINCIPAL */}
            <div className="w-full max-w-[1120px] mx-auto mt-12 space-y-8 text-white px-2">
              {/* Bloque 1: Nuestra Barra Speakeasy y Manifiesto de Destilados */}
              <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-9 shadow-2xl space-y-8">
                {/* Fila Principal: Foto de la Barra (más grande) y Dirección/Horario al lado */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  {/* Foto de la Barra Speakeasy - Grande y Protagónica */}
                  <div className="md:col-span-7 lg:col-span-7 relative min-h-[300px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-amber-500/25 shadow-2xl group flex flex-col justify-end">
                    <img
                      src={luxuryBarImg}
                      alt="Barra principal speakeasy de autor en maderas oscuras con estanterías de destilados y lámparas clásicas"
                      className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 p-5 text-left">
                      <span className="text-[9.5px] uppercase tracking-[2.5px] text-[#ffb703] font-semibold block mb-1">
                        ATMÓSFERA CLÁSICA & SPEAKEASY
                      </span>
                      <h3 className="font-serif font-bold text-white text-xl sm:text-2xl leading-snug">
                        Nuestra Barra & Cava
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 max-w-md">
                        Maderas nobles, candelabros de cristal, luz ámbar tenue y colección de destilados colombianos.
                      </p>
                    </div>
                  </div>

                  {/* Ficha de Ubicación, Horarios y Experiencia al Lado (Ocupa todo el espacio lateral) */}
                  <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between gap-4">
                    {/* Tarjeta de Dirección y Horario */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/15 text-left space-y-4 shadow-xl flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ffb703] uppercase tracking-wider">
                        <MapPin size={15} className="shrink-0" />
                        <span>Sede & Ubicación</span>
                      </div>

                      <div className="space-y-1">
                        <p className="font-serif text-lg text-white font-medium">
                          Cra. 9 # 11-45
                        </p>
                        <p className="text-xs text-stone-300 font-light">
                          Centro Histórico • Frente al Río Fonce
                        </p>
                        <p className="text-[11px] text-[#d89643] font-light">
                          San Gil, Santander, Colombia
                        </p>
                      </div>

                      <div className="pt-3.5 border-t border-white/10 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                          <Clock size={14} className="text-[#ffb703] shrink-0" />
                          <span>Horario de Atención</span>
                        </div>
                        <p className="text-xs text-amber-200/90 pl-5 font-light">
                          Miércoles a Domingo • Desde las 5:00 PM
                        </p>
                      </div>
                    </div>

                    {/* Tarjeta complementaria de Experiencia */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 text-left space-y-1.5">
                      <div className="flex items-center gap-2 text-[#ffb703] text-xs font-semibold uppercase tracking-wider">
                        <Wine size={14} />
                        <span>Coctelería & Gastrobar</span>
                      </div>
                      <p className="text-xs text-stone-300 font-light leading-relaxed">
                        Hielo tallado a mano, cristalería de corte vintage, botánicos autóctonos y brasas lentas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Manifiesto y 3 Pilares */}
                <div className="pt-4 border-t border-white/10 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[3px] text-[#ffb703] font-semibold uppercase">
                    <Sparkles size={12} />
                    <span>IDENTIDAD, BRASAS & DESTILADOS</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
                    "El licor colombiano merece la misma reverencia que los mejores destilados del mundo."
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    Inspirados en la elegancia de los speakeasies clásicos y la botánica viva de Colombia, concebimos este espacio en San Gil como un refugio de maderas cálidas, lámparas de luz tenue y destilados selectos.
                  </p>

                  <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                    Cada cóctel combina hielo tallado a mano, cristalería de corte clásico y reducciones de frutas nativas santandereanas. La cocina honra cocciones lentas de 12 horas braseadas con panela campesina y toques ahumados sutiles.
                  </p>

                  {/* 3 Pilares en tarjetas limpias */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                      <div className="flex items-center gap-2 text-[#ffb703]">
                        <Wine size={15} />
                        <span className="text-xs font-semibold text-white">Destilados Nativos</span>
                      </div>
                      <p className="text-[11px] text-stone-400 font-light leading-snug">
                        Viche del Chocó, rones de solera y ginebras botánicas.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                      <div className="flex items-center gap-2 text-[#ffb703]">
                        <Flame size={15} />
                        <span className="text-xs font-semibold text-white">Cocina & Brasas</span>
                      </div>
                      <p className="text-[11px] text-stone-400 font-light leading-snug">
                        Posta cartagenera braseada 12h, ceviches y cocina lenta.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                      <div className="flex items-center gap-2 text-[#ffb703]">
                        <Disc3 size={15} />
                        <span className="text-xs font-semibold text-white">Vinilo & Río</span>
                      </div>
                      <p className="text-[11px] text-stone-400 font-light leading-snug">
                        Brisa del Río Fonce y selecta música analógica sin afanes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque 2: Galería de los 3 Espacios en San Gil */}
              <div className="pt-2">
                <div className="text-center mb-5">
                  <span className="text-[10.5px] tracking-[3px] uppercase text-[#ffb703] font-semibold block">
                    NUESTROS AMBIENTES
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    Tres atmósferas en el Centro Histórico de San Gil
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=85"
                      alt="Barra principal de destilados"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-mono text-[#ffb703] uppercase tracking-wider block">ESPACIO 01</span>
                      <p className="text-xs font-serif text-white font-medium">Barra Principal de Destilados</p>
                    </div>
                  </div>

                  <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85"
                      alt="Terraza con vista al Río Fonce"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-mono text-[#ffb703] uppercase tracking-wider block">ESPACIO 02</span>
                      <p className="text-xs font-serif text-white font-medium">Terraza Mirador Río Fonce</p>
                    </div>
                  </div>

                  <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=85"
                      alt="Salón Colonial de Piedra"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="text-[10px] font-mono text-[#ffb703] uppercase tracking-wider block">ESPACIO 03</span>
                      <p className="text-xs font-serif text-white font-medium">Salón Colonial de Piedra & Velas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
