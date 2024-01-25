import styles from './styles/StartPage.module.css';
import { Link } from 'react-router-dom';

function StartPage() {
  return (
    <div>
      <div>
        <img className={styles.valueAd} src='./images/quick-ad.gif' />
      </div>
      <div className={styles.valueContentWrapper}>
        <div className={styles.valueContainer}>
          <img className={styles.valueImage} src='./images/quickstimate-logo.png' />
          <Link to='/type'>
            <button className={styles.valueButton} type='button'>Start New Project</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;