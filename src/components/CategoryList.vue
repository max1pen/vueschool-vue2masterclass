<template>
    <div>
        <CategoryListitem
        v-for="category in categories"
        :category="category"
        :key="category['.key']"
        />
    </div>
</template>

<script>
import CategoryListitem from './CategoryListItem.vue'

export default {
    components: {
        CategoryListitem
    },
    props: {
        categories: {
            required: true,
            type: Array
        }
    }
}
</script>

<style>

</style>