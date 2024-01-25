import styles from '@/pages/styles/SummaryPage.module.css';
import { useSelectionContext } from './SelectionContext';

function ConditionalSummaryShape({ selectedShape }) {
  const {
    length, 
    width,
    height,
    base,
    depth,
    diameter,
    radius,
  } = useSelectionContext();

  return (
    <div className={styles.valueContainer}>
      {selectedShape === 'Rectangular' && (
        <>
          <p>Length: {length}</p>
          <p>Width: {width}</p>
          <p>Height: {height}</p>
        </>
      )}
      {selectedShape === 'Triangular' && (
        <>
          <p>Base: {base}</p>
          <p>Height: {height}</p>
          <p>Depth: {depth}</p>
        </>
      )}
      {selectedShape === 'Circular' && (
        <>
          <p>Diameter: {diameter}</p>
          <p>Radius: {radius}</p>
          <p>Depth: {depth}</p>
        </>
      )}
    </div>
  );
}

export default ConditionalSummaryShape;