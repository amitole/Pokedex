"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemonController_1 = require("../controllers/pokemonController");
const router = express_1.default.Router();
router.get('/', pokemonController_1.getAllPokemon);
router.get('/:id', pokemonController_1.getPokemonById);
exports.default = router;
