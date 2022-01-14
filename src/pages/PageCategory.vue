<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
      <h1>{{ category.name }}</h1>
      <CategoryListItem :category="category" />
  </div>
</template>

<script>
import CategoryListItem from '@/components/CategoryListItem'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
    components: {
        CategoryListItem
    },
    props: {
        id: {
            required: true,
            type: String
        }
    },
    mixins: [asyncDataStatus],
    computed: {
        category() {
            return this.$store.state.categories.items[this.id]
        }
    },
    created() {
        this.$store.dispatch('categories/fetchCategory', {id: this.id})
        .then(category => this.$store.dispatch('forums/fetchForums', {ids: category.forums}))
        .then(() => { this.asyncDataStatus_fetched() })
    }
}
</script>

<style>

</style>