import { Link } from "react-router-dom";
import styles from './styles/StructureShapePage.module.css';
import { useSelectionContext } from "@/components/SelectionContext";

function StructureShapePage() {
  const {
    selectedStrucType,
    setSelectedStrucType,
    setSelectedUnit,
    selectedShape,
    setSelectedShape
  } = useSelectionContext();

  const handleShapeChange = (event) => {
    setSelectedShape(event.target.value);
  };

  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueContainer}>
        <Link to='/type'>
          <button className={styles.valueBackButton} type='button'>←</button>
        </Link>
        <h3>Choose Structure Shape</h3>
        <select className={styles.valueSelectBox} id='struc-shape' onChange={handleShapeChange}>
          <option value=''>Select Shape</option>
          <option value='Rectangular'>Rectangular</option>
          <option value='Triangular'>Triangular</option>
          <option value='Circular'>Circular</option>
        </select>
        <Link to='/input'>
          <button className={styles.valueButton} type='button'>Confirm</button>
        </Link>
        <br></br>
        <br></br>
        <br></br>
        <Link to='/tutorial'>
          <button className={styles.valueButton} type='button'>Hold on! The shape is irregular ☹️</button>
        </Link>
      </div>
    </div>
  );
}

export default StructureShapePage;