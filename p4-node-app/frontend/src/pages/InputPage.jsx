import { Link, useNavigate } from 'react-router-dom';
import ConditionalInputShape from '@/components/ConditionalInputShape';
import ConditionalInputMixture from '@/components/ConditionalInputMixture';
import styles from './styles/InputPage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';
import { Button } from 'antd';
import toast, { Toaster } from 'react-hot-toast';

function InputPage() {
  const {
    selectedStrucType,
    setSelectedStrucType,
    selectedShape,
    setSelectedShape,
    selectedUnit,
    setSelectedUnit,
    selectedMixClass,
    selectedMMixClass,
    selectedPlasteredFaces,
    length,
    width,
    height,
    base,
    depth,
    diameter,
    radius,
  } = useSelectionContext();

  const navigate = useNavigate();

  const handleShapeChange = (event) => {
    setSelectedShape(event.target.value);
  };

  const handleStrucTypeChange = (event) => {
    setSelectedStrucType(event.target.value);
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleConfirm = () => {
    let errorMessage = '';
  
    switch (selectedStrucType) {
      case 'concreteSlab':
        switch (selectedShape) {
          case 'Rectangular':
            if (!selectedUnit || !length || !width || !height || !selectedMixClass) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          case 'Triangular':
            if (!selectedUnit || !base || !height || !selectedMixClass) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          case 'Circular':
            if (!selectedUnit || !diameter || !height || !selectedMixClass) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          default:
            errorMessage = 'Please select a valid shape.';
            break;
        }
        break;
      case 'chbWall':
        switch (selectedShape) {
          case 'Rectangular':
            if (!selectedUnit || !length || !width || !height || !selectedMMixClass || !selectedPlasteredFaces) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          case 'Triangular':
            if (!selectedUnit || !base || !height || !selectedMMixClass || !selectedPlasteredFaces) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          case 'Circular':
            if (!selectedUnit || !diameter || !height || !selectedMMixClass || !selectedPlasteredFaces) {
              errorMessage = 'Please fill in all fields.';
            }
            break;
          default:
            errorMessage = 'Please select a valid shape.';
            break;
        }
        break;
      default:
        errorMessage = 'Please select a valid structure type.';
        break;
    }
  
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
  
    navigate('/summary');
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', paddingBottom: '20px' }}>
      <Toaster position="top-center" />
      <Link to='/shape'>
        <Button type='primary' style={{ position: 'fixed', left: '10%' }}>←</Button>
      </Link>
      <div className={styles.valueMainContainer}>
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
        <Button type='primary' style={{ position: 'fixed', left: '38%', bottom: '80px' }} onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
}

export default InputPage;