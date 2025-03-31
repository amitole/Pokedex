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
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
const Favorite_1 = __importDefault(require("../models/Favorite"));
const axios_1 = __importDefault(require("axios"));
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield Favorite_1.default.find().sort({ createdAt: -1 });
        const favoriteDetails = yield Promise.all(favorites.map((favorite) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${favorite.pokemonId}`);
                const { id, name, sprites, types, abilities } = response.data;
                return {
                    id,
                    name,
                    imageUrl: sprites.other['official-artwork'].front_default || sprites.front_default,
                    types: types.map((type) => type.type.name),
                    abilities: abilities.map((ability) => ability.ability.name)
                };
            }
            catch (error) {
                console.error(`Error fetching Pokemon ${favorite.pokemonId}:`, error);
                return null;
            }
        })));
        const validFavorites = favoriteDetails.filter(pokemon => pokemon !== null);
        res.status(200).json(validFavorites);
    }
    catch (error) {
        console.error(`Error fetching favorites: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});
exports.getFavorites = getFavorites;
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pokemonId } = req.body;
        if (!pokemonId) {
            res.status(400).json({ message: 'Pokemon ID is required' });
            return;
        }
        const existingFavorite = yield Favorite_1.default.findOne({ pokemonId });
        if (existingFavorite) {
            res.status(400).json({ message: 'Pokemon is already in favorites' });
            return;
        }
        const newFavorite = new Favorite_1.default({
            pokemonId: Number(pokemonId)
        });
        yield newFavorite.save();
        res.status(201).json({ message: 'Pokemon added to favorites', favorite: newFavorite });
    }
    catch (error) {
        console.error(`Error adding favorite: ${error.message}`);
        res.status(500).json({ message: 'Failed to add favorite' });
    }
});
exports.addFavorite = addFavorite;
const removeFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Favorite_1.default.findOneAndDelete({ pokemonId: Number(id) });
        if (!result) {
            res.status(404).json({ message: 'Favorite not found' });
            return;
        }
        res.status(200).json({ message: 'Pokemon removed from favorites' });
    }
    catch (error) {
        console.error(`Error removing favorite: ${error.message}`);
        res.status(500).json({ message: 'Failed to remove favorite' });
    }
});
exports.removeFavorite = removeFavorite;
