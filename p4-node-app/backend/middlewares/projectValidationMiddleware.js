function projectValidationMiddleware(projectRepository) {
  return function (req, res, next) {
    const { projectName } = req.body;

    if (!projectName) {
      return res.status(400).json({ error: 'Please name your current project.' });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    try {
      const duplicateProjectName = projectRepository
        .getAllProjects()
        .some((project) => project.projectName.toLowerCase() === projectName.toLowerCase());

      if (duplicateProjectName) {
        return res.status(400).json({
          message: 'A project with the same name already exists for this user',
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default projectValidationMiddleware;
