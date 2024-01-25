import { useState } from 'react';
import ConditionalSummaryShape from "@/components/ConditionalSummaryShape";
import { Link } from 'react-router-dom';
import styles from './styles/SummaryPage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';
import ConditionalSummaryMixture from "@/components/ConditionalSummaryMixture";
import EstimateCalculator from '@/components/EstimateCalculator';

function SummaryPage() {
  const [showResults, setShowResults] = useState(false);
  const result = EstimateCalculator();

  const handleCalculate = () => {
    setShowResults(true);
  };

  const {
    selectedStrucType,
    selectedShape,
    selectedUnit,
  } = useSelectionContext();

  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueMainContainer}>
        <Link to='/input'>
          <button className={styles.valueBackButton} type='button'>←</button>
        </Link>
        <h3>Summary:</h3>
          <div className={styles.valueContainer}>
            <p>Type: {selectedStrucType}</p>
            <p>Shape: {selectedShape}</p>
            <p>Unit: {selectedUnit}</p>
            <ConditionalSummaryMixture selectedStrucType={selectedStrucType} />
            <ConditionalSummaryShape selectedShape={selectedShape} />
          </div>
        <Link to='/quickstimates'>
          <button className={styles.valueButton} type='button' onClick={handleCalculate}>Quickstimate!</button>
        </Link>
      </div>
    </div>
  );
}

export default SummaryPage;