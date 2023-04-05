import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/layouts/dashboard.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';
import dashboardRoutes from './dashboard';

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

const publicRoutes = ['/login', '/register'];

const verifyRoutePath = (to, next) => {
  const destinationPath = to.matched[0].path;
  if (publicRoutes.includes(destinationPath)) {
    if (store.getters['auth/isLoggedIn']) {
      return next({ path: '/dashboard/overview' });
    }
    return next();
  }
  if (store.getters['auth/isLoggedIn']) {
    return next();
  }
  return next({ path: '/login' });
};

router.beforeEach(async (to, from, next) => {
  if (!store.getters['auth/isLoaded']) {
    try {
      await store.dispatch('auth/introspect');
    } catch (error) {
      console.log(error);
    }
  }
  document.title = to.meta.title;
  verifyRoutePath(to, next);
});

export default router;
