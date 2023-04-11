<template>
  <div class="sidebar-wrapper">
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      @select="onSelect"
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
      <h2 class="text-center text-gray">MySales</h2>
      <div
        v-for="(menu, i) in menus"
        :key="`menu-${i}`"
      >
        <el-submenu :class="`menu-${i}`" v-if="menu.children" :index="`/mysales/${menu.path}`">
          <template slot="title">
            <eva-icon :name="menu.icon" class="mr-1 mb-1"></eva-icon>
            <span slot="title">{{ menu.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(sub, c) in menu.children"
              :key="`sub-${i}-${c}`"
              :index="`/mysales/${menu.path}/${sub.path}`"
            >
              <eva-icon v-if="sub.icon" :name="sub.icon" class="mr-1 mb-1"></eva-icon>
              <span slot="title">{{ sub.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :class="`menu-${i}`" :index="`/mysales/${menu.path}`">
          <eva-icon :name="menu.icon" class="mr-1 mb-1" :fill="menu.isActive ? '#FE634E' : '#888'"></eva-icon>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { adminNavMenu } from '@/constants/navmenu';

export default {
  data() {
    return {
      menus: adminNavMenu.map((menu) => ({
        ...menu,
        isActive: `/mysales/${menu.path}` === this.$route.path,
      })),
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
    onSelect(idx, idxPath) {
      this.menus = adminNavMenu.map((menu) => ({
        ...menu,
        isActive: idxPath === this.$route.path,
      }));
    },
  },
};
</script>
