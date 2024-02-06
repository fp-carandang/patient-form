import argon2 from 'argon2';

function logValidationMiddleware(userRepository) {
  return async function (req, res, next) {
    try {
      const { username, password } = req.body;

      const existingUser = await userRepository.findByUsername(username);

      if (!existingUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      try {
        const passwordMatch = await argon2.verify(existingUser.password, password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid username or password.' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      req.session.user = {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      };

      res.status(200).json({ message: `${username} logged in.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default logValidationMiddleware;