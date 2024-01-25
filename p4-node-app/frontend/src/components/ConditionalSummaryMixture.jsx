import styles from '@/pages/styles/SummaryPage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';

function ConditionalSummaryMixture({ selectedStrucType }) {
  const {
    selectedMixClass,
    selectedMMixClass,
    selectedPlasteredFaces,
  } = useSelectionContext(); 

  return (
    <div className={styles.valueContainer}>
      {selectedStrucType === 'concreteSlab' && (
        <>
          <p>Concrete Mix Class: {selectedMixClass}</p>
        </>
      )}
      {selectedStrucType === 'chbWall' && (
        <>
          <p>Mortar Mix Class: {selectedMMixClass}</p>
          <p>No. of Plastered Faces: {selectedPlasteredFaces}</p>
        </>
      )}
    </div>
  );
}

export default ConditionalSummaryMixture;