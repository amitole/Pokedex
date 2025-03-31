import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  styled,
  Chip,
  CircularProgress
} from '@mui/material';
import { Close, ArrowForward } from '@mui/icons-material';
import { PokemonDetailProps } from '../types';
import TypeChip from './ui/TypeChip';
import { capitalize, formatPokemonId, formatName } from '../utils/formatters';
import { usePokemonStore } from '../store/pokemonStore';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 250,
  height: 250,
  margin: '0 auto',
  backgroundColor: 'transparent',
  '& img': {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  }
}));


const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, open, onClose }) => {
  const isLoading = usePokemonStore((state) => state.isLoading);
  
  if (!pokemon) return null;
  
  const evolutions = pokemon.evolutions || [];
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {capitalize(pokemon.name)} #{formatPokemonId(pokemon.id)}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '40%' } }}>
            <StyledAvatar 
              src={pokemon.imageUrl} 
              alt={pokemon.name}
              variant="rounded"
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {pokemon.types.map((type) => (
                <TypeChip
                  key={type}
                  type={type}
                  size="medium"
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h6" gutterBottom>
              Abilities
            </Typography>
            <List>
              {pokemon.abilities.map((ability) => (
                <ListItem key={ability} sx={{ py: 1 }}>
                  <ListItemText 
                    primary={capitalize(formatName(ability))}
                    sx={{ 
                      bgcolor: 'rgba(0, 0, 0, 0.04)', 
                      borderRadius: 2, 
                      px: 2, 
                      py: 1 
                    }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Evolution Chain
            </Typography>
            
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <CircularProgress size={30} />
              </Box>
            ) : evolutions.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                This Pokémon does not evolve.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {evolutions.map((evolution, index) => (
                  <React.Fragment key={evolution}>
                    <Chip
                      label={capitalize(evolution)}
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        py: 2
                      }}
                    />
                    {index < evolutions.length - 1 && (
                      <ArrowForward sx={{ mx: 1 }} color="action" />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetail; 