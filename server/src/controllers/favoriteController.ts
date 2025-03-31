import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import axios from 'axios';

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    
    const favoriteDetails = await Promise.all(
      favorites.map(async (favorite) => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${favorite.pokemonId}`);
          const { id, name, sprites, types, abilities } = response.data;
          
          return {
            id,
            name,
            imageUrl: sprites.other['official-artwork'].front_default || sprites.front_default,
            types: types.map((type: { type: { name: string } }) => type.type.name),
            abilities: abilities.map((ability: { ability: { name: string } }) => ability.ability.name)
          };
        } catch (error) {
          console.error(`Error fetching Pokemon ${favorite.pokemonId}:`, error);
          return null;
        }
      })
    );
    
    const validFavorites = favoriteDetails.filter(pokemon => pokemon !== null);
    
    res.status(200).json(validFavorites);
  } catch (error: any) {
    console.error(`Error fetching favorites: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pokemonId } = req.body;
    
    if (!pokemonId) {
      res.status(400).json({ message: 'Pokemon ID is required' });
      return;
    }
    
    const existingFavorite = await Favorite.findOne({ pokemonId });
    if (existingFavorite) {
      res.status(400).json({ message: 'Pokemon is already in favorites' });
      return;
    }
    
    const newFavorite = new Favorite({
      pokemonId: Number(pokemonId)
    });
    
    await newFavorite.save();
    res.status(201).json({ message: 'Pokemon added to favorites', favorite: newFavorite });
  } catch (error: any) {
    console.error(`Error adding favorite: ${error.message}`);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const result = await Favorite.findOneAndDelete({ pokemonId: Number(id) });
    
    if (!result) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }
    
    res.status(200).json({ message: 'Pokemon removed from favorites' });
  } catch (error: any) {
    console.error(`Error removing favorite: ${error.message}`);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
}; 