import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/layouts/dashboard.vue';
import AdminDashboardLayout from '@/layouts/admin_dashboard.vue';
import Login from '@/views/Login.vue';
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

const publicRoutes = ['/login', '/register', '/mysales/login'];
const routeIdentifier = (to) => to.name.split('-')[0];

const verifyRoutePath = (to, next) => {
  // console.log(to.matched);
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
    // return next();
  }
  if (isAdmin) {
    if (store.getters['adminAuth/isLoggedIn']) {
      return next();
    }
  }
  if (store.getters['auth/isLoggedIn']) {
    return next();
  }
  if (isAdmin) {
    return next({ path: '/mysales/login' });
  }
  return next({ path: '/login' });
};
router.beforeEach(async (to, from, next) => {
  if (!store.getters['auth/isLoaded']) {
    try {
      if (routeIdentifier(to) === 'admin') {
        await store.dispatch('adminAuth/introspect');
      } else {
        await store.dispatch('auth/introspect');
      }
    } catch (error) {
      console.log(error);
    }
  }
  document.title = to.meta.title;
  verifyRoutePath(to, next);
});

export default router;
