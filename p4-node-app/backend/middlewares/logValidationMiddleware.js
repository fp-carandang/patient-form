function logValidationMiddleware(users) {
  return function(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Both username and password are required.' });
    }

    const existingUser = users.find(user => user.username === username);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: 'Password does not match registered user.' });
    }
    next();
  };
}

export default logValidationMiddleware;