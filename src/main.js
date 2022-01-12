import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import firebase from "firebase";

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAQaZ1EkdpxlMmJrKkw-c_cchtLkKBzqs8",
  authDomain: "mastervue2max.firebaseapp.com",
  projectId: "mastervue2max",
  storageBucket: "mastervue2max.appspot.com",
  messagingSenderId: "91558580007",
  appId: "1:91558580007:web:ad0613854551c0ea166302",
  databaseURL: "https://mastervue2max-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
