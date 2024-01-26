import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import regValidationMiddleware from '../backend/middlewares/regValidationMiddleware.js';
import logValidationMiddleware from '../backend/middlewares/logValidationMiddleware.js';
import UserFactory from '../backend/factories/UserFactory.js';
import ProjectFactory from '../backend/factories/ProjectFactory.js';
import projectValidationMiddleware from '../backend/middlewares/projectValidationMiddleware.js';
import ValueFactory from '../backend/factories/ValueFactory.js';
import valueCheckerMiddleware from '../backend/middlewares/valueCheckerMiddleware.js';
import UserRepository from '../backend/repositories/UserRepository.js';
import ProjectRepository from '../backend/repositories/ProjectRepository.js';
import ValueRepository from '../backend/repositories/ValueRepository.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
}));

const users = new UserRepository();
const userRepository = new UserRepository();
const userFactory = new UserFactory();
const projectRepository = new ProjectRepository();
const projectFactory = new ProjectFactory();
const valueRepository = new ValueRepository();
const valueFactory = new ValueFactory();

app.post('/register', regValidationMiddleware(userRepository), (req, res) => {
  const { username, password, email } = req.body;
  const user = userFactory.create(username, password, email);
  userRepository.save(user);

  res.status(201).json({
    message: `${username} registered successfully.`
  });
});

app.get('/register', (req, res) => {
  res.status(200).json({
    data: userRepository.getAllUsers(),
  });
});

app.post('/login', logValidationMiddleware(userRepository), (req, res) => {
  const { username } = req.body;

  const user = userRepository.findByUsername(username);

  req.session.user = user;

  res.status(200).json({ message: `${username} logged in.` });
});

app.post('/create-project', projectValidationMiddleware(projectRepository), (req, res) => {
  const { projectName } = req.body;
  const user = req.session.user;

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const project = projectFactory.create(projectName);

  user.projects.push(project);
  projectRepository.save(project);

  res.status(201).json({
    message: 'Project created successfully.',
  });
});

app.patch('/projects-list/:projectName', (req, res) => {
  const { user } = req.session;
  const projectName = req.params.projectName;

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  const project = user.projects.find((p) => p.projectName === projectName);

  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  project.projectName = req.body.newProjectName;
  project.date = new Date();

  res.status(200).json({
    message: 'Project name updated successfully.',
  });
});

app.get('/project-list', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  try {
    const projects = user.projects;

    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/values-input/:projectName', valueCheckerMiddleware(valueRepository), (req, res) => {
  const { user } = req.session;
  const project = user ? user.projects.find(p => p.projectName === req.body.projectName) : undefined;

  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  res.status(201).json({
    message: 'Values stored.'
  });
});

app.get('/project-values/:projectName', (req, res) => {
  const { user } = req.session;
  const { projectName } = req.params;

  if (!user || !user.projects || user.projects.length === 0) {
    return res.status(404).json({ error: 'User or project not found.' });
  }

  const project = user.projects.find(proj => proj.projectName === projectName);

  if (!project) {
    return res.status(404).json({ error: 'Project not found.' });
  }

  const values = valueRepository.getAllValues(project);

  res.status(200).json({
    data: values,
  });
});

app.delete('/delete-project/:projectName', (req, res) => {
  const { user } = req.session;
  const projectName = req.params.projectName;

  if (!user) {
    return res.status(401).json({ error: 'Please log in to access project files' });
  }

  try {
    const project = user.projects.find((p) => p.projectName === projectName);

    if (project) {
      projectRepository.delete(project);
      
      user.projects = user.projects.filter((p) => p.projectName !== projectName);
      
      return res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
