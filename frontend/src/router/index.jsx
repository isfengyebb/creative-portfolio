/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../constants';
import RootLayout from '../layouts/RootLayout';

const HomePage = () => import('../pages/HomePage');
const ResumePage = () => import('../pages/ResumePage');
const ProjectsPage = () => import('../pages/ProjectsPage');
const NotFoundPage = () => import('../pages/NotFoundPage');

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: HomePage,
      },
      {
        path: ROUTES.RESUME.slice(1),
        lazy: ResumePage,
      },
      {
        path: ROUTES.PROJECTS.slice(1),
        lazy: ProjectsPage,
      },
      {
        path: '*',
        lazy: NotFoundPage,
      },
    ],
  },
]);

export default router;
