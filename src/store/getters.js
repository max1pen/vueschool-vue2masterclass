import { countObjectProperties } from '@/utils'

export default {
    authUser(state) {
        return state.users[state.authId]
    },
    // userPostsCount(state) {
    //     return function(id) {
    //         const user = state.users[id]
    //         return countObjectProperties(user.posts)
    //     }
    // }, // user arrow function below instead of this
    userPostsCount: state => id  => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => id  => countObjectProperties(state.users[id].threads),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1
}