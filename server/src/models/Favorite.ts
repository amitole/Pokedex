import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  pokemonId: number;
  createdAt: Date;
}

const FavoriteSchema: Schema = new Schema({
  pokemonId: { type: Number, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema); 