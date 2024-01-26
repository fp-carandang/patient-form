function regValidationMiddleware(userRepository) {
  return function (req, res, next) {
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

    const duplicateEmail = userRepository.getAllUsers().find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicateEmail) {
      return res.status(400).json({ 
        message: 'An existing user account already uses this email' 
      });
    }

    const duplicateUsername = userRepository.getAllUsers().find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (duplicateUsername) {
      return res.status(400).json({ 
        message: 'Username already exists' 
      });
    }

    next();
  };
}

export default regValidationMiddleware;
