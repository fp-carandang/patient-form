function projectValidationMiddleware(projectRepository) {
  return async function (req, res, next) {
    const { projectName } = req.params;
    const { values } = req.body;

    if (!projectName) {
      return res.status(400).json({ error: 'Please name your current project.' });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    try {
      const existingProject = await projectRepository.findByProjectName(projectName);

      if (existingProject) {
        existingProject.values = values;
        const updatedProject = await projectRepository.save(existingProject);
        return res.status(200).json({ message: 'Project updated successfully.', data: updatedProject });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
  };
}

export default projectValidationMiddleware;