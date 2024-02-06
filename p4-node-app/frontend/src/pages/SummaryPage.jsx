import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import styles from './styles/SummaryPage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';
import ConditionalSummaryMixture from "@/components/ConditionalSummaryMixture";
import ConditionalSummaryShape from "@/components/ConditionalSummaryShape";
import EstimateCalculator from '@/components/EstimateCalculator';

function SummaryPage() {
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const result = EstimateCalculator();

  const handleCalculate = () => {
    if (!selectedStrucType || !selectedShape || !selectedUnit) {
      message.error('Please select structure type, shape, and unit before calculating.');
      return;
    }

    setShowResults(true);
    navigate('/quickstimates', { state: { result: result } });
  };

  const {
    selectedStrucType,
    selectedShape,
    selectedUnit,
  } = useSelectionContext();

  return (
    <div className={styles.valueContentWrapper}>
      <Link to='/input'>
        <Button type='primary' style={{ position: 'fixed', left: '10%' }}>←</Button>
      </Link>
      <div className={styles.valueMainContainer}>
        <h3>Summary:</h3>
        <div className={styles.valueContainer}>
          <p>Type: {selectedStrucType}</p>
          <p>Shape: {selectedShape}</p>
          <p>Unit: {selectedUnit}</p>
          <ConditionalSummaryMixture selectedStrucType={selectedStrucType} />
          <ConditionalSummaryShape selectedShape={selectedShape} />
        </div>
        <Button type='primary' onClick={() => handleCalculate(result)}>Quickstimate!</Button>
      </div>
    </div>
  );
}

export default SummaryPage;
