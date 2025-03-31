import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, styled } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Pokemon } from '../types';
import TypeChip from './ui/TypeChip';
import { capitalize, formatPokemonId } from '../utils/formatters';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onCardClick: () => void;
  onFavoriteToggle: (pokemon: Pokemon) => void;
  className?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
  position: 'relative',
  overflow: 'visible',
}));

const PokemonImage = styled(CardMedia)({
  height: 150,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  margin: '16px 16px 0',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});


const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onCardClick,
  onFavoriteToggle,
  className,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(pokemon);
  };

  return (
    <StyledCard onClick={onCardClick} className={className}>
      <Box position="absolute" top={8} right={8} zIndex={2}>
        <IconButton
          onClick={handleFavoriteClick}
          color="primary"
          sx={{ background: 'rgba(255, 255, 255, 0.7)', '&:hover': { background: 'rgba(255, 255, 255, 0.9)' } }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      
      <PokemonImage
        image={pokemon.imageUrl}
        title={pokemon.name}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ fontWeight: 'bold' }}>
          {capitalize(pokemon.name)}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          #{formatPokemonId(pokemon.id)}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
          {pokemon.types.map((type) => (
            <TypeChip key={type} type={type} />
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default PokemonCard; 