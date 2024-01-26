class ProjectRepository {
  constructor() {
    this.projects = [];
  }

  save(project) {
    this.projects.push(project);
    return project;
  }

  getAllProjects() {
    return this.projects;
  }

  findByProjectName(projectName) {
    const project = this.projects.find((project) => project.projectName === String(projectName));

    if (!project) {
      throw new Error('Project not found.');
    }

    return project;
  }

  update(project, newProjectName, newDate) {
    project.projectName = newProjectName;
    project.date = newDate;
  }

  delete(project) {
    const index = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }
}

export default ProjectRepository;