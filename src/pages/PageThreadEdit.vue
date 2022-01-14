<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

          <h1>Editing <i>{{ thread.title }} </i></h1>
        <ThreadEditor
        :title="thread.title"
        :text="text"
        @save="save"
        @cancel="cancel" />
      </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
    components: {
        ThreadEditor
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    mixins: [asyncDataStatus],
    computed: {
        thread() {
            return this.$store.state.threads.items[this.id]
        },

        text() {
            const post = this.$store.state.posts.items[this.thread.firstPostId]
            return post ? post.text : null
        }
    },
    methods: {
        save({title, text}) {
            this.$store.dispatch('threads/updateThread', {
                id: this.id,
                title,
                text
            }).then(thread => {
                this.$router.push({name: 'ThreadShow', params: {id: this.id}})
            })
        },
        cancel() {
            this.$router.push({name: 'ThreadShow', params: {id: this.id}})
        }
    },

    created() {
        this.$store.dispatch('threads/fetchThread', {id: this.id})
        .then(thread => {
            this.$store.dispatch('posts/fetchPost', {id: thread.firstPostId})
        })
        .then(()=> { this.asyncDataStatus_fetched() })
    }
}
</script>

<style>

</style>