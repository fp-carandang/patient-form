import { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

function useSelectionContext() {
  return useContext(SelectionContext);
}

function SelectionContextProvider({ children }) {
  const [selectedStrucType, setSelectedStrucType] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedMixClass, setSelectedMixClass] = useState('');
  const [selectedMMixClass, setSelectedMMixClass] = useState('');
  const [selectedPlasteredFaces, setselectedPlasteredFaces] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [base, setBase] = useState('');
  const [depth, setDepth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [radius, setRadius] = useState('');

  const resetValues = () => {
    setSelectedStrucType('');
    setSelectedShape('');
    setSelectedUnit('');
    setSelectedMixClass('');
    setSelectedMMixClass('');
    setselectedPlasteredFaces('');
    setLength('');
    setWidth('');
    setHeight('');
    setBase('');
    setDepth('');
    setDiameter('');
    setRadius('');
  };

  const contextValue = {
    selectedStrucType,
    setSelectedStrucType,
    selectedShape,
    setSelectedShape,
    selectedUnit,
    setSelectedUnit,
    selectedMixClass,
    setSelectedMixClass,
    selectedMMixClass,
    setSelectedMMixClass,
    selectedPlasteredFaces,
    setselectedPlasteredFaces,
    length,
    setLength,
    width,
    setWidth,
    height,
    setHeight,
    base,
    setBase,
    depth,
    setDepth,
    diameter,
    setDiameter,
    radius,
    setRadius,
    resetValues,
  };

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
}

export { SelectionContext, useSelectionContext, SelectionContextProvider };
