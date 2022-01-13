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

              <PostList :posts="userPosts" />
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
    props: {
        edit: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'authUser'
        }),
        userThreadsCount() {
            return this.$store.getters.userThreadsCount(this.user['.key'])
        },

        userPostsCount() {
            return this.$store.getters.userPostsCount(this.user['.key'])
        },

        userPosts() {
            return this.$store.getters.userPosts(this.user['.key'])
        }
    },
    created() {
        this.$store.dispatch('fetchPosts', {ids: this.user.posts})
        .then(() => this.asyncDataStatus_fetched())
    }
}
</script>

<style>

</style>