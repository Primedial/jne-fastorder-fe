<template>
  <main class="flex">
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
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
