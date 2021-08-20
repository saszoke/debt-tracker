import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import 'firebase/firestore';


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

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });


Vue.config.productionTip = false;

  let app;
  firebase.auth().onAuthStateChanged(() => {
    // console.log(user.metadata.lastSignInTime)
    
    // console.log(user.metadata.lastSignInTime)
    // console.log(user.metadata.lastSignInTime)
    // console.log(user.metadata.lastSignInTime)
    if (!app){
      app = new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
      }).$mount("#app");
    }
    
  })

  // const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
  // baseRef.onSnapshot(snap =>{
  //   let personChanges = snap.docChanges();
  //   personChanges.forEach(individualPersonChange=>{
      
  //     if (individualPersonChange.type == 'added'){
  //       console.log('from main js: added type')
  //     } 
      
  //     else if (individualPersonChange.type == 'removed'){
  //       console.log('from main js: removed type')
  //     } 
  //     else if (individualPersonChange.type == 'modified'){
  //       console.log('from main js: modified type')
  //     }

  //     baseRef.where("name", "==", individualPersonChange.doc.data().name).get().then((szemely)=>{
  //       baseRef.doc(szemely.docs[0].id).collection('debts').onSnapshot(snapshot => {
  //         let changes = snapshot.docChanges();
  //         changes.forEach(change => {
  //           if (change.type == 'added'){
  //             console.log('from main js: added type ON DEBT')
  //           } else if (change.type == 'removed'){
  //             console.log('from main js: removed type ON DEBT')

  //           } else if (change.type == 'modified'){
  //             console.log('from main js: modified type ON DEBT')
  //           }
  //         })
  //       })
  //     }).catch(err => console.log(err)) // <<<--------------------------------------------------------------------------------------------------- TROUBLESHOOTNAK 
  //   })
  // })

export default db;