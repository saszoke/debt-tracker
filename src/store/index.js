import Vue from "vue";
import Vuex from "vuex";
import db from '../main';
import firebase from 'firebase/app';
Vue.use(Vuex);

let myglobalcounter = 0





export default new Vuex.Store({



  state: {
    ppl: [],
    debts: [],
    lastNameChange: '',
    test_debts: []
  },

  getters: {},

  mutations: {

    resetState () {
      // state.ppl = [],
      // state.debts = [],
      // state.lastNameChange = ''

      // var pagesListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').onSnapshot(()=>{})
      // pagesListener()

      // var debtsListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').doc('5toojopmHYAhJ8E0rIQM').collection('debts').onSnapshot(()=>{})
      // debtsListener()

      // this.stopThemListeners()

    },

    changeDebt: (state,payload)=>{
      console.log(state)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').doc(payload.id).set(
          { amount: payload.current - payload.amount},
          { merge: true }
        );
      })
    },

    removePage: (state,payload) => {
      console.log(state)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then(page=>{
        baseRef.doc(page.docs[0].id).delete();
      })
    },
    addNewPerson: (state,payload) => {
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')

      try{

        baseRef.add({'name' : payload.name, 'imageName': payload.img, 'tempUrl': payload.tempUrl})
        .then(() => console.log(state))
        
      } catch {

        baseRef.add({'name' : payload.name, 'imageName': 'man.jpg', 'tempUrl': 'https://firebasestorage.googleapis.com/v0/b/vue-bank-73d4b.appspot.com/o/man.jpg?alt=media&token=d917b17c-984d-4dca-b676-db2a3a467536'})
        .then(() => console.log(state))

      }

    },
    editPerson: (state, payload)=>{
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      console.log(payload.on)
      baseRef.where("name", "==", payload.on)
      .get()
      .then(
        (page)=>{
          state.lastNameChange = payload.on
          console.log('Sending update request to firebase: ', payload.newName, payload.img, payload.tempUrl)
          console.log(page)
          console.log(page.docs)
          console.log(page.docs[0])
          try{
            baseRef.doc(page.docs[0].id).set(
            { 'name': payload.newName, 'imageName': payload.img, 'tempUrl': payload.tempUrl} // ha space van a végén bebuggol!
            )
          } catch{
            baseRef.doc(page.docs[0].id).set(
              { 'name': payload.newName},
              { merge: true }
              )
          }
        }
      )
    },

    addNewDebt: (state,payload)=>{
      console.log(state)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get().then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').add({ 'amount': payload.amount, 'information': payload.information, 'date': new Date()})
        // .then((x) => {
        //   baseRef.doc(page.docs[0].id).collection('debts').doc(x.id).get()
        //   .then((newly_added)=>{
        //     state.debts.push(
        //       {...newly_added.data(), 'page': page.docs[0].data().name, 'uniqueIdentifier': x.id }
        //     )
        //   })
        // })
        // .catch((err)=> console.log(err))
      })
    },


    removeDebt: (state,payload) => {
      console.log(state)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').doc(payload.id).delete();
        // console.log(state)
      })
    },

    realTimeSetupView: (state) => {
      // person addition bug after login reLogin times 
      // state.ppl = []

      if (myglobalcounter == 0){
        myglobalcounter++

        console.log(':::::::::::::::::', firebase.auth().currentUser.uid)
        const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
        baseRef.onSnapshot(snap =>{
          let personChanges = snap.docChanges();
          console.log(personChanges)
          personChanges.forEach(individualPersonChange=>{
            
            console.log(individualPersonChange)
            if (individualPersonChange.type == 'added'){
              state.ppl.push({'name': individualPersonChange.doc.data().name , 'url': individualPersonChange.doc.data().imageName , 'tempUrl': individualPersonChange.doc.data().tempUrl})
            } 
            
            else if (individualPersonChange.type == 'removed'){
              let pos = state.ppl.map(function(e) { return e.name; }).indexOf(individualPersonChange.doc.data().name);
              state.ppl.splice(pos,1)
            } 
            else if (individualPersonChange.type == 'modified'){
              // state.ppl = state.ppl.filter(someone => someone.name == individualPersonChange.doc.data().name)
              console.log('lastnamechange: ', state.lastNameChange)
              let indexToBeModified = state.ppl.map(function(e) { return e.name; }).indexOf(state.lastNameChange);//state.ppl.indexOf(state.lastNameChange)//state.ppl.find(someone => someone.name == state.lastNameChange)
              state.ppl[indexToBeModified].name = individualPersonChange.doc.data().name
              state.ppl[indexToBeModified].tempUrl = individualPersonChange.doc.data().tempUrl
              state.ppl[indexToBeModified].url = individualPersonChange.doc.data().imageName
              console.log(state.ppl)
              console.log(individualPersonChange.doc.data())
            }
  
            baseRef.where("name", "==", individualPersonChange.doc.data().name).get().then((szemely)=>{
  
              baseRef.doc(szemely.docs[0].id).collection('debts')
              .onSnapshot(snapshot => {
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
                  } else if (change.type == 'modified'){
                    state.debts.forEach((el)=>{
                      if (el.uniqueIdentifier == change.doc.id){
                        el.amount = change.doc.data().amount
                      }
                    })
                  }
                })
                console.log(state.debts)
              })
  
              // stopThemListeners = ()=>{
              //   preDebtSnapshot()
              // }
  
            })//.catch(err => console.log(err))
  
            // var pagesListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').doc('5toojopmHYAhJ8E0rIQM').collection('debts')
            // pagesListener()
          })
        })

      }

      // const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')

      // baseRef.onSnapshot(snap =>{
      //   let personChanges = snap.docChanges();
      //   personChanges.forEach(individualPersonChange=>{
          
      //     if (individualPersonChange.type == 'added'){
      //       state.ppl.push({'name': individualPersonChange.doc.data().name , 'url': individualPersonChange.doc.data().imageName , 'tempUrl': individualPersonChange.doc.data().tempUrl})
      //     } 
          
      //     else if (individualPersonChange.type == 'removed'){
      //       let pos = state.ppl.map(function(e) { return e.name; }).indexOf(individualPersonChange.doc.data().name);
      //       state.ppl.splice(pos,1)
      //     } 
      //     else if (individualPersonChange.type == 'modified'){
      //       // state.ppl = state.ppl.filter(someone => someone.name == individualPersonChange.doc.data().name)
      //       let indexToBeModified = state.ppl.map(function(e) { return e.name; }).indexOf(state.lastNameChange);//state.ppl.indexOf(state.lastNameChange)//state.ppl.find(someone => someone.name == state.lastNameChange)
      //       state.ppl[indexToBeModified].name = individualPersonChange.doc.data().name
      //       state.ppl[indexToBeModified].tempUrl = individualPersonChange.doc.data().tempUrl
      //       state.ppl[indexToBeModified].url = individualPersonChange.doc.data().imageName
      //     }
      //   })
      // })







      // baseRef.doc('5toojopmHYAhJ8E0rIQM').collection('debts').onSnapshot(snapshot => {
      //   let changes = snapshot.docChanges();
      //   changes.forEach(change => {
      //     if (change.type == 'added'){
      //         state.debts.push(
      //           {...change.doc.data(), 'page': 'dinnye', 'uniqueIdentifier': change.doc.id }
      //         )
      //       } else if (change.type == 'removed'){
      //         // let tempArray = state.debts.filter(element => element.uniqueIdentifier == change.doc.id)
      //         // state.debts.splice(state.debts.indexOf(tempArray[0]),1)

      //         state.debts = state.debts.filter(element => element.uniqueIdentifier != change.doc.id)
      //       } else if (change.type == 'modified'){
      //         state.debts.forEach((el)=>{
      //           if (el.uniqueIdentifier == change.doc.id){
      //             el.amount = change.doc.data().amount
      //           }
      //         })
      //       }
      //   })
      // })


  }


  },
  actions: {
    addNewPerson: (context, payload) => {
      setTimeout(function(){
          context.commit('addNewPerson', payload);
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
          console.log(payload)
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
    },

    changeDebt: (context,payload) => {
      setTimeout(() => {
          context.commit('changeDebt', payload)
      }, 100);
    },

    resetState: (context) => {
      setTimeout(() => {
          context.commit('resetState')
      }, 100);
    },
  },
  modules: {},
});



