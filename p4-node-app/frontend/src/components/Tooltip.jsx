import { useState } from 'react';
import styles from './styles/Tooltip.module.css'

function Tooltip({ content, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(prevState => !prevState);
  };

  return (
    <div className={styles.valueTooltipContainer} onClick={handleClick}>
      <div className={styles.valueTooltipContent}>
        {children}
        {showTooltip && (
          <div className={styles.valueTooltipDialog}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tooltip;