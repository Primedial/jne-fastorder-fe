import Overview from '@/views/admin/Overview.vue';
import UserType from '@/views/admin/master-data/UserType.vue';
import User from '@/views/admin/master-data/User.vue';
import UserDetail from '@/views/admin/master-data/UserDetail.vue';
import Bank from '@/views/admin/master-data/Bank.vue';

export default [
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
    name: 'admin-bank',
    path: 'bank',
    component: Bank,
    meta: {
      title: 'MySales - Bank',
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
  {
    name: 'admin-user-new',
    path: 'user/new',
    component: UserDetail,
    meta: {
      title: 'MySales - Tambah User',
    },
  },
  {
    name: 'admin-user-detail',
    path: 'user/:id',
    component: UserDetail,
    meta: {
      title: 'MySales - Detail User',
    },
  },
];
