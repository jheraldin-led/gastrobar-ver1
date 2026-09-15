import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:30',
    guests: 2,
    zone: 'Barra Principal (Vista Mixología)',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div
        className="reservation-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-gray-400 hover:text-white p-2.5 rounded-full hover:bg-white/10 transition-colors"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#d89643]/20 border border-[#d89643] flex items-center justify-center mx-auto mb-4 text-[#f5bd6f]">
              <CheckCircle size={32} />
            </div>
            <span className="text-xs uppercase tracking-[3px] text-[#d89643] font-bold">
              RESERVA CONFIRMADA
            </span>
            <h3 className="text-2xl font-serif mt-1 text-[#fffaf0]">
              Esperamos su visita, {formData.name}
            </h3>
            <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
              Hemos reservado para <strong>{formData.guests} personas</strong> el <strong>{formData.date}</strong> a las <strong>{formData.time} hrs</strong> en la <strong>{formData.zone}</strong>.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-black/50 border border-white/10 text-xs text-left max-w-sm mx-auto space-y-1">
              <div className="text-gray-400">Código de confirmación: <span className="text-[#ffb703] font-mono">GB-{Math.floor(100000 + Math.random() * 900000)}</span></div>
              <div className="text-gray-400">Contacto registrado: <span className="text-white">{formData.phone || formData.email}</span></div>
            </div>
            <button
              type="button"
              className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f5bd6f] to-[#d89643] text-black font-semibold text-xs tracking-wider uppercase transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(216,150,67,0.3)]"
              onClick={handleReset}
            >
              CERRAR
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#d89643] mb-1 text-xs font-bold tracking-[2.5px] uppercase">
              <Sparkles size={14} />
              <span>GASTROBAR RESERVAS</span>
            </div>
            <h2 className="text-2xl font-serif text-[#fbf9f4] mb-1">
              Reservar una Mesa
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Asegure su lugar para una noche sensorial con coctelería de colección y cocina de autor.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#16141c] border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 310 456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#16141c] border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold flex items-center gap-1">
                    <Calendar size={12} /> Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#16141c] border border-white/15 rounded-lg px-2 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold flex items-center gap-1">
                    <Clock size={12} /> Horario
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#16141c] border border-white/15 rounded-lg px-2 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                  >
                    <option value="19:00">19:00 hrs (Atardecer)</option>
                    <option value="20:00">20:00 hrs</option>
                    <option value="20:30">20:30 hrs</option>
                    <option value="21:30">21:30 hrs (Cena estelar)</option>
                    <option value="22:30">22:30 hrs (Tragos & Velada)</option>
                    <option value="23:30">23:30 hrs (Late Night)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold flex items-center gap-1">
                    <Users size={12} /> Personas
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#16141c] border border-white/15 rounded-lg px-2 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                  >
                    <option value={1}>1 persona (Barra)</option>
                    <option value={2}>2 personas (Pareja)</option>
                    <option value={3}>3 personas</option>
                    <option value={4}>4 personas (Mesa)</option>
                    <option value={5}>5 personas</option>
                    <option value={6}>6 personas (Grupo)</option>
                    <option value={8}>8+ personas (VIP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold flex items-center gap-1">
                  <MapPin size={12} /> Zona y Sede Preferida
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full bg-[#16141c] border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none"
                >
                  <option value="Barra Principal (Zona G - Bogotá)">Barra Principal de Mármol (Zona G - Bogotá)</option>
                  <option value="Salón Íntimo & Terciopelo (El Poblado - Medellín)">Salón Íntimo & Terciopelo (El Poblado - Medellín)</option>
                  <option value="Terraza Amurallada (Centro Histórico - Cartagena)">Terraza Amurallada (Centro Histórico - Cartagena)</option>
                  <option value="Cava VIP de Destilados Colombianos">Cava VIP (Degustación de Viche & Rones Solera)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                  Petición Especial o Alergias (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Aniversario, cóctel sin alcohol, preferencia de asiento..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#16141c] border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:border-[#d89643] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#f5bd6f] via-[#d89643] to-[#a8661d] text-black font-extrabold text-xs tracking-[2px] uppercase shadow-[0_10px_25px_rgba(216,150,67,0.35)] hover:brightness-105 active:scale-[0.99] transition-all"
              >
                CONFIRMAR RESERVA
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
