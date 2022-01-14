import firebase from "firebase"
import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
  
    },

    actions: {
        createPost({ commit, state, rootState}, post) {
            // const postId = 'greatePost' + Math.random() // use code below to generate id from firebase
            const postId = firebase.database().ref('posts').push().key
            post.userId = rootState.auth.authId
            post.publishedAt = Math.floor(Date.now() / 1000)
    
            const updates = {}
            updates[`posts/${postId}`] = post
            updates[`threads/${post.threadId}/posts/${postId}`] = postId
            updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
            updates[`users/${post.userId}/posts/${postId}`] = postId
            firebase.database().ref().update(updates)
            .then(() => {
                // set post
                commit('setItem', {resource: 'posts', item: post, id: postId}, {root: true});
                // add post to thread
                commit('threads/appendPostToThread', {parentId: post.threadId, childId: postId}, {root: true});
                // add contributor to thread
                commit('threads/appendContributorToThread', {parentId: post.threadId, childId: post.userId}, {root: true});            
                // add post to user
                commit('users/appendPostToUser', {parentId: post.userId, childId: postId}, {root: true});
                return Promise.resolve(state.items[postId])
            })
    
            
        },
        updatePost({state, commit, rootState}, {id, text}) {
            return new Promise((resolve, reject) => {
                const post = state.items[id]
                const edited = {
                    at: Math.floor(Date.now() / 10000),
                    by: rootState.auth.authId
                }
               
    
                const updates = {text, edited}
                firebase.database().ref('posts').child(id).update(updates)
                .then(() => {
                    commit('setPost', { postId: id, post: {
                        ...post,
                        text,
                        edited
                    }})
                    resolve(post)
                })
            })
        },
        fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'posts', id}, {root: true}),
        fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'posts', ids}, {root: true}),
    },

    mutations: {
        setPost(state, { post, postId }) {
            Vue.set(state.items, postId, post);
        },
    }
}