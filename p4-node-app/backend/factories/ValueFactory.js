import mongoose from 'mongoose';
import Value from '../models/Value.js';

class ValueFactory {
  create(
    volume, cement, gravel, sand, chb, area,
    mortarCement, plasterCement, mortarSand, plasterSand) {
    const ValueModel = mongoose.model('Value');

    return new ValueModel({
      volume, cement, gravel, sand, chb, area,
      mortarCement, plasterCement, mortarSand, plasterSand
    });
  }
}

export default ValueFactory;