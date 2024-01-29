import Project from '../models/Project.js';

class ProjectFactory {
  create(projectName) {
    return new Project({
      projectName,
      date: new Date(),
      values: [],
    });
  }
}

export default ProjectFactory;