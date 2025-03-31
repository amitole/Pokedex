import React from 'react';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel, Box, Container } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { usePokemonData } from '../hooks/usePokemonData';


const Header: React.FC = () => {
  const { showOnlyFavorites, toggleShowOnlyFavorites } = usePokemonData();
  
  return (
    <AppBar position="sticky" color="primary" elevation={4} sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                mr: 2
              }}
            >
              FireFly - Pokédex
            </Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyFavorites}
                onChange={toggleShowOnlyFavorites}
                color="secondary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Favorite sx={{ mr: 0.5, color: showOnlyFavorites ? 'error.main' : 'inherit' }} />
                <Typography variant="body2" component="span">
                  Show Favorites
                </Typography>
              </Box>
            }
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 