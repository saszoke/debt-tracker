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

  getters: {
    getPersonsDebts(state){
      // return () => {
      //   return state.debts.filter(debt=>{debt.page == 'kriszti'})
      // return state.debts
      // }
      return state.debts.filter(debt=>{debt.page == 'kriszti'})
    }
    },

  mutations: {
    addNewPerson: (state, payload) => {
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.add({'name' : payload.name})
      .then(() => console.log('page added to db'))
      .catch((err)=> console.log(err))


      state.ppl.push(payload.name)
  },
    addNewDebt: (state, payload)=>{
      state.debts.push(
        { page: payload.on, id: 11, date: new firebase.firestore.Timestamp.fromDate(new Date()), amount: payload.amount, info: payload.information}
      )

      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get().then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').add({ 'amount': payload.amount, 'information': payload.information, 'date': firebase.firestore.FieldValue.serverTimestamp()})
        .then(() => console.log('debt added to db'))
        .catch((err)=> console.log(err))
      })
    },
    setupView: (state) => {
      state.ppl = []
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.get()
      .then(pages => {
        pages.forEach((page)=> {
          state.ppl.push(page.data().name)
          baseRef.where("name", "==", page.data().name).get().then((szemely)=>{
            baseRef.doc(szemely.docs[0].id).collection('debts').get()
            .then((debts)=>{
              debts.forEach((debt)=>{
                state.debts.push(
                  {...debt.data(), 'page': page.data().name }
                )
                
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
      }, 100);
  },

    addNewDebt: (context, payload) => {
      setTimeout(function(){
        context.commit('addNewDebt', payload);
      }, 100);
    },

    setupView: (context, payload) => {
      setTimeout(function(){
        context.commit('setupView', payload);
      }, 100);
    }
  },
  modules: {},
});
