import firebase from "firebase"

export default {
    namespaced: true,
    state: {
        authId: null,
        unsubscribeAuthObserver: null
    },

    getters: {
        authUser(state, getters, rootState) {
            return state.authId ? rootState.users.items[state.authId] : null
        },    
    },

    actions: {
        registerUserWithEmailAnadPassword({dispatch}, {email, name, username, password, avatar = null}) {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                return dispatch('users/createUser', {id: user.uid, email, name, username, password, avatar}, {root: true});
            })
            .then(() => dispatch('fetchAuthUser'))
        },
        initAuthentication ({ dispatch, commit, state }) {
            return new Promise((resolve, reject) => {
                // unsubscribe observer if already listening
                if(state.unsubscribeAuthObserver) {
                    state.unsubscribeAuthObserver()
                }
                const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                    console.log('the user has changed')
                    if(user) {
                      dispatch('fetchAuthUser')
                      .then(dbUser => resolve(dbUser))
                    } else {
                        resolve(null)
                    }
                })
                commit('setUnsubscribeAuthObserver', unsubscribe)
            })
        },
        fetchAuthUser({dispatch, commit}) {
            const userId = firebase.auth().currentUser.uid
            return new Promise((resolve, reject) => {
                // check if user exist in the database 
                firebase.database().ref('users').child(userId).once('value', snapshot => {
                    if(snapshot.exists()){
                        return dispatch('users/fetchUser', {id: userId}, {root: true})
                        .then(user => {
                            commit('setAuthId', userId)
                            resolve(user)
                        })
                    } else {
                        resolve(null)
                    }
                })
            })
        },
        signInWithEmailAndPassword(context, { email,password }) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
        },
    
        signOut({commit}) {
            return firebase.auth().signOut()
            .then(() => {
                commit('setAuthId', null)
            })
        },
    
        signInWithGoogle({dispatch}) {
            const provider = new firebase.auth.GoogleAuthProvider()
            return firebase.auth().signInWithPopup(provider)
            .then(data => {
                const user = data.user
                firebase.database().ref('users').child(user.uid).once('value', snapshot => {
                    if(!snapshot.exists()) {
                        return dispatch('users/createUser', {id: user.uid, name: user.displayName, email: user.email, avatar: user.photoURL }, { root: true})
                        .then(() => dispatch('fetchAuthUser'))
                    }
                })
            })
        },
    
    
    },

    mutations: {
        setAuthId(state, id) {
            state.authId = id
        },
    
        setUnsubscribeAuthObserver(state, unsubscribe) {
            state.unsubscribeAuthObserver = unsubscribe
        },
    
    }
}