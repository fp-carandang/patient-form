import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Input, message } from 'antd';
import styles from './styles/EstimatePage.module.css';
import { useSelectionContext } from '@/components/SelectionContext';
import ConditionalEstimateMaterials from "@/components/ConditionalEstimateMaterials";
import AuthContext from "@/components/AuthContext";
import toast, { Toaster } from 'react-hot-toast';
import EstimateCalculator from "@/components/EstimateCalculator";

function EstimatesPage() {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { selectedStrucType, resetValues } = useSelectionContext();
  const result = EstimateCalculator();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleStartNewProject = () => {
    resetValues();
    navigate('/');
  };

  const handleSaveProject = async () => {
    if (!isUserLoggedIn) {
      toast.error('Please log in to use this feature');
      return;
    }
  
    if (!projectName) {
      message.error('Please input a project name.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/save-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, result }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save project');
      }
  
      toast.success('Project and values stored successfully');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project. Please try again later.');
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <div className={styles.valueContentWrapper}>
      <Toaster position="top-center" />
      <Link to='/input'>
        <Button type='primary' style={{ position: 'fixed', left: '10%' }}>←</Button>
      </Link>
      <div className={styles.valueContainer}>
        <h3>Quickstimates:</h3>
        <div className={styles.valueResultContainer}>
          <ConditionalEstimateMaterials selectedStrucType={selectedStrucType} />
        </div>
        <Button
          type='primary'
          style={{ position: 'fixed', left: '8%', bottom: '80px' }}
          onClick={() => setModalVisible(true)}
        >
          Save Project
        </Button>
        <Button
          type='primary'
          style={{ position: 'fixed', left: '48%', bottom: '80px' }}
          onClick={handleStartNewProject}
        >
          Start New Project
        </Button>
      </div>
      <Modal
        title="Enter Project Name"
        open={modalVisible}
        onOk={handleSaveProject}
        onCancel={() => setModalVisible(false)}
      >
        <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
      </Modal>
    </div>
  );
}

export default EstimatesPage;
