import CreatePassword from './CreatePassword';
import EmailVerification from './EmailVerification';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import ResetPassword from './ResetPassword';

const authenticationRoutes = [
  {
    path: '/auth',
    component: Login,
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    path: '/auth/reset-password',
    component: ResetPassword,
    exact: true,
  },
  {
    path: '/auth/email-verification',
    component: EmailVerification,
    exact: true,
  },
  {
    path: '/auth/create-password',
    component: CreatePassword,
    exact: true,
  },
];

export default authenticationRoutes;
