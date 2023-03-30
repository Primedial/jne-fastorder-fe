<template>
  <nav class="nav-wrapper">
    <div>
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
  </nav>
</template>

<script>
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
  },
};
</script>
