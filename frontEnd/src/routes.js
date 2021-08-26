import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UserProfile from './pages/usercenter/UserProfile';
import AdminPage from './pages/AdminPage/AdminPage'
import PerfumeDetailPage from './pages/PerfumeDetailPage';
import FavPerfumepage from './pages/FavPerfumepage';
import UserPage from './pages/UserPage';

export const ROUTES = [
  {
    key: 'login',
    path: '/',
    page: LoginPage,
  },
  {
    key: 'register',
    path: '/register',
    page: RegisterPage,
  },

  {
    key: 'useprofile',
    path: '/userprofile',
    page: UserProfile,
  },
  {
    key: 'adminpage',
    path: '/adminpage',
    page: AdminPage,
  },
  {
    key: "perfumeDetails",
    path: "/perfumes/:PerfumeId",
    page: PerfumeDetailPage,
  },
  {
    key: "favPerfumepage",
    path: "/favPerfumepage",
    page: FavPerfumepage,
  },
  {
    key: "UserPage",
    path: "/users/:Username",
    page: UserPage,
  },
];
