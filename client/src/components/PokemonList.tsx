import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchInput from './ui/SearchInput';
import PokemonCard from './PokemonCard';
import PokemonDetail from './PokemonDetail';
import LoadingIndicator from './ui/LoadingIndicator';
import { usePokemonData } from '../hooks/usePokemonData';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

/**
 * Component for displaying a list of Pokémon with search and filtering capabilities
 */
const PokemonList: React.FC = () => {
  const {
    filteredPokemon,
    isLoading,
    error,
    hasMore,
    searchTerm,
    selectedPokemon,
    isDetailOpen,
    handleSearchChange,
    handleClearSearch,
    loadMorePokemon,
    handlePokemonClick,
    handleCloseDetail,
    handleFavoriteToggle,
    isFavorite,
    showOnlyFavorites,
    initializeData,
    pokemonList
  } = usePokemonData();
  
  // Initialize data on component mount
  useEffect(() => {
    initializeData();
  }, [initializeData]);
  
  // Setup infinite scrolling
  const lastPokemonRef = useInfiniteScroll({
    loading: isLoading,
    hasMore,
    onLoadMore: loadMorePokemon,
    disabled: showOnlyFavorites
  });
  
  // Initial loading state
  if (isLoading && pokemonList.length === 0) {
    return <LoadingIndicator fullHeight size={60} />;
  }
  
  // Error state
  if (error && pokemonList.length === 0) {
    return (
      <Typography color="error" align="center" variant="h6" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        label="Search Pokémon"
        placeholder="Search by name, ID or type..."
      />
      
      {filteredPokemon.length === 0 ? (
        <Typography align="center" variant="h6" sx={{ my: 4, color: 'text.secondary' }}>
          No Pokémon found matching your search
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {filteredPokemon.map((pokemon, index) => (
            <Box 
              key={pokemon.id} 
              ref={index === filteredPokemon.length - 1 ? lastPokemonRef : undefined}
              sx={{ 
                width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
                p: 1.5,
              }}
            >
              <PokemonCard
                pokemon={pokemon}
                isFavorite={isFavorite(pokemon.id)}
                onCardClick={() => handlePokemonClick(pokemon)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Box>
          ))}
        </Box>
      )}
      
      {isLoading && pokemonList.length > 0 && <LoadingIndicator />}
      
      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          open={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </Container>
  );
};

export default PokemonList; 