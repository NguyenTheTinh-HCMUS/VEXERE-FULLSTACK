import Home from './pages/home/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/sigup'
import XacNhanMatKhau from './pages/XacNhanMatKhau'
import NotFound from './pages/NotFound'
export const routeHome=[
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/auth/login',
        exact: false,
        component: Login
    },
    {
        path: '/auth/signup',
        exact: false,
        component: Signup
    },
    {
        path: '/XacNhanMatKhau/:token',
        exact: false,
        component: XacNhanMatKhau
    },
    {
        path: '',
        exact: false,
        component: NotFound
    }
]