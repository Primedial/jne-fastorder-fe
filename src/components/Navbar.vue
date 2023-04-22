<template>
  <nav class="nav-wrapper">
    <div class="nav-container w-full">
      <el-image
        style="width: 90%; height: auto"
        src="https://demo.permudahdakwah.com/images/fastorder.png"
        fit="cover"
        class="block m-auto nav-logo"
        width="100px"
      ></el-image>
      <div class="nav-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="path in paths"
            :key="path.title"
            :to="path"
          >
            {{ path.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
import auth from '@/api/auth';

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
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    async logout() {
      try {
        await auth.logout();
        localStorage.removeItem('token');
        this.$store.commit('auth/SET_LOGGED_IN', false);
        this.$router.push('/login');
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>
