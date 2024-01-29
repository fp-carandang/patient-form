import mongoose from 'mongoose';

const valueSchema = new mongoose.Schema({
  volume: Number,
  cement: Number,
  gravel: Number,
  sand: Number,
  chb: Number,
  area: Number,
  mortarCement: Number,
  plasterCement: Number,
  mortarSand: Number,
  plasterSand: Number,
});

const Value = mongoose.model('Value', valueSchema);

export default Value;
