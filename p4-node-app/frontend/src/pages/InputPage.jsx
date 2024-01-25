import { Link } from 'react-router-dom';
import ConditionalInputShape from '@/components/ConditionalInputShape';
import ConditionalInputMixture from '@/components/ConditionalInputMixture';
import styles from './styles/InputPage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';

function InputPage() {
  const {
    selectedStrucType,
    setSelectedStrucType,
    selectedShape,
    setSelectedShape,
    selectedUnit,
    setSelectedUnit,
  } = useSelectionContext();

  const handleShapeChange = (event) => {
    setSelectedShape(event.target.value);
  };

  const handleStrucTypeChange = (event) => {
    setSelectedStrucType(event.target.value);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueMainContainer}>
        <Link to='/shape'>
          <button className={styles.valueBackButton} type='button'>←</button>
        </Link>
        <div className={styles.valueContainer}>
          <select
            className={styles.valueSelectBox}
            id='struc-type'
            onChange={handleStrucTypeChange}
            value={selectedStrucType}
          >
            <option value=''>Select Structure Type</option>
            <option value='concreteSlab'>Unreinforced Concrete Slab</option>
            <option value='chbWall'>Unreinforced CHB Wall</option>
          </select>
          <select
            className={styles.valueSelectBox}
            id='units'
            onChange={handleUnitChange}
            value={selectedUnit}
          >
            <option value=''>Select Units</option>
            <option value='meter'>Metric meter m</option>
          </select>
          <select
            className={styles.valueSelectBox}
            id='struc-shape'
            onChange={handleShapeChange}
            value={selectedShape}
          >
            <option value=''>Select Structure Shape</option>
            <option value='Rectangular'>Rectangular</option>
            <option value='Triangular'>Triangular</option>
            <option value='Circular'>Circular</option>
          </select>
        </div>
        <h3>Input Dimensions:</h3>
        <ConditionalInputShape selectedShape={selectedShape} />
        <h3>Input Mixture Type(s):</h3>
        <ConditionalInputMixture selectedStrucType={selectedStrucType} />
        <Link to='/summary'>
          <button className={styles.valueButton} type='button'>
            Confirm
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InputPage;