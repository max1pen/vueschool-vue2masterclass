<template>
      <div v-if="post && user" class="post">

                  <div class="user-info">
                      <a href="profile.html#profile-details" class="user-name">
                        {{ user.name}}
                      </a>

                      <a href="profile.html#profile-details">
                          <img class="avatar-large" :src="user.avatar" alt="">
                      </a>

                      <p class="desktop-only text-small">{{ userThreadsCount }} threads</p>
                      <p class="desktop-only text-small">{{ userPostCount }} posts</p>


                  </div>

                  <div class="post-content">
                    <template v-if="!editing">
                        <div v-if="!editing">
                            {{ post.text}}
                        </div>
                        <a @click.prevent="editing = true" href="#" style="margin-left: auto" class="link-unstyled" title="Make a change">
                            <i class="fa fa-pencil"></i>
                        </a>
                    </template>
                    <div v-else>
                        <PostEditor
                            :post="post"
                            @save="editing = false"
                            @cancel="editing = false"
                         />
                    </div>
                  </div>


                <div class="post-date text-faded">
                    <div v-if="post.edited">edited</div>
                    <AppDate
                    :timestamp="post.publishedAt"
                   />
                </div>

              </div>
</template>

<script>
import { countObjectProperties } from '@/utils'
import PostEditor from './PostEditor.vue'

export default {
    props: {
        post: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            editing: false
        }
    },
    components: {
        PostEditor
    },  
    computed: {
        user()  {
            return this.$store.state.users.items[this.post.userId];
        },

        userPostCount() {
            return this.$store.getters['users/userPostsCount'](this.post.userId)
        },

        userThreadsCount() {
            return this.$store.getters['users/userThreadsCount'](this.post.userId)
        },
    }
}
</script>

<style>
</style>