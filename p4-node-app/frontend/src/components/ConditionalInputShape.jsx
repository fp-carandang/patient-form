import Tooltip from './Tooltip';
import styles from '@/pages/styles/InputPage.module.css';
import { useSelectionContext } from './SelectionContext';

function ConditionalInputShape({ selectedShape }) {
  const {
    setLength,
    setWidth,
    setHeight,
    setBase,
    setDepth,
    setDiameter,
    setRadius,
  } = useSelectionContext();

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleBaseChange = (event) => {
    setBase(event.target.value);
  };

  const handleDepthChange = (event) => {
    setDepth(event.target.value);
  };

  const handleDiameterChange = (event) => {
    setDiameter(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;

    if (
      !(
        keyCode === 8 ||
        keyCode === 190 ||
        keyCode === 110 ||
        (keyCode >= 48 && keyCode <= 57)
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.valueContainer}>
      {selectedShape === 'Rectangular' && (
        <>
          <label htmlFor='lengthInput'>Length:
          <Tooltip content={<img src='./images/rec-length.jpg' alt="rec-length-img" />} > 
            <p>?</p>
          </Tooltip> 
          </label>
          <input
            className={styles.valueInput}
            type='number'
            id='lengthInput'
            min='0' 
            onKeyDown={handleKeyPress}
            onChange={handleLengthChange}
            step='any' />
          <label htmlFor='widthInput'>Width:
          <Tooltip content={<img src='./images/rec-width.jpg' alt="rec-width-img" />} > 
            <p>?</p>
          </Tooltip> 
          </label>
          <input
            className={styles.valueInput}
            type='number' 
            id='widthInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleWidthChange}
            step='any' />
          <label htmlFor='heightInput'>Height:
          <Tooltip content={<img src='./images/rec-height.jpg' alt="rec-height-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='heightInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleHeightChange}
            step='any' />
        </>
      )}
      {selectedShape === 'Triangular' && (
        <>
          <label htmlFor='baseInput'>Base:
          <Tooltip content={<img src='./images/tri-base.jpg' alt="tri-base-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='baseInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleBaseChange}
            step='any' />
          <label htmlFor='heightInput'>Height:
          <Tooltip content={<img src='./images/tri-height.jpg' alt="tri-height-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='heightInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleHeightChange}
            step='any' />
          <label htmlFor='depthInput'>Depth:
          <Tooltip content={<img src='./images/tri-depth.jpg' alt="tri-depth-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='depthInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleDepthChange}
            step='any' />
        </>
      )}
      {selectedShape === 'Circular' && (
        <>
          <label htmlFor='diameterInput'>Diameter:
          <Tooltip content={<img src='./images/cir-diameter.jpg' alt="cir-diameter-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='diameterInput' 
            min='0' 
            onKeyDown={handleKeyPress}
            onChange={handleDiameterChange} 
            step='any' />
          <label htmlFor='radiusInput'>Radius:
          <Tooltip content={<img src='./images/cir-radius.jpg' alt="cir-radius-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input
            className={styles.valueInput}
            type='number' 
            id='radiusInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleRadiusChange}
            step='any' />
          <label htmlFor='depthInput'>Depth:
          <Tooltip content={<img src='./images/cir-depth.jpg' alt="cir-depth-img" />} > 
            <p>?</p>
          </Tooltip>
          </label>
          <input 
            className={styles.valueInput} 
            type='number' 
            id='depthInput' 
            min='0' 
            onKeyDown={handleKeyPress} 
            onChange={handleDepthChange}
            step='any' />
        </>
      )}
    </div>
  );
}

export default ConditionalInputShape;