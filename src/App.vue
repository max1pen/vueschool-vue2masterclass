<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'App',
  components: {
    TheNavbar
  }
}
</script>

<style scoped>
@import "assets/css/style.css";
.container {
  min-height: auto !important;
}
</style>
