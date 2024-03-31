import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import NewAssignment from 'src/views/course/task-creation/NewAssignment';
import NewExam from 'src/views/course/task-creation/NewExam';
import Assignment from 'src/views/course/Assignment';
import Proctor from 'src/views/course/Assignment/proctor';
import ExamAssignment from 'src/views/course/exam';
import Exam from 'src/views/exam';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const Register = Loadable(lazy(() => import('../views/authentication/Register')));
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const CoursePage = Loadable(lazy(() => import('../views/course')))

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },

      { path: '/course/:courseId', exact: true, element: <CoursePage /> },
      { path: '/exam/:examId', exact: true, element: <Exam /> },
      { path: '/course/:courseId/new-assignment', exact: true, element: <NewAssignment /> },
      { path: '/course/:courseId/new-exam', exact: true, element: <NewExam /> },
      { path: '/course/:courseId/assignment/:assignmentId', exact: true, element: <Assignment /> },
      { path: '/course/:courseId/exam/:examId', exact: true, element: <ExamAssignment /> },
      { path: '/proctor/:examId/user/:userId', exact: true, element: <Proctor /> },

      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      // { path: '/auth/register', element: <Register /> },
      // { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Error /> },
    ],
  },
];

export default Router;
