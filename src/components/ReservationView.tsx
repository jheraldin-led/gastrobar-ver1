import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle2, Phone, User, MessageSquare } from 'lucide-react';
import { UserAccount, ReservationData } from '../types';

interface ReservationViewProps {
  currentUser: UserAccount | null;
  onGoToMenu: () => void;
}

const ZONES = [
  'Terraza Río Fonce',
  'Salón Colonial',
  'Barra de Destilados'
];

export const ReservationView: React.FC<ReservationViewProps> = ({
  currentUser,
  onGoToMenu
}) => {
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('20:00');
  const [guests, setGuests] = useState<number>(2);
  const [zone, setZone] = useState<string>('Terraza Río Fonce');
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reservationCode = `GS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRes: ReservationData = {
      id: Date.now().toString(),
      code: reservationCode,
      cityName: 'San Gil, Santander',
      venueName: 'Gastrobar San Gil',
      date,
      time,
      guests: Math.max(1, Number(guests) || 1),
      zone,
      name: name.trim() || 'Huésped',
      phone: phone.trim(),
      email: currentUser?.email || '',
      experience: 'Reserva Estándar',
      specialRequest: specialRequest.trim(),
      createdAt: new Date().toISOString()
    };

    setConfirmedReservation(newRes);

    try {
      const existing = localStorage.getItem('gastrobar_reservations');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newRes);
      localStorage.setItem('gastrobar_reservations', JSON.stringify(list));
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white flex flex-col items-center justify-center relative">
      {/* Resplandor sutil de fondo */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]"></div>
      </div>

      <div className="w-full max-w-xl mx-auto">
        {/* Encabezado Conciso y Elegante */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[3px] text-[#ffb703] font-semibold block mb-1.5">
            MESA PRIVADA
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mb-1.5">
            Reservar Mesa
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-1.5">
            <MapPin size={13} className="text-[#ffb703]" />
            <span>Cra. 9 # 11-45, San Gil • Santander</span>
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmación Limpia y Elegante */
          <div className="bg-[#0e0d16] border border-[#ffb703]/30 rounded-2xl p-6 sm:p-8 text-center shadow-2xl animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={24} />
            </div>

            <h2 className="text-xl font-serif font-bold text-white mb-1">
              ¡Reserva Confirmada!
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Te esperamos en Gastrobar San Gil. Tu mesa estará lista a tu llegada.
            </p>

            <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-left mb-6 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Código</span>
                <span className="font-mono font-bold text-[#ffb703]">{confirmedReservation.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Titular</span>
                <span className="text-white font-medium">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fecha</span>
                <span className="text-white font-medium">{confirmedReservation.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hora elegida</span>
                <span className="text-white font-medium">{confirmedReservation.time} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cantidad de personas</span>
                <span className="text-white font-medium">{confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'persona' : 'personas'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ambiente</span>
                <span className="text-[#ffb703] font-medium">{confirmedReservation.zone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="px-6 py-2.5 rounded-full bg-[#ffb703] text-black hover:bg-amber-300 text-xs font-semibold uppercase tracking-wider transition-all"
                onClick={onGoToMenu}
              >
                Ver Menú
              </button>
              <button
                type="button"
                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-gray-300 transition-all"
                onClick={() => setConfirmedReservation(null)}
              >
                Nueva Reserva
              </button>
            </div>
          </div>
        ) : (
          /* Formulario Flexible y Abierto */
          <form
            onSubmit={handleSubmit}
            className="bg-[#0e0d16] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            {/* Fecha y Personas (Cantidad libre) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#ffb703]" />
                  <span>Fecha</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#ffb703]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Users size={13} className="text-[#ffb703]" />
                  <span>Cantidad de personas (cualquiera)</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 text-sm font-bold shrink-0"
                    onClick={() => setGuests((prev) => Math.max(1, Number(prev) - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    required
                    min={1}
                    max={150}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    placeholder="Ej. 2, 6, 15..."
                    className="w-full text-center px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono font-bold text-xs focus:outline-none focus:border-[#ffb703]"
                  />
                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 text-sm font-bold shrink-0"
                    onClick={() => setGuests((prev) => Number(prev) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Hora (Completamente abierta a la que la persona prefiera) */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#ffb703]" />
                  <span>Hora deseada (la que prefieras)</span>
                </span>
                <span className="text-[10px] text-gray-400 font-normal">
                  Ej. 14:00, 19:30, 21:00...
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#ffb703]"
                />

                {/* Accesos rápidos sugeridos opcionales */}
                <div className="w-full sm:w-1/2 flex items-center gap-1.5 justify-between">
                  {['13:00', '18:30', '20:00', '21:30'].map((quickTime) => (
                    <button
                      key={quickTime}
                      type="button"
                      className={`text-[11px] py-1 px-2 rounded-lg transition-all ${
                        time === quickTime
                          ? 'bg-[#ffb703] text-black font-semibold'
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                      }`}
                      onClick={() => setTime(quickTime)}
                    >
                      {quickTime}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Zona / Ambiente Preferido */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Ambiente de preferencia
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ZONES.map((z) => {
                  const isSelected = zone === z;
                  return (
                    <button
                      key={z}
                      type="button"
                      className={`py-2.5 px-2 rounded-xl text-center text-xs transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border border-[#ffb703] text-[#ffb703] font-semibold'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                      }`}
                      onClick={() => setZone(z)}
                    >
                      {z}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Datos Personales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-[#ffb703]" />
                  <span>Nombre completo</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#ffb703]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-[#ffb703]" />
                  <span>Teléfono o WhatsApp</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 310 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#ffb703]"
                />
              </div>
            </div>

            {/* Nota opcional */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={13} className="text-gray-400" />
                <span>Nota o petición especial (opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Celebración de aniversario, mesa junto al río Fonce..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#ffb703]"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ffb703] hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,183,3,0.25)]"
              >
                Confirmar Reserva
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
