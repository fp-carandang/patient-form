import ConditionalEstimateMaterials from "@/components/ConditionalEstimateMaterials";
import { Link } from 'react-router-dom';
import { useSelectionContext } from '@/components/SelectionContext';
import styles from './styles/EstimatePage.module.css';

function EstimatesPage() {
  const { selectedStrucType, resetValues } = useSelectionContext();

  const handleStartNewProject = () => {
    resetValues();
  };


  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueContainer}>
        <Link to='/summary'>
          <button className={styles.valueBackButton} type='button'>←</button>
        </Link>
        <h3>Quickstimates:</h3>
        <div className={styles.valueResultContainer}>
          <ConditionalEstimateMaterials selectedStrucType={selectedStrucType} />
        </div>
        <div className={styles.valueButtonContainer}>
          <button className={styles.valueButton} type='button'>Save as PDF</button>
          <Link to='/'>
            <button
              className={styles.valueButton}
              type='button'
              onClick={handleStartNewProject}
              >Start New Project</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EstimatesPage;