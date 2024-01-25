import { useEffect, useState } from 'react';
import { useSelectionContext } from './SelectionContext';

function EstimateCalculator() {
  const {
    length,
    width,
    height,
    base,
    depth,
    radius,
    selectedShape,
    selectedMixClass,
    selectedMMixClass,
    selectedPlasteredFaces,
    selectedStrucType,
  } = useSelectionContext();

  const [result, setResult] = useState({
    volume: 0,
    cement: 0,
    gravel: 0,
    sand: 0,
    chb: 0,
    area: 0,
    mortarCement: 0,
    plasterCement: 0,
    mortarSand: 0,
    plasterSand: 0,
  });

  useEffect(() => {
    const calculateResult = () => {
      let volume = 0,
        cement = 0,
        gravel = 0,
        sand = 0,
        chb = 0,
        area = 0,
        mortarCement = 0,
        plasterCement = 0,
        mortarSand = 0,
        plasterSand = 0;

      switch (selectedStrucType) {
        case 'concreteSlab':
          switch (selectedShape) {
            case 'Rectangular':
              volume = length * width * height;
              break;
            case 'Triangular':
              volume = 0.5 * base * height * depth;
              break;
            case 'Circular':
              volume = 3.14 * radius * radius * depth;
              break;
            default:
              break;
          }

          switch (selectedMixClass) {
            case 'Class A':
              cement = volume * 9.5;
              sand = volume * 0.5;
              gravel = volume * 1.0;
              break;
            case 'Class B':
              cement = volume * 7.0;
              sand = volume * 0.5;
              gravel = volume * 1.0;
              break;
            case 'Class C':
              cement = volume * 6.0;
              sand = volume * 0.5;
              gravel = volume * 1.0;
              break;
            case 'Class D':
              cement = volume * 5.0;
              sand = volume * 0.5;
              gravel = volume * 1.0;
              break;
            default:
              break;
          }
          break;
        case 'chbWall':
          switch (selectedShape) {
            case 'Rectangular':
              area = length * width;
              break;
            case 'Triangular':
              area = 0.5 * base * height;
              break;
            case 'Circular':
              area = 3.14 * radius * radius;
              break;
            default:
              break;
          }
          switch (selectedMMixClass) {
            case 'MClass B':
              mortarCement = area * 0.416;
              mortarSand = area * 0.04375;
              plasterCement = area * 0.232 * selectedPlasteredFaces;
              plasterSand = area * 0.016 * selectedPlasteredFaces;
              chb = area * 12.5;
              cement = mortarCement + plasterCement;
              sand = mortarSand + plasterSand;
              break;
            case 'MClass C':
              mortarCement = area * 0.306;
              mortarSand = area * 0.04375;
              plasterCement = area * 0.152 * selectedPlasteredFaces;
              plasterSand = area * 0.016 * selectedPlasteredFaces;
              chb = area * 12.5;
              cement = mortarCement + plasterCement;
              sand = mortarSand + plasterSand;
              break;
            case 'MClass D':
              mortarCement = area * 0.263;
              mortarSand = area * 0.04375;
              plasterCement = area * 0.112 * selectedPlasteredFaces;
              plasterSand = area * 0.016 * selectedPlasteredFaces;
              chb = area * 12.5;
              cement = mortarCement + plasterCement;
              sand = mortarSand + plasterSand;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }

      setResult({
        volume,
        cement,
        gravel,
        sand,
        chb,
        area,
        mortarCement,
        plasterCement,
        mortarSand,
        plasterSand,
      });
    };

    calculateResult();
  }, [
    length,
    width,
    height,
    base,
    depth,
    radius,
    selectedShape,
    selectedMixClass,
    selectedMMixClass,
    selectedPlasteredFaces,
    selectedStrucType,
  ]);

  return result;
}

export default EstimateCalculator;