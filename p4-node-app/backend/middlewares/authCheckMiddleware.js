import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserById, getUserByCredentials } from './sessions/mongodb';

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await getUserByCredentials(username, password);

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export const authCheckerMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};
