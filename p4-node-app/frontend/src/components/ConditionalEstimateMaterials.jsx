import { useSelectionContext } from './SelectionContext';
import EstimateCalculator from './EstimateCalculator';
import styles from '@/pages/styles/EstimatePage.module.css';

function ConditionalEstimateMaterials({ selectedStrucType }) {
  const {
    selectedUnit,
  } = useSelectionContext();

  const result = EstimateCalculator();

  return (
    <div className={styles.valueContainer}>
      {selectedStrucType === 'concreteSlab' && (
        <>
          <p>Volume: {result.volume} cu.{selectedUnit}</p>
          <p>Cement: {result.cement} 50-kg bags</p>
          <p>Sand: {result.sand} cu.{selectedUnit}</p>
          <p>Gravel: {result.gravel} cu.{selectedUnit}</p>
        </>
      )}
      {selectedStrucType === 'chbWall' && (
        <>
          <p>Area: {result.area} sq.{selectedUnit}</p>
          <p>CHB: {result.chb} pcs 10x20x40 chb</p>
          <p>Cement: {result.cement} 50-kg bags</p>
          <p>Sand: {result.sand} cu.{selectedUnit}</p>
        </>
      )}
    </div>
  );
}

export default ConditionalEstimateMaterials;