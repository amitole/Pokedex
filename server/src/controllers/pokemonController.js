"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonById = exports.getAllPokemon = void 0;
const axios_1 = __importDefault(require("axios"));
const getAllPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const offset = parseInt(req.query.offset) || 0;
        const safeLimit = Math.min(limit, 50);
        const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon?limit=${safeLimit}&offset=${offset}`);
        const { results, count } = response.data;
        const pokemonDetails = yield Promise.all(results.map((pokemon) => __awaiter(void 0, void 0, void 0, function* () {
            const detailResponse = yield axios_1.default.get(pokemon.url);
            const { id, name, sprites, types, abilities } = detailResponse.data;
            return {
                id,
                name,
                imageUrl: sprites.other["official-artwork"].front_default ||
                    sprites.front_default,
                types: types.map((type) => type.type.name),
                abilities: abilities.map((ability) => ability.ability.name),
            };
        })));
        res.status(200).json({
            results: pokemonDetails,
            total: count || 150,
            offset,
            limit: safeLimit,
            hasMore: offset + pokemonDetails.length < (count || 150),
        });
    }
    catch (error) {
        console.error(`Error fetching Pokemon: ${error.message}`);
        res.status(500).json({ message: "Failed to fetch Pokemon data" });
    }
});
exports.getAllPokemon = getAllPokemon;
const getPokemonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = response.data;
        let evolutions = [];
        try {
            const speciesResponse = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const evolutionResponse = yield axios_1.default.get(speciesResponse.data.evolution_chain.url);
            evolutions = extractEvolutionChain(evolutionResponse.data.chain);
        }
        catch (evolutionError) {
            console.error(`Error fetching evolution data for pokemon ${id}: ${evolutionError.message}`);
            if (evolutionError.response) {
                console.error(`Response status: ${evolutionError.response.status}`);
            }
        }
        const pokemonDetail = {
            id: pokemon.id,
            name: pokemon.name,
            imageUrl: pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default,
            types: pokemon.types.map((type) => type.type.name),
            abilities: pokemon.abilities.map((ability) => ability.ability.name),
            evolutions: evolutions,
        };
        res.status(200).json(pokemonDetail);
    }
    catch (error) {
        console.error(`Error fetching Pokemon detail: ${error.message}`);
        res.status(500).json({ message: "Failed to fetch Pokemon detail" });
    }
});
exports.getPokemonById = getPokemonById;
function extractEvolutionChain(chain) {
    if (!chain || !chain.species) {
        return [];
    }
    const evolutions = [chain.species.name];
    if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution) => {
            evolutions.push(...extractEvolutionChain(evolution));
        });
    }
    return evolutions;
}
