import React, { useState } from 'react';
import { X, Check, Compass, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenReservation?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onOpenReservation
}) => {
  const [ordered, setOrdered] = useState(false);

  if (!item) return null;

  const handleOrderClick = () => {
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center py-4">
        <div
          className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-[#09080d]/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] my-auto transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sutil resplandor de fondo cálido */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Botón Cerrar */}
          <button
            type="button"
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-white/20 border border-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-all shadow-lg active:scale-95"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Contenido dividido en 2 columnas adaptable */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center pt-2">
            {/* Lado Izquierdo: Imagen del platillo o destilado */}
            <div className="md:col-span-5 relative flex items-center justify-center">
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/60">
                <img
                  src={item.bottleImage}
                  alt={item.name}
                  className="w-full h-full object-cover filter contrast-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10"></div>

                {item.region && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-amber-200 uppercase tracking-wider">
                    <Compass size={11} className="text-[#ffb703] shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Derecho: Información sensorial, precio y acciones */}
            <div className="md:col-span-7 flex flex-col justify-between text-left space-y-3 sm:space-y-4">
              <div>
                {/* Categoría en amarillo/oro espaciado */}
                <span className="text-[11px] sm:text-xs font-semibold tracking-[3px] uppercase text-[#ffb703] block mb-1">
                  {item.category}
                </span>

                {/* Título en serif bold oro */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ffb703] tracking-wide leading-tight mb-2 sm:mb-3">
                  {item.name}
                </h2>

                {/* Descripción sensorial */}
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-3 sm:mb-4">
                  {item.description}
                </p>

                {/* Notas de cata y origen */}
                {item.notes && item.notes.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] sm:text-[10.5px] uppercase tracking-widest text-stone-400 font-semibold block">
                      NOTAS DE CATA & ORIGEN:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.notes.map((note, i) => (
                        <span
                          key={i}
                          className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-stone-900/80 border border-stone-700/80 text-stone-300 font-light"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maridaje o sugerencia */}
                {item.pairing && (
                  <div className="p-2 sm:p-2.5 rounded-xl border border-amber-900/50 bg-amber-950/20 text-amber-200/90 text-[11px] sm:text-xs leading-snug flex items-center gap-2">
                    <Sparkles size={13} className="text-[#ffb703] shrink-0" />
                    <span>{item.pairing}</span>
                  </div>
                )}
              </div>

              {/* Precio en oro */}
              <div className="pt-1 sm:pt-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ffb703] tracking-wide mb-3">
                  {item.price}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                      ordered
                        ? 'bg-emerald-500 text-black'
                        : 'bg-white text-black hover:bg-amber-300'
                    }`}
                    onClick={handleOrderClick}
                  >
                    {ordered ? (
                      <>
                        <Check size={14} />
                        <span>Agregado a la Mesa</span>
                      </>
                    ) : (
                      <span>Pedir a la Mesa</span>
                    )}
                  </button>

                  {onOpenReservation && (
                    <button
                      type="button"
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-transparent border border-white/20 text-stone-300 hover:text-white hover:border-white/40 text-xs font-bold tracking-wider uppercase transition-all text-center"
                      onClick={onOpenReservation}
                    >
                      Reservar Mesa
                    </button>
                  )}
                </div>

                {/* 4 Puntos decorativos en la base */}
                <div className="pt-3 sm:pt-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb703]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
