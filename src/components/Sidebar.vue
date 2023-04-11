<template>
  <div class="sidebar-wrapper">
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <div class="mt-2 p-2">
        <el-image
          style="width: 90%; height: auto"
          src="https://demo.permudahdakwah.com/images/fastorder.png"
          fit="cover"
          class="block m-auto"
        ></el-image>
      </div>
      <div class="w-full flex justify-center mt-3">
        <el-avatar
          shape="circle"
          :size="100"
          fit="cover"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-avatar>
      </div>
      <small class="text-center text-gray mb-1 mt-2 block">Welcome back,</small>
      <h4 class="text-center mt-0 mb-4">{{ user.name }}</h4>
      <div class="my-2">
        <h2 class="text-center mb-0">{{ user.wallet.amount | formatCurrency }}</h2>
        <small class="text-center text-gray block mt-1">Total Saldo</small>
      </div>
      <div
        v-for="(menu, i) in menus"
        :key="`menu-${i}`"
      >
        <el-submenu v-if="menu.children" :index="`/dashboard/${menu.path}`">
          <template slot="title">
            <eva-icon :name="menu.icon" class="mr-1 mb-1"></eva-icon>
            <span slot="title">{{ menu.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(sub, c) in menu.children"
              :key="`sub-${i}-${c}`"
              :index="`/dashboard/${menu.path}/${sub.path}`"
            >
              <eva-icon v-if="sub.icon" :name="sub.icon" class="mr-1 mb-1"></eva-icon>
              <span slot="title">{{ sub.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="`/dashboard/${menu.path}`">
          <eva-icon :name="menu.icon" class="mr-1 mb-1"></eva-icon>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { navMenu } from '@/constants/navmenu';

export default {
  data() {
    return {
      menus: navMenu,
      isCollapse: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    handleOpen() {
      this.isCollapse = false;
    },
    handleClose() {
      this.isCollapse = true;
    },
  },
};
</script>
