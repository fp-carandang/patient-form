import Tooltip from "@/components/Tooltip";
import styles from './styles/StructureTypePage.module.css';
import { Link } from 'react-router-dom';
import { useSelectionContext } from "@/components/SelectionContext";

function StructureTypePage() {
  const {
    selectedStrucType,
    setSelectedStrucType,
    setSelectedUnit,
  } = useSelectionContext();

  const handleCardClick = (type) => {
    setSelectedStrucType(type);
  };

  let selectedText = '';

  switch (selectedStrucType) {
    case 'concreteSlab':
      selectedText = 'Unreinforced Conc. Slab';
      break;
    case 'chbWall':
      selectedText = 'Unreinforced CHB Wall';
      break;
    default:
      selectedText = '';
  }

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueContainer}>
        <Link to='/'>
          <button className={styles.valueBackButton} type='button'>←</button>
        </Link>
        <h3>Choose Type of Structure
          <Tooltip content={<img src='./images/struc-type.jpg' alt="struc-type-img" />} >
            <p>?</p>
          </Tooltip>
        </h3>
        <div className={styles.valueCardContainer}>
          <div className={styles.valueCard} onClick={() => handleCardClick('concreteSlab')}>
            <img className={styles.valueImage} src='./images/concrete-slab.png' alt='slab-img' />
          </div>
          <div className={styles.valueCard} onClick={() => handleCardClick('chbWall')}>
            <img className={styles.valueImage} src='./images/chb-wall.png' alt='chbwall-img' />
          </div>
        </div>
        <h4 className={styles.valueStrucLabel}>{selectedText}</h4>
        <h3>Choose Unit of Measurement</h3>
        <select className={styles.valueSelectBox} id='unit' onChange={handleUnitChange}>
          <option value=''>Select Units</option>
          <option value='meter'>Metric meter m</option>
        </select>
        <Link to='/shape'>
          <button className={styles.valueButton} type='button'>Confirm</button>
        </Link>
      </div>
    </div>
  );
}

export default StructureTypePage;