import { Link } from 'react-router-dom';
import styles from './styles/TutorialPage.module.css';

function TutorialPage() {
  return (
    <div className={styles.valueContentWrapper}>
      <div className={styles.valueContainer}>
        <img className={styles.valueImage} src='./images/area-info.gif' alt='area-info-img' />
        <Link to='/shape'>
          <button className={styles.valueButton} type='button'>Ok, I got it! 🙂</button>
        </Link>
      </div>
    </div>
  );
}

export default TutorialPage;