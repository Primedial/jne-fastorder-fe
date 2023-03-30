import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardLayout from '@/layouts/dashboard.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
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

export default router;
