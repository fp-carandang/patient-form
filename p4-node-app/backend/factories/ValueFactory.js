import Value from '../models/Value.js';

class ValueFactory {
  create(
    selectedStrucType, selectedShape, length, width, height, base, depth, radius,
    selectedMixClass, selectedMMixClass, selectedPlasteredFaces, volume, cement, 
    gravel, sand, chb, area, mortarCement, plasterCement, mortarSand, plasterSand) {
    return new Value(
      selectedStrucType, selectedShape, length, width, height, base, depth, radius,
      selectedMixClass, selectedMMixClass, selectedPlasteredFaces, volume, cement, 
      gravel, sand, chb, area, mortarCement, plasterCement, mortarSand, plasterSand);
  }
}

export default ValueFactory;