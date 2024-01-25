class Value {
  constructor (
    selectedStrucType, selectedShape, length, width, height, base, depth, radius,
    selectedMixClass, selectedMMixClass, selectedPlasteredFaces, volume, cement, 
    gravel, sand, chb, area, mortarCement, plasterCement, mortarSand, plasterSand) {
      this.selectedStrucType = selectedStrucType;
      this.selectedShape = selectedShape;
      this.length = length;
      this.width = width;
      this.height = height;
      this.base = base;
      this.depth = depth;
      this.radius = radius;
      this.selectedMixClass = selectedMixClass;
      this.selectedMMixClass = selectedMMixClass;
      this.selectedPlasteredFaces = selectedPlasteredFaces;
      this.volume = volume;
      this.cement = cement; 
      this.gravel = gravel;
      this.sand = sand;
      this.chb = chb;
      this.area = area;
      this.mortarCement = mortarCement;
      this.plasterCement = plasterCement;
      this.mortarSand = mortarSand;
      this.plasterSand = plasterSand;
    }
}

export default Value;