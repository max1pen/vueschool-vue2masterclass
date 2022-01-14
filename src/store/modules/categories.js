import firebase from "firebase"

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
  
    },

    actions: {
        fetchAllCategories ({state, commit}) {
          console.log('Fetching all categories...')
          return new Promise((resolve, reject) => {
            firebase.database().ref('categories').once('value', snapshot => {
              const categoriesObject = snapshot.val()
              Object.keys(categoriesObject).forEach(categoryId => {
                const category = categoriesObject[categoryId]
                commit('setItem', {resource: 'categories', id: categoryId, item: category}, {root: true})
              })
              resolve(Object.values(state.items))
            })
          })
        },    
        fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id}, {root: true}),
        fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', ids}, {root: true}),
       
    },

    mutations: {

    }
}