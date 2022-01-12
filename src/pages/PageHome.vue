<template>
  <div class="home-wrapper push-top">
      <h1>Welcome to the Forum</h1>
      <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'

export default {
    components: {
        CategoryList
    },
    computed: {
        categories() {
            return Object.values(this.$store.state.categories)
        }
    }
}
</script>
<style scoped>
    .home-wrapper {
        width: 100%;
    }
</style>