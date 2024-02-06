import { useEffect, useState, useContext } from 'react';
import { Card, Button, Typography, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import AuthContext from '@/components/AuthContext';

const { Title } = Typography;

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:3000/project-list/user/${userId}`);
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, [userId]);

  const handleOpenProjectDetails = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete-project/${selectedProject.projectName}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== selectedProject._id)
      );
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleOpenRenameModal = () => {
    setRenameModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setRenameModalOpen(false);
  };

  const handleRenameProject = async () => {
    try {
      await axios.patch(`http://localhost:3000/rename-project/${selectedProject.projectName}`, {
        newProjectName: newProjectName,
      });

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === selectedProject._id
            ? { ...project, projectName: newProjectName }
            : project
        )
      );

      setRenameModalOpen(false);
    } catch (error) {
      console.error('Error renaming project:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 16 }}>
      <Title level={3}>Project List</Title>
      {projects.map((project) => (
        <Card
          key={project._id}
          style={{ margin: '8px 0' }}
          title={project.projectName}
          extra={
            <div>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleOpenProjectDetails(project)}
              >
                Details
              </Button>
              <Button type="text" icon={<DeleteOutlined />} onClick={handleDeleteProject}>
                Delete
              </Button>
              <Button type="text" onClick={handleOpenRenameModal}>
                Rename
              </Button>
            </div>
          }
        >
          <p>Last saved: {new Date(project.date).toLocaleString()}</p>
        </Card>
      ))}

      <Modal
        title={selectedProject?.projectName || 'Project Details'}
        open={modalOpen}
        onClose={handleCloseModal}
        footer={null}
      >
        {selectedProject && (
          <div>
            <p>Last saved: {new Date(selectedProject.date).toLocaleString()}</p>
            <p>Estimates:</p>
            {selectedProject.values.map((value, index) => (
              <div key={index}>
                <p>Volume: {value.volume}</p>
                <p>Cement: {value.cement}</p>
                <p>Gravel: {value.gravel}</p>
                <p>Sand: {value.sand}</p>
                <p>CHB: {value.chb}</p>
                <p>Area: {value.area}</p>
                <p>Mortar Cement: {value.mortarCement}</p>
                <p>Plaster Cement: {value.plasterCement}</p>
                <p>Mortar Sand: {value.mortarSand}</p>
                <p>Plaster Sand: {value.plasterSand}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        title="Rename Project"
        open={renameModalOpen}
        onClose={handleCloseRenameModal}
        onOk={handleRenameProject}
      >
        <Input
          placeholder="Enter new project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ProjectListPage;
