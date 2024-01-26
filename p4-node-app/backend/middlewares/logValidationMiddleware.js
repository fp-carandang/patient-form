function logValidationMiddleware(userRepository) {
  return function(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      const existingUser = userRepository.findByUsername(username);

      if (existingUser.password !== password) {
        return res.status(401).json({ error: 'Password does not match registered user.' });
      }

      next();
    } catch (error) {
      return res.status(404).json({ error: 'User not found.' });
    }
  };
}

export default logValidationMiddleware;
