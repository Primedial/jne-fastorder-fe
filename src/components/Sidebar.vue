<template>
  <div
    v-hammer:swipe.right="handleOpen"
    v-click-outside="closeSidebar"
    class="swipe-area"
    :class="isCollapse && 'is-active'"
  >
    <button type="button" class="sidebar-btn" @click="() => { isCollapse = !isCollapse }">
      <eva-icon name="menu-2-outline" fill="#FE634E"></eva-icon>
    </button>
    <div class="sidebar-wrapper" :class="isCollapse && 'is-active'">
      <el-menu
        :default-active="$route.path"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <div class="mt-3 p-2">
          <el-image
            style="width: 70%; height: auto"
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
        <h4 class="text-center mt-2 mb-4">{{ user.name }}</h4>
        <div class="my-2">
          <small class="text-center text-gray block">Saldo Dompet</small>
          <h2 class="text-center mt-1">{{ user?.wallet?.amount | formatCurrency }}</h2>
        </div>
        <div
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <el-submenu v-if="menu.children" :index="`/dashboard/${menu.path}`" @click.self="isCollapse = true">
            <template slot="title">
              <eva-icon :name="menu.icon" class="mr-1 mb-1" :fill="fill(menu)"></eva-icon>
              <span slot="title">{{ menu.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(sub, c) in menu.children"
                :key="`sub-${i}-${c}`"
                :index="`/dashboard/${menu.path}/${sub.path}`"
              >
                <eva-icon v-if="sub.icon" :name="sub.icon" class="mr-1 mb-1" :fill="fill(menu)"></eva-icon>
                <span slot="title">{{ sub.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="`/dashboard/${menu.path}`">
            <eva-icon :name="menu.icon" class="mr-1 mb-1" :fill="fill(menu)"></eva-icon>
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { navMenu } from '@/constants/navmenu';

export default {
  directives: { ClickOutside },
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
  watch: {
    $route() {
      this.isCollapse = false;
    },
  },
  methods: {
    fill(menu) {
      console.log(menu);
      return this.$route.path.split('/').includes(menu.path) ? '#FE634E' : 'rgba(0,0,0,0.2)';
    },
    handleOpen() {
      this.isCollapse = false;
    },
    handleClose() {
      this.isCollapse = true;
    },
    closeSidebar() {
      this.isCollapse = false;
    },
    onSwipeLeft() {
      this.isCollapse = true;
    },
  },
};
</script>
