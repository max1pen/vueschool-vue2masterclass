<template>
  <div class="flex-grid">
        <UserProfileCard 
        v-if="!edit"
            :user="user"
            :userPostsCount="userPostsCount"
            :userThreadsCount="userThreadsCount"
        />

        <UserProfileCardEditor 
        v-else
            :user="user"
            :userPostsCount="userPostsCount"
            :userThreadsCount="userThreadsCount"
        />
          <div class="col-7 push-top">

              <div class="profile-header">
                  <span class="text-lead">
                      {{ user.name }}'s recent activity
                  </span>
                  <a href="#">See only started threads?</a>
              </div>

              <hr>

              <PostList v-if="!userNoPost" :posts="userPosts" />
              <div class="user-no-post" v-else>
                  User haven't post anything yet.
              </div>
          </div>
      </div>
</template>

<script>
import PostList from '@/components/PostList'
import { mapGetters } from 'vuex'

import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
    components: {
        PostList,
        UserProfileCard,
        UserProfileCardEditor
    },
    mixins: [asyncDataStatus],
    data() {
        return {
            userNoPost: false
        }
    },
    props: {
        edit: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/authUser'
        }),
        userThreadsCount() {
            return this.userNoPost ? 0 : this.$store.getters['users/userThreadsCount'](this.user['.key'])
        },

        userPostsCount() {
            return  this.userNoPost? 0 : this.$store.getters['users/userPostsCount'](this.user['.key'])
        },

        userPosts() {
            return this.$store.getters['users/userPosts'](this.user['.key'])
        }
    },
    created() {
        if(this.user.posts == null) {
            this.userNoPost = true
            this.asyncDataStatus_fetched()
        } else {
            this.$store.dispatch('posts/fetchPosts', {ids: this.user.posts})
            .then(() => this.asyncDataStatus_fetched())
        }
    }
}
</script>

<style scoped>
    .user-no-post {
        font-style: italic;
    }
</style>