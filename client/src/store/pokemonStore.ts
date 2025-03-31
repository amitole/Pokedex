import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Pokemon } from "../types";
import * as api from "../services/api";

interface PokemonState {
  pokemonList: Pokemon[];
  favorites: Pokemon[];
  isLoading: boolean;
  error: string | null;
  selectedPokemon: Pokemon | null;
  showOnlyFavorites: boolean;
  hasMore: boolean;
  offset: number;

  // Actions
  fetchPokemonList: () => Promise<void>;
  loadMorePokemon: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  fetchPokemonDetail: (id: number) => Promise<Pokemon | void>;
  addToFavorites: (pokemonId: number) => Promise<void>;
  removeFromFavorites: (pokemonId: number) => Promise<void>;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  toggleShowOnlyFavorites: () => void;
}

const PAGE_SIZE = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE || "20");
// Maximum number of Pokémon - from environment variable or default
const MAX_POKEMON_COUNT = parseInt(
  process.env.REACT_APP_MAX_POKEMON_COUNT || "150"
);

export const usePokemonStore = create<PokemonState>()(
  immer((set, get) => ({
    pokemonList: [],
    favorites: [],
    isLoading: false,
    error: null,
    selectedPokemon: null,
    showOnlyFavorites: false,
    hasMore: true,
    offset: 0,

    fetchPokemonList: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
        state.offset = 0;
        state.pokemonList = [];
        state.hasMore = true;
      });

      try {
        const response = await api.getPokemonList(PAGE_SIZE, 0);
        set((state) => {
          state.pokemonList = response.results;
          state.hasMore = response.hasMore;
          state.offset = PAGE_SIZE;
          state.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.error = error.message || "Failed to fetch Pokemon";
          state.isLoading = false;
        });
      }
    },

    loadMorePokemon: async () => {
      const { isLoading, hasMore, offset } = get();
      if (isLoading || !hasMore) return;

      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await api.getPokemonList(PAGE_SIZE, offset);
        set((state) => {
          state.pokemonList = [...state.pokemonList, ...response.results];

          state.hasMore =
            response.hasMore &&
            state.offset + response.results.length < MAX_POKEMON_COUNT;

          state.offset = state.offset + response.results.length;
          state.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.error = error.message || "Failed to load more Pokemon";
          state.isLoading = false;
        });
      }
    },

    fetchFavorites: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const favorites = await api.getFavorites();
        set((state) => {
          state.favorites = favorites;
          state.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.error = error.message || "Failed to fetch favorites";
          state.isLoading = false;
        });
      }
    },

    fetchPokemonDetail: async (id: number) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const pokemon = await api.getPokemonDetail(id);

        const normalizedPokemon = {
          ...pokemon,
          evolutions: pokemon.evolutions || [],
        };

        set((state) => {
          state.selectedPokemon = normalizedPokemon;
          state.isLoading = false;
        });

        return normalizedPokemon;
      } catch (error: any) {
        console.error(`Error fetching Pokemon details:`, error);
        set((state) => {
          state.error = error.message || "Failed to fetch Pokemon details";
          state.isLoading = false;
        });
        throw error;
      }
    },

    addToFavorites: async (pokemonId: number) => {
      try {
        await api.addToFavorites(pokemonId);
        await usePokemonStore.getState().fetchFavorites();
      } catch (error: any) {
        set((state) => {
          state.error = error.message || "Failed to add to favorites";
        });
      }
    },

    removeFromFavorites: async (pokemonId: number) => {
      try {
        await api.removeFromFavorites(pokemonId);
        await usePokemonStore.getState().fetchFavorites();
      } catch (error: any) {
        set((state) => {
          state.error = error.message || "Failed to remove from favorites";
        });
      }
    },

    setSelectedPokemon: (pokemon) => {
      set((state) => {
        state.selectedPokemon = pokemon;
      });
    },

    toggleShowOnlyFavorites: () => {
      set((state) => {
        state.showOnlyFavorites = !state.showOnlyFavorites;
      });
    },
  }))
);
