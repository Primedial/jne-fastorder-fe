<template>
  <main class="flex p-2">
    <Sidebar />
    <div class="app-wrapper">
      <Navbar />
      <transition name="el-fade-in" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
import Sidebar from '@/components/MySalesSidebar.vue';
import Navbar from '@/components/MySalesNavbar.vue';

export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['authAdmin/isLoggedIn'];
    },
  },
};
</script>
