export interface Country {
  id: number;
  name: string;
  capital: string;
  population: number;
  area: number;
  flag: string;
  language: string;
  region?: string;
  subregion?: string;
  continent?: string;
  currency?: string;
  timezone?: string;
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  borders?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  landmarks?: Landmark[];
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'historical' | 'natural' | 'modern' | 'cultural';
  city: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SearchParams {
  search?: string;
  population_min?: number;
  population_max?: number;
  area_min?: number;
  area_max?: number;
  language?: string;
  region?: string;
  page?: number;
  sort_by?: 'name' | 'population' | 'area';
  sort_order?: 'asc' | 'desc';
}

export interface Statistics {
  totalCountries: number;
  totalPopulation: number;
  totalArea: number;
  averagePopulation: number;
  averageArea: number;
  mostPopulated: Country;
  largestArea: Country;
  smallestArea: Country;
  languagesCount: Record<string, number>;
  regionsCount: Record<string, number>;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  qty: number; // For cart management
}
export type Language = 'uz' | 'en' | 'ru';