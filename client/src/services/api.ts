import axios from 'axios';
import { Pokemon, PaginatedResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DEFAULT_PAGE_SIZE = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE || '20');
const MAX_PAGE_SIZE = parseInt(process.env.REACT_APP_MAX_PAGE_SIZE || '50');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPokemonList = async (limit = DEFAULT_PAGE_SIZE, offset = 0): Promise<PaginatedResponse<Pokemon>> => {
  const safeLimit = Math.min(limit, MAX_PAGE_SIZE);
  const response = await api.get(`/pokemon?limit=${safeLimit}&offset=${offset}`);
  return response.data;
};

export const getPokemonDetail = async (id: number): Promise<Pokemon> => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    
    if (!response.data.evolutions) {
      console.warn(`API response for Pokemon #${id} doesn't include evolutions array`);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<Pokemon[]> => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addToFavorites = async (pokemonId: number): Promise<void> => {
  await api.post('/favorites', { pokemonId });
};

export const removeFromFavorites = async (pokemonId: number): Promise<void> => {
  await api.delete(`/favorites/${pokemonId}`);
}; 