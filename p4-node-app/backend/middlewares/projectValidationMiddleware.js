function projectValidationMiddleware(users) {
  return function (req, res, next) {
    const { projectName } = req.body;

    if (!projectName) {
      return res.status(400).json({ error: 'Please name your current project.' });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const duplicateProjectName = user.projects.some(
      (project) => project.projectName.toLowerCase() === projectName.toLowerCase()
    );

    if (duplicateProjectName) {
      return res.status(400).json({
        message: 'A project with the same name already exists for this user',
      });
    }

    next();
  };
}

export default projectValidationMiddleware;