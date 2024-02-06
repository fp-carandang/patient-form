import User from '../models/User.js';
import Project from '../models/Project.js';

class ProjectRepository {
  async save(project) {
    await project.save();
    return project;
  }

  async getAllProjects() {
    try {
      const projects = await Project.find({}).populate('values');
      return projects;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching projects.');
    }
  }

  async findByProjectName(projectName) {
    try {
      const project = await Project.findOne({ projectName });
      return project || null;
    } catch (error) {
      console.error('Error in findByProjectName:', error);
      throw new Error('An error occurred while searching for the project.');
    }
  }

  async update(project, newProjectName, newDate) {
    try {
      console.log('Starting update process...');
  
      const updatedProject = await Project.findOne({ _id: project._id });
  
      if (!updatedProject) {
        throw new Error('Project not found in the database.');
      }
  
      console.log('Project found in the database:', updatedProject);
  
      updatedProject.projectName = newProjectName;
      updatedProject.date = newDate;
  
      await updatedProject.save();
  
      console.log('Project updated in the database:', updatedProject);
  
      const user = await User.findOne({ projects: project._id });
  
      if (!user) {
        console.error('Error: User not found in the database for project:', project._id);
        throw new Error('Invalid project object or missing user.');
      }
  
      const projectIndex = user.projects.findIndex((p) => p._id.equals(project._id));
  
      if (projectIndex === -1) {
        console.error('Error: Project not found in the user\'s projects array for user:', user._id);
        throw new Error('Project not found in the user\'s projects array.');
      }
  
      console.log('Updating user\'s projects array...');
      user.projects[projectIndex].projectName = newProjectName;
  
      await user.save();
  
      console.log('User\'s projects array updated successfully.');
    } catch (error) {
      console.error('Error in update:', error);
      throw new Error('An error occurred while updating the project: ' + error.message);
    }
  }

  async deleteByProjectName(projectName) {
    const project = await Project.findOne({ projectName });

    if (!project) {
      throw new Error('Project not found.');
    }

    await Project.deleteOne({ projectName });
  }
}


export default ProjectRepository;