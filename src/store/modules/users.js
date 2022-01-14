import firebase from "firebase"
import Vue from 'vue'
import { removeEmptyProperties, countObjectProperties } from '@/utils'
import {makeAppendChildToParentMutation} from '@/store/assetHelpers'

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        userPosts: (state, getters, rootState) => id => {
            const user = state.items[id]
            if(user.posts) {
                return Object.values(rootState.posts.items)
                .filter(post => post.userId === id)
            }
            return []
        },
        userPostsCount: state => id  => countObjectProperties(state.items[id].posts),
        userThreadsCount: state => id  => countObjectProperties(state.items[id].threads),
    },

    actions: {
        

        createUser({state, commit}, {id, email, name, username, avatar = null}) {
            return new Promise((resolve, reject) => {
                const registeredAt = Math.floor(Date.now() / 10000)
                username = username == null ? email : username // add this line prevent error, if Signin from Google, it doesn't has username so you email instead
                const usernameLower = username.toLowerCase()
                email = email.toLowerCase()
                const user = { avatar, email, name, username, usernameLower, registeredAt }
                firebase.database().ref('users').child(id).set(user)
                .then(() => {
                    commit('setItem', { resource: 'users', id: id, item: user}, {root: true})
                    resolve(state.items[id])
                })
            })
        },
        updateUser({commit}, user) {
            const updates = {
                avatar: user.avatar,
                username: user.username,
                name: user.name,
                bio: user.bio,
                website: user.website,
                email: user.email,
                location: user.location
            }
            return new Promise((resolve, reject) => {
                firebase.database().ref('users').child(user['.key']).update(removeEmptyProperties(updates)) // remove empty properties to avoid sending update property with empty data
                .then(() => {
                    commit('setUser', {userId: user['.key'], user})
                    resolve(user)
                })
            })
        },
        fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id}, {root: true}),
        fetchUsers: ({dispatch}, {id}) => dispatch('fetchItems', {resource: 'users', id}, {root: true}),
    },

    mutations: {
        setUser(state, { user, userId }) {
            Vue.set(state.items, userId, user);
        },
        appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}, {root: true}),
        appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'}, {root: true}),    
    }
}