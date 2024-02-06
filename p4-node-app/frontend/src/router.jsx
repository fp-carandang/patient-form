import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import StructureTypePage from './pages/StructureTypePage';
import StructureShapePage from './pages/StructureShapePage';
import InputPage from './pages/InputPage';
import SummaryPage from './pages/SummaryPage';
import EstimatesPage from './pages/EstimatesPage';
import TutorialPage from './pages/TutorialPage';
import RegistrationPage from './pages/RegistrationPage';
import ProjectListPage from './pages/ProjectListPage';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
  {
    path: '/project-list',
    element: <ProjectListPage />,
  },
  {
    path: '/type',
    element: <StructureTypePage />,
  },
  {
    path: '/shape',
    element: <StructureShapePage />,
  },
  {
    path: '/input',
    element: <InputPage/>,
  },
  {
    path: '/summary',
    element: <SummaryPage />,
  },
  {
    path: '/quickstimates',
    element: <EstimatesPage />,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
])

export default router;