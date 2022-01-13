<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <!-- pass unique key to destroy current component, rerender new componet that make created() hook run -->
      <router-view :key="$route.path" v-show="showPage" @ready="pageReady"></router-view>
       <AppSpinner v-show="!showPage" />
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppSpinner from '@/components/AppSpinner'
import NProgress from 'nprogress'

export default {
  name: 'App',
  data() {
    return {
      showPage: false
    }
  },
  components: {
    TheNavbar,
    AppSpinner
  },
  methods: {
    pageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      NProgress.configure({
        speed: 200,
        showSpinner: false
      })
      NProgress.start();
      next()
    })
  }
}
</script>

<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";

.container {
  min-height: auto !important;
}
#nprogress .bar {
  background: #57AD8D;
  height: 3px;
}
</style>