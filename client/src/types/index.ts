export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  abilities: string[];
  evolutions: string[];
}

export interface PokemonDetailProps {
  pokemon: Pokemon | null;
  open: boolean;
  onClose: () => void;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
} 