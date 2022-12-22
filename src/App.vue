<template>
  <div id="app">
    <main-tab-bar />
    <!-- exclude 将这个组件排除会重新的创建 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

import MainTabBar from './components/content/mainTabBar/MainTabBar.vue';
export default {
  name: 'App',
  components: {
    MainTabBar

  }
}
</script>

<style>
@import './assets/css/base.css';
</style>
