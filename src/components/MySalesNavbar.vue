<template>
  <nav class="nav-wrapper">
    <div class="flex items-center justify-between w-full">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="path in paths"
          :key="path.title"
          :to="path"
        >
          {{ path.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown>
        <span class="el-dropdown-link">
          <strong>{{ user.name }}</strong><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <button type="button" class="btn-reset" @click="logout">Logout</button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import auth from '@/api/admin/auth';

export default {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    paths() {
      const paths = this.$route.path.split('/').slice(1);
      return paths.map((item, i) => {
        const newItem = item.replace(/[^A-Za-z]/g, ' ').split(' ').map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
        const to = `/${paths.slice(0, i + 1).join('/')}`;
        return {
          title: newItem.charAt(0).toUpperCase() + newItem.slice(1),
          path: to,
        };
      });
    },
    user() {
      return this.$store.getters['adminAuth/user'];
    },
  },
  methods: {
    async logout() {
      await auth.logout();
      localStorage.removeItem('admintoken');
      this.$store.commit('adminAuth/SET_LOGGED_IN', false);
      this.$router.push({ name: 'admin-login' });
    },
  },
};
</script>
