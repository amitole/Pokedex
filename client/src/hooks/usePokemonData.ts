import { useState, useCallback } from 'react';
import { usePokemonStore } from '../store/pokemonStore';
import { Pokemon } from '../types';


export const usePokemonData = () => {
  const {
    pokemonList,
    favorites,
    isLoading,
    error,
    hasMore,
    showOnlyFavorites,
    fetchPokemonList,
    loadMorePokemon,
    fetchFavorites,
    fetchPokemonDetail,
    addToFavorites,
    removeFromFavorites,
    toggleShowOnlyFavorites
  } = usePokemonStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const isFavorite = useCallback((id: number) => {
    return favorites.some(pokemon => pokemon.id === id);
  }, [favorites]);

  const handlePokemonClick = useCallback(async (pokemon: Pokemon) => {
    setIsDetailOpen(true);
    
    try {
      const detailedPokemon = await fetchPokemonDetail(pokemon.id);
      
      if (detailedPokemon) {
        setSelectedPokemon(detailedPokemon);
      } else {
        const storeDetailedPokemon = usePokemonStore.getState().selectedPokemon;
        setSelectedPokemon(storeDetailedPokemon || pokemon);
      }
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      setSelectedPokemon(pokemon);
    }
  }, [fetchPokemonDetail]);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedPokemon(null);
  }, []);

  const handleFavoriteToggle = useCallback((pokemon: Pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon.id);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const filteredPokemon = pokemonList
    .filter(pokemon => {
      if (showOnlyFavorites) {
        return isFavorite(pokemon.id);
      }
      return true;
    })
    .filter(pokemon => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        pokemon.name.toLowerCase().includes(searchLower) ||
        pokemon.id.toString().includes(searchLower) ||
        pokemon.types.some(type => type.toLowerCase().includes(searchLower))
      );
    });

  const initializeData = useCallback(() => {
    fetchPokemonList();
    fetchFavorites();
  }, [fetchPokemonList, fetchFavorites]);

  return {
    pokemonList,
    filteredPokemon,
    favorites,
    isLoading,
    error,
    hasMore,
    showOnlyFavorites,
    searchTerm,
    selectedPokemon,
    isDetailOpen,
    loadMorePokemon,
    handlePokemonClick,
    handleCloseDetail,
    handleFavoriteToggle,
    isFavorite,
    setSearchTerm,
    handleSearchChange,
    handleClearSearch,
    toggleShowOnlyFavorites,
    initializeData
  };
}; 