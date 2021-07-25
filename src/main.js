import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";


var firebaseConfig = {
  apiKey: "AIzaSyDIPEkSrUvoBMvdbHvTN5yYVAV2DnY5EB0",
  authDomain: "vue-bank-73d4b.firebaseapp.com",
  projectId: "vue-bank-73d4b",
  storageBucket: "vue-bank-73d4b.appspot.com",
  messagingSenderId: "456695215183",
  appId: "1:456695215183:web:fd8f40ab31a889349da63a",
  measurementId: "G-2KL0906DZB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false;

  let app;
  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (!app){
      app = new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
      }).$mount("#app");
    }
  })


