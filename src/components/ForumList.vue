<template>
  <div>
            <ForumListitem 
            v-for="forum in forums"
            :forum="forum"
            :key="forum['.key']"
            />
          </div>
</template>

<script>
import ForumListitem from './ForumListitem.vue'

export default {
    components: {
        ForumListitem
    },
    props: {
        forums: {
            required: true,
            type: Array
        }
    }
}
</script>

<style>

</style>