import React, { useState } from 'react';
import { LogOut, Menu as MenuIcon, X, Calendar, Sparkles } from 'lucide-react';
import { UserAccount } from '../types';

export type ActiveView = 'inicio' | 'menu' | 'nosotros' | 'reservas';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  currentUser,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView) => {
    setMobileMenuOpen(false);

    if (view === 'nosotros') {
      if (activeView !== 'inicio') {
        setActiveView('inicio');
        setTimeout(() => {
          const el = document.getElementById('sobre-nosotros');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const el = document.getElementById('sobre-nosotros');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { key: ActiveView; label: string }[] = [
    { key: 'inicio', label: 'Inicio' },
    { key: 'menu', label: 'Menú' },
    { key: 'nosotros', label: 'Sobre Nosotros' },
    { key: 'reservas', label: 'Reservas' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 bg-[#07060b]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Brand / Logotipo */}
      <button
        type="button"
        className="flex items-center gap-2 text-left group"
        onClick={() => handleNavClick('inicio')}
      >
        <span className="font-serif tracking-[4px] text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
          GASTROBAR
        </span>
        <span className="text-[10px] uppercase tracking-[2px] text-[#ffb703] font-medium hidden sm:inline-block border-l border-white/20 pl-2.5 ml-1">
          SAN GIL • SANTANDER
        </span>
      </button>

      {/* Navegación Desktop */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {navItems.map((item) => {
          const isActive = activeView === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                isActive
                  ? 'bg-[#ffb703] text-black font-semibold shadow-[0_0_15px_rgba(255,183,3,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => handleNavClick(item.key)}
            >
              {item.label}
            </button>
          );
        })}

        {/* Info Usuario Autenticado */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-3 ml-2 border-l border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[#ffb703] font-semibold max-w-[120px] truncate">
              {currentUser.name}
            </span>
            <span className="text-gray-400 text-[10px] hidden xl:inline">
              ({currentUser.city || 'Colombia'})
            </span>
          </div>
        )}

        {/* Cerrar Sesión */}
        <button
          type="button"
          className="ml-2 text-gray-400 hover:text-red-400 text-xs flex items-center gap-1 p-2 rounded-full hover:bg-white/5 transition-colors"
          onClick={onLogout}
          title="Cerrar sesión"
        >
          <LogOut size={14} />
          <span className="hidden lg:inline text-[11px]">Salir</span>
        </button>
      </nav>

      {/* Botón Reservar Rápido + Toggle Móvil */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          className="px-3 py-1.5 rounded-full bg-[#ffb703] text-black font-semibold text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1"
          onClick={() => handleNavClick('reservas')}
        >
          <Calendar size={12} />
          <span>Reservar</span>
        </button>

        <button
          type="button"
          className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Cajón Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0912]/98 backdrop-blur-2xl border-b border-white/10 p-5 shadow-2xl flex flex-col gap-3 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm font-medium tracking-wider uppercase transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-[#ffb703] text-black font-bold'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => handleNavClick(item.key)}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-xs">●</span>}
              </button>
            );
          })}

          {currentUser && (
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{currentUser.name}</span>
                <span className="text-gray-400 text-[10px]">({currentUser.city || 'CO'})</span>
              </div>
              <button
                type="button"
                className="text-red-400 hover:text-red-300 flex items-center gap-1 py-1 px-2 rounded bg-red-500/10 border border-red-500/20"
                onClick={onLogout}
              >
                <LogOut size={12} />
                <span>Salir</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
