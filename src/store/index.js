import Vue from "vue";
import Vuex from "vuex";
import db from '../main';
import firebase from 'firebase/app';
Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    ppl: [],
    debts: [],


  },

  getters: {},

  mutations: {
    addNewPerson: (state, payload) => {
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.add({'name' : payload.name})
      .then(() => console.log('page added to db'))
      .catch((err)=> console.log(err))


      state.ppl.push(payload.name)
  },
    addNewDebt: (state, payload)=>{

      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get().then((page)=>{
        console.log(firebase.firestore.FieldValue.serverTimestamp())
        baseRef.doc(page.docs[0].id).collection('debts').add({ 'amount': payload.amount, 'information': payload.information, 'date': new Date()})
        .then(() => {
          console.log('debt added to db')
        })
        .catch((err)=> console.log(err))
      })
    },

    removeDebt: (state, payload) => {
      console.log('remove debt called')
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').doc(payload.id).delete();
        // console.log(state)
      })
    },

    realTimeSetupView: (state) => {
      state.ppl = []
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.onSnapshot(snap =>{
        let personChanges = snap.docChanges();
        personChanges.forEach(individualPersonChange=>{
          if (individualPersonChange.type == 'added'){
            state.ppl.push(individualPersonChange.doc.data().name)
          } else if (individualPersonChange.type == 'removed'){
            console.log('a page has been deleted TODO: get page identifier and remove from UI')
          }

          baseRef.where("name", "==", individualPersonChange.doc.data().name).get().then((szemely)=>{
            baseRef.doc(szemely.docs[0].id).collection('debts').onSnapshot(snapshot => {
              let changes = snapshot.docChanges();
              changes.forEach(change => {
                if (change.type == 'added'){
                  state.debts.push(
                    {...change.doc.data(), 'page': individualPersonChange.doc.data().name, 'uniqueIdentifier': change.doc.id }
                  )
                } else if (change.type == 'removed'){
                  state.debts = state.debts.filter(element => element.uniqueIdentifier != change.doc.id)
                }
              })
            })
          })
        })
      })
  }


  },
  actions: {
    addNewPerson: (context, payload) => {
      setTimeout(function(){
          context.commit('addNewPerson', payload);
      }, 100)
  },

    addNewDebt: (context, payload) => {
      setTimeout(function(){
        console.log('before adding new debt')
        context.commit('addNewDebt', payload);
      }, 500)
        
      
    },

    setupView: (context, payload) => {
      setTimeout(function(){
        context.commit('realTimeSetupView', payload);
      }, 100);
    },

    removeDebt: (context, payload) => {
      setTimeout(() => {
        context.commit('removeDebt', payload);
      }, 100);
    }
  },
  modules: {},
});
