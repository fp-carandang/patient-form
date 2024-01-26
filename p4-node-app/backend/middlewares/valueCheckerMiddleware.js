import ValueRepository from "../repositories/ValueRepository.js";

function valueCheckerMiddleware(valueRepository) {
  return async function (req, res, next) {
    const {
      selectedStrucType, selectedShape, length, width, height, base, depth, radius,
      selectedMixClass, selectedMMixClass, selectedPlasteredFaces, volume, cement,
      gravel, sand, chb, area, mortarCement, plasterCement, mortarSand, plasterSand
    } = req.body;

    const { user } = req.session;
    const { projectName } = req.params;

    const project = user ? user.projects.find(p => p.projectName === projectName) : undefined;

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    let existingValue = project.values.find(value => (
      value.selectedStrucType === selectedStrucType ||
      value.selectedShape === selectedShape ||
      value.length === length ||
      value.width === width ||
      value.height === height ||
      value.base === base ||
      value.depth === depth ||
      value.radius === radius ||
      value.selectedMixClass === selectedMixClass ||
      value.selectedMMixClass === selectedMMixClass ||
      value.selectedPlasteredFaces === selectedPlasteredFaces ||
      value.volume === volume ||
      value.cement === cement ||
      value.gravel === gravel ||
      value.sand === sand ||
      value.chb === chb ||
      value.area === area ||
      value.mortarCement === mortarCement ||
      value.plasterCement === plasterCement ||
      value.mortarSand === mortarSand ||
      value.plasterSand === plasterSand
    ));

    if (existingValue) {
      existingValue.selectedStrucType = selectedStrucType;
      existingValue.selectedShape = selectedShape;
      existingValue.length = length;
      existingValue.width = width;
      existingValue.height = height;
      existingValue.base = base;
      existingValue.depth = depth;
      existingValue.radius = radius;
      existingValue.selectedMixClass = selectedMixClass;
      existingValue.selectedMMixClass = selectedMMixClass;
      existingValue.selectedPlasteredFaces = selectedPlasteredFaces;
      existingValue.volume = volume;
      existingValue.cement = cement;
      existingValue.gravel = gravel;
      existingValue.sand = sand;
      existingValue.chb = chb;
      existingValue.area = area;
      existingValue.mortarCement = mortarCement;
      existingValue.plasterCement = plasterCement;
      existingValue.mortarSand = mortarSand;
      existingValue.plasterSand = plasterSand;
    } else {
      const value = {
        selectedStrucType, selectedShape, length, width, height, base, depth, radius,
        selectedMixClass, selectedMMixClass, selectedPlasteredFaces, volume, cement,
        gravel, sand, chb, area, mortarCement, plasterCement, mortarSand, plasterSand
      };
      project.values.push(value);
    }

    next();
  }
}

export default valueCheckerMiddleware;
