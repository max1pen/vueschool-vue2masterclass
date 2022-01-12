import firebase from "firebase"

export default  {
    createPost({ commit, state }, post) {
        // const postId = 'greatePost' + Math.random() // use code below to generate id from firebase
        const postId = firebase.database().ref('posts').push().key
        post.userId = state.authId
        post.publishedAt = Math.floor(Date.now() / 1000)

        const updates = {}
        updates[`posts/${postId}`] = post
        updates[`threads/${post.threadId}/posts/${postId}`] = postId
        updates[`users/${post.userId}/posts/${postId}`] = postId
        firebase.database().ref().update(updates)
        .then(() => {
            // set post
            commit('setItem', {resource: 'posts', item: post, id: postId});

            
            // add post to thread
            commit('appendPostToThread', {parentId: post.threadId, childId: postId});
            // add contributor to thread
            commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId});            
            // add post to user
            commit('appendPostToUser', {parentId: post.userId, childId: postId});
            return Promise.resolve(state.posts[postId])
        })

        
    },

    updatePost({state, commit}, {id, text}) {
        return new Promise((resolve, reject) => {
            const post = state.posts[id]
            const edited = {
                at: Math.floor(Date.now() / 10000),
                by: state.authId
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

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
        return new Promise((resolve, reject) => {
            const threadId = firebase.database().ref('threads').push().key
            const postId = firebase.database().ref('posts').push().key


            const userId = state.authId
            const publishedAt = Math.floor(Date.now() / 1000)
            
            const thread = { title, forumId, publishedAt, userId, firstPostId: postId, posts: {} }
            thread.posts[postId] = postId
            const post = { text, publishedAt, threadId, userId}

            const updates = {}

            updates[`thread/${threadId}`] = thread
            updates[`forums/${forumId}/threads/${threadId}`] = threadId
            updates[`users/${userId}/threads/${threadId}`] = threadId


            updates[`posts/${postId}`] = post
            updates[`users/${userId}/posts/${postId}`] = postId
            firebase.database().ref().update(updates)
            .then(() => {
                // update threads
                commit('setItem', {resource: 'threads', id: threadId, item: thread});
                commit('appendThreadToForum', {parentId: forumId, childId: threadId})
                commit('appendThreadToUser', {parentId: userId, childId: threadId})
                
                // update post
                commit('setItem', {resource: 'posts', item: post, id: postId});
                commit('appendPostToThread', {parentId: post.threadId, childId: postId});
                commit('appendPostToUser', {parentId: post.userId, childId: postId});

                resolve(state.threads[threadId])
                
            })
            

            
        })
    },

    updateThread({state, commit, dispatch}, {title, text, id}) {
        return new Promise((resolve, reject) => {
            const thread = state.threads[id]
            const post = state.posts[thread.firstPostId]
            
            const edited = {
                at: Math.floor(Date.now() / 10000),
                by: state.authId
            }
           

            const updates = {}
            updates[`posts/${thread.firstPostId}/text`] = text
            updates[`posts/${thread.firstPostId}/edited`] = edited
            updates[`threads/${id}/title`] = title
            firebase.database().ref().update(updates)
            .then(() => {
                commit('setThread', {thread: {...thread, title}, threadId: id})
                commit('setPost', { postId: thread.firstPostId, post: {
                    ...post,
                    text,
                    edited
                }})
                resolve(post)
            })
        })
    },

    updateUser({commit}, user) {
        commit('setUser', {userId: user['.key'], user})
    },

    fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'threads', id}),

    fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'threads', ids}),

    fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id}),

    fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'posts', id}),

    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'posts', ids}),

    fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'forums', id}),

    fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'forums', ids}),

    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id}),

    fetchCategories({state, commit}) {
        console.log('Fetching categories...');
        return new Promise((resolve, reject) => {
            firebase.database().ref('categories').once('value', snapshot => {
                const categoriesObject = snapshot.val()
                Object.keys(categoriesObject).forEach(categoryId => {
                    const category = categoriesObject[categoryId]
                    commit('setItem', { resource: 'categories', id: categoryId, item: category})
                })
                resolve(Object.values(state.categories))
            })
        })
    },
    
    fetchItem({state, commit}, {id, resource}) {
        console.log(`Fetch ${resource}...`);
        return new Promise((resolve, reject) => {
            // fetch thread
            firebase.database().ref(resource).child(id).once('value', snapshot => {
                commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
                resolve(state[resource][id])
            })
        })
    },

    fetchItems({dispatch}, {ids, resource}) {
        ids = Array.isArray(ids) ? ids : Object.keys(ids)
        return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource}))) // collect all promises into array
    }
}