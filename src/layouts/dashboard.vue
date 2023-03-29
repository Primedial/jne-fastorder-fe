<template>
  <main>
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'layout',
};
</script>
