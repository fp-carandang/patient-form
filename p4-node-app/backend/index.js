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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
}));

const users = [];
const userFactory = new UserFactory();
const projectFactory = new ProjectFactory();
const valueFactory = new ValueFactory();

app.post('/register', regValidationMiddleware(users), (req, res) => {
  const { username, password, email } = req.body;
  const user = userFactory.create(username, password, email);
  users.push(user);

  res.status(201).json({
    message: `${username} registered successfully.`
  });
});

app.get('/register', (req, res) => {
  res.status(200).json({
    data: users,
  });
});

app.post('/login', logValidationMiddleware(users), (req, res) => {
  const { username } = req.body;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  req.session.user = user;

  res.status(200).json({ message: `${username} logged in.` });
});

app.post('/create-project', projectValidationMiddleware(users), (req, res) => {
  const { projectName } = req.body;
  const user = req.session.user;

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const project = projectFactory.create(projectName);

  user.projects.push(project);

  res.status(201).json({
    message: 'Project created successfully.'
  });
});

app.get('/project-list', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.status(200).json({
    data: user.projects,
  });
});

app.post('/values-input', valueCheckerMiddleware, (req, res) => {
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

  const values = project.values;

  res.status(200).json({
    data: values,
  });
});


app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
