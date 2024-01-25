import Project from '../models/Project.js';

class ProjectFactory {
  create(projectName) {
    return new Project(projectName);
  }
}

export default ProjectFactory;