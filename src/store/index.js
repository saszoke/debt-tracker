import Vue from "vue";
import Vuex from "vuex";
import db from '../main';
import firebase from 'firebase/app';
Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    ppl: [],
    debts: [],
    lastNameChange: ''


  },

  getters: {},

  mutations: {

    removePage: (state,payload) => {
      console.log('processing delete of ' + payload.on)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then(page=>{
        baseRef.doc(page.docs[0].id).delete();
        // console.log(page)
      })
    },
    addNewPerson: (state, payload) => {
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.add({'name' : payload.name})
      .then(() => console.log('page added to db' + state))
      .catch((err)=> console.log(err))

    },
    editPerson: (state, payload)=>{
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then(
        (page)=>{
          state.lastNameChange = payload.on
          // console.log('még az editben vagyunk '+ state.lastNameChange)
          baseRef.doc(page.docs[0].id).set(
            { 'name': payload.newName }
          )
        }
      )
    },

    addNewDebt: (state, payload)=>{

      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get().then((page)=>{
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
          // console.log(individualPersonChange.doc.)
          if (individualPersonChange.type == 'added'){
            state.ppl.push(individualPersonChange.doc.data().name)
          } 
          
          else if (individualPersonChange.type == 'removed'){
            state.ppl.splice(state.ppl.indexOf(individualPersonChange.doc.data().name),1)
          } 
          else if (individualPersonChange.type == 'modified'){
            // state.ppl = state.ppl.filter(someone => someone.name == individualPersonChange.doc.data().name)
            
            let indexToBeModified = state.ppl.indexOf(state.lastNameChange)//state.ppl.find(someone => someone.name == state.lastNameChange)
            state.ppl[indexToBeModified] = individualPersonChange.doc.data().name
            console.log(state.ppl)
            state.ppl.push('foo')  // WORKAROUND
            state.ppl.pop()       // másképpen az UI nem érzékeli a state változást, érdekes, hogy logban látja
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
                  // let tempArray = state.debts.filter(element => element.uniqueIdentifier == change.doc.id)
                  // state.debts.splice(state.debts.indexOf(tempArray[0]),1)

                  state.debts = state.debts.filter(element => element.uniqueIdentifier != change.doc.id)

                  
                }
              })
            })
          }).catch() // <<<--------------------------------------------------------------------------------------------------- TROUBLESHOOTNAK 
        })
      })
  }


  },
  actions: {
    addNewPerson: (context, payload) => {
      setTimeout(function(){
          context.commit('addNewPerson', payload);
          // console.log(context,payload)
      }, 100)
    },

    editPerson: (context, payload) => {
      setTimeout(() => {
        console.log('person being editted')
        context.commit('editPerson', payload);
      }, 100);
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
    },
    removePage: (context, payload) => {
      setTimeout(() => {
        context.commit('removePage', payload);
      }, 100);
    }

  },
  modules: {},
});
