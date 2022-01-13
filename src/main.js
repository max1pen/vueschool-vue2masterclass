import Vue from 'vue'
import App from './App.vue'
require('dotenv').config();
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import firebase from "firebase";
require('dotenv').config();
Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAQaZ1EkdpxlMmJrKkw-c_cchtLkKBzqs8",
  authDomain: "mastervue2max.firebaseapp.com",
  projectId: "mastervue2max",
  storageBucket: "mastervue2max.appspot.com",
  messagingSenderId: "91558580007",
  databaseURL: "https://mastervue2max-default-rtdb.firebaseio.com"

  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)



new Vue({
  router,
  store,
  render: h => h(App),
  // beforeCreate() {
  //   store.dispatch('fetchUser', {id: store.state.authId})
  // }
}).$mount('#app')
