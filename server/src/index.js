"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const pokemonRoutes_1 = __importDefault(require("./routes/pokemonRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/pokemon', pokemonRoutes_1.default);
app.use('/api/favorites', favoriteRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Pokemon API is running...');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
