import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Image } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '@/components/AuthContext';

function StartPage() {
  const { isUserLoggedIn, username, setUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenProject = () => {
    if (isUserLoggedIn) {
      navigate('/project-list');
    } else {
      toast.error('Please log in to use this feature.');
    }
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Toaster position="top-center" />
      <div style={{ width: '100%' }}>
        <Image style={{ height: '80px', width: '100%' }} src='./images/quick-ad.gif' alt="Quick Ad" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image style={{ marginTop: '60px', marginBottom: '20px', height: '150px', width: '140px' }} src='./images/quickstimate-logo.png' alt="Quickstimate Logo" />
          <Link to='/type'>
            <Button type='primary'>
              Start New Project
            </Button>
          </Link>
        </div>
        <Button type='primary' onClick={handleOpenProject}>
          View Projects
        </Button>
        {isUserLoggedIn ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <p>Logged in as {username}</p>
            <Button type='link' onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <Link to='/login'>
            <Button type='link'>
              Log In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartPage;
