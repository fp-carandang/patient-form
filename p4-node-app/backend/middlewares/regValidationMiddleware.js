function regValidationMiddleware(userRepository) {
  return async function (req, res, next) {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
      const users = await userRepository.getAllUsers();

      if (!users || !Array.isArray(users)) {
        // Handle the case where users is undefined or not an array
        console.error('Invalid users array:', users);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const duplicateEmail = users.find(user => user && user.email && user.email.toLowerCase() === email.toLowerCase());
      const duplicateUsername = users.find(user => user && user.username && user.username.toLowerCase() === username.toLowerCase());

      if (duplicateEmail) {
        return res.status(400).json({ message: 'An existing user account already uses this email' });
      }

      if (duplicateUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default regValidationMiddleware;
