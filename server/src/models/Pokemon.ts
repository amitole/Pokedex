import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemon extends Document {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  abilities: string[];
  evolutions?: string[];
  createdAt: Date;
}

const PokemonSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  types: [{ type: String, required: true }],
  abilities: [{ type: String, required: true }],
  evolutions: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema); 