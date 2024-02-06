import Tooltip from './Tooltip';
import styles from '@/pages/styles/InputPage.module.css';
import { useSelectionContext } from './SelectionContext';

function ConditionalInputMixture({ selectedStrucType }) {
  const {
    selectedMixClass,
    setSelectedMixClass,
    selectedMMixClass,
    setSelectedMMixClass,
    selectedPlasteredFaces,
    setselectedPlasteredFaces
  } = useSelectionContext();

  const handleMixClassChange = (event) => {
    setSelectedMixClass(event.target.value);
  };

  const handleMMixClassChange = (event) => {
    setSelectedMMixClass(event.target.value);
  };

  const handlePlasteredFacesChange = (event) => {
    setselectedPlasteredFaces(event.target.value);
  };

  return (
    <div className={styles.valueMixContainer}>
      {selectedStrucType === 'concreteSlab' && (
        <div className={styles.valueMainContainer}>
          <h4>Concrete Mix Class:
            <Tooltip content={<img src='./images/mix-type.jpg' alt="mixclass-img" />} >
              <p>?</p>
            </Tooltip>
          </h4>
          <select className={styles.valueSelectBox} id='mix-type' onChange={handleMixClassChange}>
            <option value=''>Select Mix Class</option>
            <option value='Class A'>Class A</option>
            <option value='Class B'>Class B</option>
            <option value='Class C'>Class C</option>
            <option value='Class D'>Class D</option>
          </select>
        </div>
      )}
      {selectedStrucType === 'chbWall' && (
        <div className={styles.valueContainer}>
          <div className={styles.valueMainContainer}>
            <h4>Mortar Mixture Class:
              <Tooltip content={<img src='./images/mmix-type.jpg' alt="mmixclass-img" />} >
                <p>?</p>
              </Tooltip>
            </h4>
            <select className={styles.valueSelectBox} id='mmclass-type' onChange={handleMMixClassChange}>
              <option value=''>Select Mix Class</option>
              <option value='MClass B'>Class B</option>
              <option value='MClass C'>Class C</option>
              <option value='MClass D'>Class D</option>
            </select>
          </div>
          <div className={styles.valueMainContainer}>
            <h4>No. of Plastered Faces:
              <Tooltip content={<img src='./images/plaster-face.jpg' alt="pface-img" />} >
                <p>?</p>
              </Tooltip>
            </h4>
            <select className={styles.valueSelectBox} id='pclass-type' onChange={handlePlasteredFacesChange}>
              <option value=''>Select No. of Faces</option>
              <option value='1'>Inside Only</option>
              <option value='2'>Both Sides</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConditionalInputMixture;