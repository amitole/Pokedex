import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import pokemonRoutes from './routes/pokemonRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/pokemon', pokemonRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.send('Pokemon API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
