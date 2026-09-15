import { Drink, MenuItem } from '../types';

export const INITIAL_DRINKS: Drink[] = [
  {
    id: 1,
    name: 'VICHE DEL PACÍFICO',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    description: 'Destilado ancestral de caña de las selvas del Chocó y Nariño, infusión de lulo silvestre, hojas frescas de poleo y escarcha de sal marina de Guapi.',
    category: 'Ancestral Pacífico',
    price: '$ 38.000 COP',
    alcohol: '24% Vol.'
  },
  {
    id: 2,
    name: 'NEGRONI DEL QUINDÍO',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85',
    description: 'Ginebra botánica colombiana, vermouth rosso macerado en granos Geisha de Pitalito (Huila) y bitter rojo artesanal con piel de naranja agria del Valle.',
    category: 'Eje Cafetero de Autor',
    price: '$ 42.000 COP',
    alcohol: '26% Vol.'
  },
  {
    id: 3,
    name: 'ANÍS & COROZO REAL',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=1200&q=85',
    description: 'Aguardiente artesanal de alambique con anís estrellado, reducción de corozo sinuano de Córdoba, miel de palma de cera y oro comestible.',
    category: 'Fusión Caribe & Andes',
    price: '$ 36.000 COP',
    alcohol: '28% Vol.'
  },
  {
    id: 4,
    name: 'RON CARTAGENA OBSIDIAN',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=85',
    description: 'Ron solera colombiano 18 años, carbón vegetal de coco de Barú, cordial de mora andina de páramo y bitter de cacao fino de aroma de Tumaco.',
    category: 'Reserva Caribeña',
    price: '$ 48.000 COP',
    alcohol: '23% Vol.'
  },
  {
    id: 5,
    name: 'NOCTURNE DE GULUPA',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1200&q=85',
    description: 'Ron gran reserva de Caldas, néctar fresco de gulupa de Boyacá, licor de flor de saúco cundinamarqués y perfume ahumado de arrayán.',
    category: 'Sabores de la Cordillera',
    price: '$ 44.000 COP',
    alcohol: '21% Vol.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 101,
    name: 'Ron Dictador Solera 20 Años',
    category: 'DESTILADOS COLOMBIANOS',
    price: '$ 56.000 COP',
    badge: 'GRAN RESERVA',
    region: 'Cartagena de Indias',
    pairing: 'Ideal con chocolate de Tumaco 70% o habano',
    bottleImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=85',
    description: 'Producido bajo el método de Solera en la costa Caribe colombiana. Textura aterciopelada con notas de miel de caña virgen, café recién tostado y roble.',
    notes: ['Miel virgen', 'Café Geisha tostado', 'Roble añejo', 'Caramelo oscuro']
  },
  {
    id: 102,
    name: 'Viche Curado & Lulo del Chocó',
    category: 'CÓCTELES DE AUTOR',
    price: '$ 38.000 COP',
    badge: 'ANCESTRAL PACÍFICO',
    region: 'Río San Juan, Chocó',
    pairing: 'Marida a la perfección con Ceviche de Bahía Solano',
    bottleImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85',
    description: 'Destilado ancestral de caña de las selvas del Pacífico, infusión aromática de hojas de poleo, chiyangua, zumo de lulo silvestre y escarcha de sal de Guapi.',
    notes: ['Caña silvestre', 'Poleo & chiyangua', 'Lulo criollo', 'Sal de Guapi']
  },
  {
    id: 103,
    name: 'Canelazo Real del Páramo',
    category: 'CÓCTELES DE AUTOR',
    price: '$ 34.000 COP',
    badge: 'TRADICIÓN ANDINA',
    region: 'Boyacá & Cundinamarca',
    pairing: 'Recomendado con postres tradicionales o quesos andinos',
    bottleImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=85',
    description: 'Aguardiente artesanal doble destilado infusionado con panela orgánica de Villeta, canela de Ceilán, anís estrellado y un toque cítrico de lulo andino.',
    notes: ['Panela de Villeta', 'Anís estrellado', 'Canela en rama', 'Cítricos andinos']
  },
  {
    id: 104,
    name: 'Gin Selva & Tónica Botánica',
    category: 'GIN & TONIC',
    price: '$ 42.000 COP',
    badge: 'BOTÁNICA AMAZÓNICA',
    region: 'Leticia, Amazonas',
    pairing: 'Excelente como aperitivo fresco antes de la cena',
    bottleImage: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=85',
    description: 'Ginebra artesanal colombiana co-destilada con bayas de arazá, camu camu silvestre, copoazú y pimienta de Putumayo con agua tónica premium.',
    notes: ['Arazá del Amazonas', 'Camu camu cítrico', 'Pimienta de Putumayo', 'Enebro puro']
  },
  {
    id: 105,
    name: 'Posta Negra Cartagenera',
    category: 'GASTRONOMÍA COLOMBIANA',
    price: '$ 58.000 COP',
    badge: 'PLATO INSIGNIA',
    region: 'Cartagena de Indias',
    pairing: 'Acompañar con Ron Dictador Solera o vino tinto estructurado',
    bottleImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    description: 'Medallón de res selecto braseado 12 horas en reducción de salsa negra de panela, puré cremoso de plátano pícaro al jengibre y chips crocantes de yuca caribeña.',
    notes: ['Solomillo braseado 12h', 'Salsa de panela negra', 'Plátano tentación', 'Crocante de yuca']
  },
  {
    id: 106,
    name: 'Ceviche del Pacífico & Chontaduro',
    category: 'GASTRONOMÍA COLOMBIANA',
    price: '$ 46.000 COP',
    badge: 'MAR & SELVA',
    region: 'Bahía Solano, Chocó',
    pairing: 'Ideal con Viche Curado o Gin Selva Amazónica',
    bottleImage: 'https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=800&q=85',
    description: 'Corvina salvaje curada en limón mandarino con emulsión tibia de chontaduro fresco, leche de coco de Guapi, cebolla morada crujiente y patacón crocante.',
    notes: ['Corvina de Bahía Solano', 'Chontaduro del Valle', 'Leche de coco fresco', 'Patacón frito']
  },
  {
    id: 107,
    name: 'Empanadas de Lechona Tolimense',
    category: 'GASTRONOMÍA COLOMBIANA',
    price: '$ 36.000 COP',
    badge: 'ENTRADA CRUJIENTE',
    region: 'Espinal, Tolima',
    pairing: 'Perfectas para compartir con cerveza artesanal o aguardiente',
    bottleImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85',
    description: 'Cuatro empanaditas de maíz pelado crocante rellenas de auténtica lechona tolimense asada al horno de leña, acompañadas con ají de maracuyá y suero costeño.',
    notes: ['Maíz crocante', 'Lechona al horno de leña', 'Ají dulce de maracuyá', 'Suero costeño']
  },
  {
    id: 108,
    name: 'Carajillo de Café Geisha & Ron Maestro',
    category: 'CÓCTELES DE AUTOR',
    price: '$ 40.000 COP',
    badge: 'EJE CAFETERO',
    region: 'Pitalito, Huila',
    pairing: 'Broche de oro para el cierre de la velada',
    bottleImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=85',
    description: 'Extracción en frío de café Geisha de altura del Huila batido con Ron Maestro 12 años, licor de vainilla silvestre de Nuquí y ralladura de nuez moscada.',
    notes: ['Café Geisha del Huila', 'Ron Maestro 12 años', 'Vainilla de Nuquí', 'Espuma sedosa']
  }
];

export const INTERIOR_PHOTOS = [
  {
    title: 'La Barra Principal de Mármol Negro',
    subtitle: 'Vista directa a la mixología con destilados colombianos de autor',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    title: 'Salón Íntimo de Terciopelo & Bronce',
    subtitle: 'Acústica cuidada y luz tenue para conversaciones sin prisa',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=85'
  },
  {
    title: 'Cava de Rones & Espirituosos',
    subtitle: 'Colección de rones de Caldas, Dictador y destilados ancestrales',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85'
  },
  {
    title: 'Terraza Nocturna Climatizada',
    subtitle: 'El punto de encuentro para extender la velada bajo las estrellas',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85'
  }
];
