import Overview from '@/views/admin/Overview.vue';
import Login from '@/views/admin/Login.vue';
import UserType from '@/views/admin/master-data/UserType.vue';
import User from '@/views/admin/master-data/User.vue';

export default [
  {
    name: 'admin-login',
    path: 'login',
    component: Login,
    meta: {
      title: 'MySales - Login',
    },
  },
  {
    name: 'admin-overview',
    path: 'overview',
    component: Overview,
    meta: {
      title: 'MySales - Overview',
    },
  },
  {
    name: 'admin-usertype',
    path: 'user-type',
    component: UserType,
    meta: {
      title: 'MySales - Tipe User',
    },
  },
  {
    name: 'admin-user',
    path: 'user',
    component: User,
    meta: {
      title: 'MySales - Tipe User',
    },
  },
];
