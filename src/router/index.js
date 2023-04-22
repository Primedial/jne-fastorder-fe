import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/layouts/dashboard.vue';
import AdminDashboardLayout from '@/layouts/admin_dashboard.vue';
import Login from '@/views/Login.vue';
import SetPassword from '@/views/SetPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Verify from '@/views/Verify.vue';
import AdminLogin from '@/views/admin/Login.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';
import dashboardRoutes from './dashboard';
import adminRoutes from './adminDashboard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard/overview',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/set-password',
    name: 'set-password',
    component: SetPassword,
    meta: {
      title: 'Reset Password',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      title: 'Lupa Password',
    },
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verify,
    meta: {
      title: 'Verifikasi Akun',
    },
  },
  {
    name: 'admin-login',
    path: '/mysales/login',
    component: AdminLogin,
    meta: {
      title: 'MySales - Login',
    },
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/dashboard/overview',
    children: [...dashboardRoutes],
  },
  {
    path: '/mysales',
    component: AdminDashboardLayout,
    redirect: '/mysales/overview',
    children: [...adminRoutes],
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const publicRoutes = ['/login', '/register', '/mysales/login', '/set-password'];
const routeIdentifier = (to) => to.name.split('-')[0];

const verifyRoutePath = (to, next) => {
  const destinationPath = to.matched[0].path === '/mysales' ? to.matched[1].path : to.matched[0].path;
  const isAdmin = routeIdentifier(to) === 'admin';
  if (publicRoutes.includes(destinationPath)) {
    if (isAdmin) {
      if (store.getters['adminAuth/isLoggedIn']) {
        return next({ path: '/mysales/overview' });
      }
    }
    if (store.getters['auth/isLoggedIn']) {
      return next({ path: '/dashboard/overview' });
    }
  }
  if (isAdmin) {
    if (store.getters['adminAuth/isLoggedIn']) {
      return next();
    }
    return next();
  }
  if (store.getters['auth/isLoggedIn']) {
    return next();
  }
  return next();
};

router.beforeEach(async (to, from, next) => {
  if (!store.getters.loaded) {
    try {
      if (routeIdentifier(to) === 'admin') {
        if (localStorage.getItem('token')) {
          await store.dispatch('adminAuth/introspect');
        }
      } else {
        if (localStorage.getItem('token')) {
          await store.dispatch('auth/introspect');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  document.title = to.meta.title;
  verifyRoutePath(to, next);
});

export default router;
