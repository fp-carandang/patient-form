import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useSelectionContext } from '@/components/SelectionContext';

function TutorialPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/shape');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', gap: '20px' }}>
        <img style={{ height: 'auto', maxWidth: '100%', marginBottom: '20px' }} src='./images/area-info.gif' alt='area-info-img' />
        <Link to='/shape'>
          <Button type='primary'>Ok, I got it! 🙂</Button>
        </Link>
      </div>
    </div>
  );
}

export default TutorialPage;
