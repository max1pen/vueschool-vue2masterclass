
import firebase from "firebase"

export default  {
    fetchItem({state, commit}, {id, resource}) {
        console.log(`Fetch ${resource}...`)
        return new Promise((resolve, reject) => {
            // fetch thread
            firebase.database().ref(resource).child(id).once('value', snapshot => {
                commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
                resolve(state[resource].items[id])
            })
        })
    },

    fetchItems({dispatch}, {ids, resource}) {
        ids = Array.isArray(ids) ? ids : Object.keys(ids)
        return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource}))) // collect all promises into array
    }
}