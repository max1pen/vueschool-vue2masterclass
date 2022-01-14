<template>
  <div class="home-wrapper">
    <div v-if="asyncDataStatus_ready" class="push-top">
        <h1>Welcome to the Forum </h1>
        <CategoryList :categories="categories" />
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
var conf = require('dotenv').config();

export default {
    components: {
        CategoryList
    },
    data() {
        return {
            ready: false
        }
    },
    mixins: [asyncDataStatus],
    computed: {
        categories() {
            return Object.values(this.$store.state.categories.items)
        }
    },
    created() {
        this.$store.dispatch('categories/fetchAllCategories')
        .then(categories => Promise.all(categories.map(category => this.$store.dispatch('forums/fetchForums', {ids: Object.keys(category.forums)}))))
        .then(() => this.asyncDataStatus_fetched())
    }
}
</script>
<style scoped>
    .home-wrapper {
        width: 100%;
    }
</style>