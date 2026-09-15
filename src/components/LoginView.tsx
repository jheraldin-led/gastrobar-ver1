import React, { useState } from 'react';
import { Lock, Mail, User, MapPin, Eye, EyeOff, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginViewProps {
  onAuthenticate: (user: UserAccount) => void;
}

const DEFAULT_ACCOUNTS = [
  {
    name: 'Sebastián Restrepo',
    email: 'socio@gastrobar.co',
    password: 'Gastrobar2026*',
    city: 'Bogotá D.C.'
  },
  {
    name: 'Camila Ospina',
    email: 'vip@gastrobar.co',
    password: 'Gastrobar2026*',
    city: 'Medellín'
  }
];

export const LoginView: React.FC<LoginViewProps> = ({ onAuthenticate }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('Bogotá D.C.');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    if (!emailTrimmed || !loginPassword) {
      setErrorMessage('Por favor ingrese su correo electrónico y contraseña.');
      return;
    }

    // Check stored accounts or default accounts
    let accounts = [...DEFAULT_ACCOUNTS];
    try {
      const stored = localStorage.getItem('gastrobar_registered_accounts');
      if (stored) {
        accounts = [...accounts, ...JSON.parse(stored)];
      }
    } catch {
      // ignore
    }

    const found = accounts.find(
      (acc) => acc.email.toLowerCase() === emailTrimmed && acc.password === loginPassword
    );

    if (found) {
      setSuccessMessage(`¡Bienvenido de nuevo, ${found.name}! Accediendo a GASTROBAR...`);
      setTimeout(() => {
        onAuthenticate({
          name: found.name,
          email: found.email,
          city: found.city || 'Colombia',
          token: 'token-' + Date.now()
        });
      }, 700);
    } else {
      // If valid email structure but password mismatch or not registered
      const emailExists = accounts.some((acc) => acc.email.toLowerCase() === emailTrimmed);
      if (emailExists) {
        setErrorMessage('Contraseña incorrecta para esta cuenta. Verifique sus datos.');
      } else {
        setErrorMessage(
          'Esta cuenta aún no está registrada. Puede crear su cuenta en la pestaña "Registrarme".'
        );
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim()) {
      setErrorMessage('Por favor ingrese su nombre completo.');
      return;
    }
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setErrorMessage('Por favor ingrese un correo electrónico válido.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    const newAccount = {
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword,
      city: regCity
    };

    try {
      const stored = localStorage.getItem('gastrobar_registered_accounts');
      const accountsList = stored ? JSON.parse(stored) : [];
      accountsList.push(newAccount);
      localStorage.setItem('gastrobar_registered_accounts', JSON.stringify(accountsList));
    } catch {
      // ignore
    }

    setSuccessMessage(`¡Cuenta creada con éxito para ${newAccount.name}! Ingresando al Gastrobar...`);
    setTimeout(() => {
      onAuthenticate({
        name: newAccount.name,
        email: newAccount.email,
        city: newAccount.city,
        token: 'token-' + Date.now()
      });
    }, 700);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-[#060509] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Luces difusas de fondo: destellos dorados y violetas */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#d89643]/30 to-[#e23b20]/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#8a2be2]/25 to-[#4338ca]/15 blur-[140px] pointer-events-none"></div>
      <div className="stars-texture"></div>

      {/* Haz de luz diagonal */}
      <div className="absolute top-0 right-1/3 w-[1px] h-[700px] bg-gradient-to-b from-transparent via-white/40 to-transparent rotate-25 blur-[1px] pointer-events-none"></div>

      {/* Tarjeta Principal de Autenticación */}
      <div className="relative z-10 w-full max-w-[460px] my-auto bg-[#0c0a13]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        
        {/* Encabezado de Marca */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb703]/10 border border-[#ffb703]/30 text-[#ffb703] text-[10px] font-bold tracking-[3px] uppercase mb-3 shadow-[0_0_15px_rgba(255,183,3,0.15)]">
            <Sparkles size={12} />
            <span>GASTROBAR COLOMBIA • PRIVÉ</span>
          </div>

          <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl text-white font-medium tracking-tight mb-2">
            Experiencia Nocturna
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xs mx-auto">
            Acceso exclusivo a coctelería colombiana de autor, reservas de mesa y cava de destilados.
          </p>
        </div>

        {/* Selector de Pestañas (Iniciar Sesión vs Registrarse) */}
        <div className="grid grid-cols-2 p-1 bg-white/5 border border-white/10 rounded-2xl mb-6">
          <button
            type="button"
            className={`py-2.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-gradient-to-r from-[#f5bd6f] to-[#d89643] text-black shadow-[0_4px_15px_rgba(216,150,67,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`py-2.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all ${
              activeTab === 'register'
                ? 'bg-gradient-to-r from-[#f5bd6f] to-[#d89643] text-black shadow-[0_4px_15px_rgba(216,150,67,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(null);
            }}
          >
            Registrarme
          </button>
        </div>

        {/* Mensajes de Alerta */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#d89643]/20 border border-[#d89643]/60 text-[#fce8c7] text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 size={16} className="text-[#f5bd6f] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* FORMULARIO DE INICIO DE SESIÓN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10.5px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="ejemplo@gastrobar.co"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-gray-500 outline-none transition-all focus:shadow-[0_0_20px_rgba(216,150,67,0.25)]"
                />
                <Mail size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1.5">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-4 py-3 pl-11 pr-11 text-sm text-white placeholder-gray-500 outline-none transition-all focus:shadow-[0_0_20px_rgba(216,150,67,0.25)]"
                />
                <Lock size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#f5bd6f] via-[#d89643] to-[#a8661d] text-black font-extrabold text-xs tracking-[2px] uppercase shadow-[0_8px_25px_rgba(216,150,67,0.35)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>INGRESAR A GASTROBAR</span>
            </button>
          </form>
        )}

        {/* FORMULARIO DE REGISTRO */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1">
                Nombre y Apellido
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Gómez"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-3.5 py-2.5 pl-10 text-sm text-white placeholder-gray-500 outline-none transition-all"
                />
                <User size={15} className="absolute left-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1">
                  Correo Electrónico
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="andres@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-3 py-2.5 pl-9 text-xs text-white placeholder-gray-500 outline-none transition-all"
                  />
                  <Mail size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1">
                  Ciudad (Colombia)
                </label>
                <div className="relative flex items-center">
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-3 py-2.5 pl-9 text-xs text-white outline-none"
                  >
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Pereira">Pereira / Eje Cafetero</option>
                    <option value="Otra ciudad">Otra ciudad</option>
                  </select>
                  <MapPin size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 text-gray-400 hover:text-white"
                    tabIndex={-1}
                  >
                    {showRegPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[1.8px] text-gray-300 font-semibold mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  placeholder="Repetir clave"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full bg-[#13111b] border border-white/15 focus:border-[#d89643] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-3 rounded-xl bg-gradient-to-r from-[#f5bd6f] via-[#d89643] to-[#a8661d] text-black font-extrabold text-xs tracking-[2px] uppercase shadow-[0_8px_25px_rgba(216,150,67,0.35)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>CREAR CUENTA & ACCEDER</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
