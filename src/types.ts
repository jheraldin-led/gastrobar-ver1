export interface Drink {
  id: number;
  name: string;
  image: string;
  description: string;
  category?: string;
  price?: string;
  alcohol?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  badge: string;
  region?: string;
  pairing?: string;
  arcText?: string;
  tagline?: string;
  headlineWord1?: string;
  headlineWord2?: string;
  scriptWelcome?: string;
  subTitle?: string;
  subLead?: string;
  smallPrint?: string;
  glassImage?: string;
  bottleImage: string;
  description: string;
  notes: string[];
}

export interface ReservationData {
  id?: string;
  code?: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  venue?: string;
  venueId?: string;
  venueName?: string;
  cityName?: string;
  date: string;
  time: string;
  guests: number;
  zone: string;
  experience: string;
  specialRequests?: string;
  specialRequest?: string;
  createdAt?: string;
}

export interface UserAccount {
  name: string;
  email: string;
  city?: string;
  token?: string;
}
