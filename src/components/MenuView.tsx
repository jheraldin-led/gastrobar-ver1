import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/gastrobarData';
import { MenuItem } from '../types';
import { ProductDetailModal } from './ProductDetailModal';

interface MenuViewProps {
  onGoToReservation: () => void;
}

const CATEGORIES = [
  'TODOS',
  'DESTILADOS COLOMBIANOS',
  'CÓCTELES DE AUTOR',
  'GIN & TONIC',
  'GASTRONOMÍA COLOMBIANA'
];

export const MenuView: React.FC<MenuViewProps> = ({ onGoToReservation }) => {
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const filteredItems =
    selectedCategory === 'TODOS'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="menu-luxury-section">
      <div className="menu-header-center">
        <span className="menu-pre-tag">SAN GIL • SANTANDER</span>
        <h2 className="menu-title-lux">CARTA & DESTILADOS</h2>
        <p className="menu-lead-text">
          Selección de licores colombianos, viche artesanal, rones de solera y cocina de autor. Haz clic en cualquiera para abrir su ficha completa.
        </p>

        <div className="category-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tri-grid-container">
        {filteredItems.map((item) => {
          const nameWords = item.name.split(' ');
          const firstWord = nameWords.slice(0, 2).join(' ');
          const secondWord = nameWords.slice(2).join(' ');

          return (
            <div
              key={item.id}
              className="whisky-flyer-card"
              onClick={() => setActiveItem(item)}
            >
              {/* Header Superior del Flyer */}
              <div className="flyer-top-header">
                <div className="flyer-logo-badge">
                  <div className="grid grid-cols-2 gap-0.5 w-3 h-3 text-white">
                    <span className="w-1 h-1 bg-white rounded-[0.5px]"></span>
                    <span className="w-1 h-1 bg-white rounded-[0.5px]"></span>
                    <span className="w-1 h-1 bg-white rounded-[0.5px]"></span>
                    <span className="w-1 h-1 bg-white rounded-[0.5px]"></span>
                  </div>
                  <span className="flyer-logo-text">GASTROBAR SAN GIL</span>
                </div>
                <div className="flyer-price-chip">{item.price}</div>
              </div>

              {/* Cuerpo Dividido (48% Left / 52% Right) */}
              <div className="flyer-split-body">
                {/* Columna Izquierda: Gráficos de Autor, Tipografía y Detalles */}
                <div className="flyer-col-left">
                  <div className="flyer-arc-wrapper">
                    <svg viewBox="0 0 200 45" className="flyer-arc-svg">
                      <path
                        id={`arc-${item.id}`}
                        d="M 15 40 Q 100 0 185 40"
                        fill="transparent"
                      />
                      <text className="flyer-arc-text">
                        <textPath
                          href={`#arc-${item.id}`}
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          GASTROBAR PRIVÉ
                        </textPath>
                      </text>
                    </svg>
                    <span className="flyer-present-tag">PRESENT</span>
                  </div>

                  <div className="flyer-headline-stack">
                    <span className="flyer-headline-word">{firstWord}</span>
                    {secondWord && (
                      <span className="flyer-headline-word text-[22px]">
                        {secondWord}
                      </span>
                    )}
                  </div>

                  <div className="flyer-script-welcome">Welcome</div>

                  <div className="flyer-sub-banner">
                    <span className="flyer-sub-title">{item.category}</span>
                    {item.badge && (
                      <span className="flyer-sub-lead">{item.badge}</span>
                    )}
                  </div>

                  <p className="flyer-small-print">{item.description}</p>

                  <div className="flyer-glass-container">
                    <img
                      src={item.bottleImage}
                      alt={item.name}
                      className="flyer-glass-img"
                      loading="lazy"
                    />
                    <div className="flyer-glass-vignette"></div>
                  </div>

                  <div className="flyer-bottom-address">
                    CRA. 9 # 11-45, SAN GIL - SANTANDER
                  </div>
                </div>

                {/* Columna Derecha: Imagen Hero y Botón de Acción */}
                <div className="flyer-col-right">
                  <img
                    src={item.bottleImage}
                    alt={item.name}
                    className="flyer-bottle-hero-img"
                    loading="lazy"
                  />
                  <div className="flyer-bottle-halo"></div>
                  <div className="flyer-bottle-inner-shadow"></div>

                  <div className="flyer-action-hint">
                    <span>VER DETALLES</span>
                    <ArrowRight size={12} className="flyer-hint-arrow" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Ficha Completa */}
      <ProductDetailModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onOpenReservation={() => {
          setActiveItem(null);
          onGoToReservation();
        }}
      />
    </div>
  );
};
