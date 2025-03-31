import { Request, Response } from "express";
import axios from "axios";

export const getAllPokemon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const safeLimit = Math.min(limit, 50);

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${safeLimit}&offset=${offset}`
    );
    const { results, count } = response.data;

    const pokemonDetails = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }) => {
        const detailResponse = await axios.get(pokemon.url);
        const { id, name, sprites, types, abilities } = detailResponse.data;

        return {
          id,
          name,
          imageUrl:
            sprites.other["official-artwork"].front_default ||
            sprites.front_default,
          types: types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          abilities: abilities.map(
            (ability: { ability: { name: string } }) => ability.ability.name
          ),
        };
      })
    );

    res.status(200).json({
      results: pokemonDetails,
      total: count || 150,
      offset,
      limit: safeLimit,
      hasMore: offset + pokemonDetails.length < (count || 150),
    });
  } catch (error: any) {
    console.error(`Error fetching Pokemon: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch Pokemon data" });
  }
};

export const getPokemonById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = response.data;

    let evolutions: string[] = [];

    try {
      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );

      const evolutionResponse = await axios.get(
        speciesResponse.data.evolution_chain.url
      );

      evolutions = extractEvolutionChain(evolutionResponse.data.chain);
    } catch (evolutionError: any) {
      console.error(
        `Error fetching evolution data for pokemon ${id}: ${evolutionError.message}`
      );
      if (evolutionError.response) {
        console.error(`Response status: ${evolutionError.response.status}`);
      }
    }

    const pokemonDetail = {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
      types: pokemon.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      abilities: pokemon.abilities.map(
        (ability: { ability: { name: string } }) => ability.ability.name
      ),
      evolutions: evolutions,
    };

    res.status(200).json(pokemonDetail);
  } catch (error: any) {
    console.error(`Error fetching Pokemon detail: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch Pokemon detail" });
  }
};

function extractEvolutionChain(chain: any): string[] {
  if (!chain || !chain.species) {
    return [];
  }

  const evolutions: string[] = [chain.species.name];

  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evolution: any) => {
      evolutions.push(...extractEvolutionChain(evolution));
    });
  }

  return evolutions;
}
