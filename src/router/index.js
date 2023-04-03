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

router.beforeEach(async (to, from, next) => {
  try {
    if (!store.getters['auth/isLoaded']) {
      await store.dispatch('auth/introspect');
    }
    if (store.getters['auth/isLoggedIn'] && store.getters['auth/isLoaded']) {
      if (publicRoutes.includes(to.path)) {
        console.log('KESINI GA');
        next({ name: 'dashboard-overview' });
      } else {
        next();
      }
    } else {
      next('/login');
    }
  } catch (e) {
    next('/login');
  }
});

export default router;
