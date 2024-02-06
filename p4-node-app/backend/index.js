import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import argon2 from 'argon2';
import regValidationMiddleware from './middlewares/regValidationMiddleware.js';
import logValidationMiddleware from './middlewares/logValidationMiddleware.js';
import projectValidationMiddleware from './middlewares/projectValidationMiddleware.js';
import valueCheckerMiddleware from './middlewares/valueCheckerMiddleware.js';
import UserFactory from './factories/UserFactory.js';
import ProjectFactory from './factories/ProjectFactory.js';
import ValueFactory from './factories/ValueFactory.js';
import UserRepository from './repositories/UserRepository.js';
import ProjectRepository from './repositories/ProjectRepository.js';
import ValueRepository from './repositories/ValueRepository.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Value from './models/Value.js';
import mongoose from 'mongoose';
import MongoDBStore from 'connect-mongodb-session';
import cors from 'cors';

const MongoDBStoreSession = MongoDBStore(session);

const app = express();
const PORT = process.env.PORT || 3000;
const { connect } = mongoose;

await connect('mongodb://localhost:27017/backend');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store = new MongoDBStoreSession({
  uri: 'mongodb://localhost:27017/backend',
  collection: 'sessions',
});

app.use(session({
  secret: '09193194979abc',
  resave: false,
  saveUninitialized: true,
  store: store,
}));

app.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.currentUser = req.session.user;
  }
  next();
});

const userRepository = new UserRepository();
const userFactory = new UserFactory();
const projectRepository = new ProjectRepository();
const projectFactory = new ProjectFactory();
const valueRepository = new ValueRepository();
const valueFactory = new ValueFactory();


app.use((req, res, next) => {
  req.userRepository = userRepository;
  next();
});

app.post('/register', regValidationMiddleware(userRepository), async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const newUser = new User({
      username,
      password,
      email,
      projects: [],
    });

    await userRepository.save(newUser);

    res.status(201).json({ message: `${username} registered successfully.` });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/register', async (req, res) => {
  res.status(200).json({
    data: await userRepository.getAllUsers(),
  });
});

app.post('/login', logValidationMiddleware(userRepository), async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    res.status(200).json({ message: `${username} logged in.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Logout successful.' });
      }
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/save-project', async (req, res) => {
  try {
    const { user } = req.session;

    if (!user) {
      return res.status(404).json({ error: 'Please login to use this feature.' });
    }

    const { projectName } = req.body;

    let project = await projectRepository.findByProjectName(projectName);

    if (!project) {
      project = new Project({ projectName, values: [] });
    }

    const values = req.body;

    if (!Array.isArray(values)) {
      return res.status(400).json({ error: 'Invalid values format. Values must be an array.' });
    }

    const ValueModel = mongoose.model('Value');

    for (const currentReqValue of values) {
      if (currentReqValue._id && !mongoose.Types.ObjectId.isValid(currentReqValue._id)) {
        return res.status(400).json({ error: 'Invalid _id format in values array.' });
      }

      if (currentReqValue._id) {
        const updatedValue = await ValueModel.findByIdAndUpdate(
          currentReqValue._id,
          { ...currentReqValue },
          { new: true }
        );
        const existingValueIndex = project.values.findIndex(value =>
          value._id.equals(updatedValue._id)
        );
        project.values[existingValueIndex] = updatedValue;
      } else {
        const newValue = new ValueModel({ ...currentReqValue });
        const savedValue = await newValue.save();
        project.values.push(savedValue._id);
      }
    }

    await projectRepository.save(project);

    res.status(201).json({ message: 'Project and value(s) stored successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/project-list', async (req, res) => {
  try {
    const projects = await projectRepository.getAllProjects();

    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/rename-project/:projectName', async (req, res) => {
  try {
    const { user } = req.session;
    const { projectName } = req.params;

    if (!user) {
      return res.status(404).json({ error: 'Please login to use this feature.' });
    }

    let project = await projectRepository.findByProjectName(projectName);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    project.projectName = req.body.newProjectName;
    await projectRepository.save(project);

    const projectIndex = user.projects.findIndex((p) => p._id.equals(project._id));
    if (projectIndex !== -1) {
      user.projects[projectIndex].projectName = req.body.newProjectName;
      await user.save();
    }

    res.status(200).json({ message: 'Project renamed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/delete-project/:projectName', async (req, res) => {
  try {
    const { user } = req.session;
    const { projectName } = req.params;

    if (!user) {
      return res.status(404).json({ error: 'Please login to use this feature.' });
    }

    await projectRepository.deleteByProjectName(projectName);

    res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});