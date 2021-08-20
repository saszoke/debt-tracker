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

    resetState (state) {
      // console.log("STATE has been reset")
      // state.ppl = [],
      // state.debts = [],
      // state.lastNameChange = ''
      // console.log('HERE COMES THE STATE AFTER RESET')
      console.log(state)

      // console.log('STOPPING LISTENERS')
      // var pagesListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').onSnapshot(()=>{})
      // pagesListener()

      // var debtsListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').doc('5toojopmHYAhJ8E0rIQM').collection('debts').onSnapshot(()=>{})
      // debtsListener()
      // console.log('DONE STOPPING LISTENERS')

      // this.stopThemListeners()

    },

    changeDebt: (state, payload)=>{
      console.log('processing delete of ' + payload.on)
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get()
      .then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').doc(payload.id).set(
          { amount: payload.current - payload.amount},
          { merge: true }
        );
        let eredmeny = payload.current - payload.amount
        console.log(payload.current + ' - ' + payload.amount +' = '+ eredmeny)
      })
    },

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
      baseRef.add({'name' : payload.name, 'imageName': payload.img, 'tempUrl': payload.tempUrl})
      .then(() => console.log(state))
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
            { 'name': payload.newName, 'imageName': payload.img, 'tempUrl': payload.tempUrl}
          )
        }
      )
    },

    addNewDebt: (state, payload)=>{
      console.log('ADD NEW DEBT CALLED ----------------------')
      console.log(payload)
      console.log('-------------------------------------------')
      const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
      baseRef.where("name", "==", payload.on)
      .get().then((page)=>{
        baseRef.doc(page.docs[0].id).collection('debts').add({ 'amount': payload.amount, 'information': payload.information, 'date': new Date()})
        // .then((x) => {
        //   console.log(x.id)
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
      // person addition bug after login reLogin times 
      // state.ppl = []

      if (myglobalcounter == 0){
        console.log('INITIALIZING REAL TIME LISTENER')
        myglobalcounter++
        const baseRef = db.collection('usersdata').doc(firebase.auth().currentUser.uid).collection('pages')
        baseRef.onSnapshot(snap =>{
          let personChanges = snap.docChanges();
          console.log('HERE COMES THE PERSON CHANGES')
          console.log(personChanges)
          personChanges.forEach(individualPersonChange=>{
            
            console.log('HERE COMES THE INDIVIDUAL PERSON CHANGE')
            console.log(individualPersonChange)
            if (individualPersonChange.type == 'added'){
              state.ppl.push({'name': individualPersonChange.doc.data().name , 'url': individualPersonChange.doc.data().imageName , 'tempUrl': individualPersonChange.doc.data().tempUrl})
              console.log('PERSON ADDED!!')
            } 
            
            else if (individualPersonChange.type == 'removed'){
              let pos = state.ppl.map(function(e) { return e.name; }).indexOf(individualPersonChange.doc.data().name);
              state.ppl.splice(pos,1)
            } 
            else if (individualPersonChange.type == 'modified'){
              console.log('PERSON MODIFIED!!')
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
                console.log('CHANGES: ',changes)
                changes.forEach(change => {
                  console.log('CHANGE: ',change)
                  console.log('CHANGE TYPE: ',change.type)
                  if (change.type == 'added'){
                    console.log('DEBT ADDED TO STATE: ', change.doc.data().amount)
                    state.debts.push(
                      {...change.doc.data(), 'page': individualPersonChange.doc.data().name, 'uniqueIdentifier': change.doc.id }
                    )
                  } else if (change.type == 'removed'){
                    // let tempArray = state.debts.filter(element => element.uniqueIdentifier == change.doc.id)
                    // state.debts.splice(state.debts.indexOf(tempArray[0]),1)
  
                    state.debts = state.debts.filter(element => element.uniqueIdentifier != change.doc.id)
                  } else if (change.type == 'modified'){
                    console.log('DEBT CHANGED!!')
                    state.debts.forEach((el)=>{
                      if (el.uniqueIdentifier == change.doc.id){
                        console.log("OLD VALUE: " + el.amount)
                        console.log("NEW VALUE: " + change.doc.data().amount)
                        console.log("UNIQUE ID: " + change.doc.id)
                        el.amount = change.doc.data().amount
                      }
                    })
                  }
                })
                console.log(state.debts)
              })
  
              // stopThemListeners = ()=>{
              //   console.log('STOPPING DEBT LISTENER')
              //   preDebtSnapshot()
              //   console.log('DONE STOPPING DEBT LISTENER')
              // }
  
            })//.catch(err => console.log(err)) // <<<--------------------------------------------------------------------------------------------------- TROUBLESHOOTNAK 
  
            // console.log('STOPPING LISTENER')
            // var pagesListener = db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').doc('5toojopmHYAhJ8E0rIQM').collection('debts')
            // pagesListener()
            // console.log('DONE STOPPING LISTENER')
          })
        })

      } else {
        console.log('REAL TIME LISTENER IS NOT INITIALIZED, BECAUSE IT ALREADY EXISTS')
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



      // FOR DEBTS
      // let x = baseRef.doc('5toojopmHYAhJ8E0rIQM').get()
      // x.then((y)=>{
      //   console.log(y.data())
      //   state.ppl.push({'name': y.data().name , 'url': y.data().imageName , 'tempUrl': y.data().tempUrl})
      //   baseRef.doc('5toojopmHYAhJ8E0rIQM').collection('debts').get().then((docsRef)=>{
      //     docsRef.forEach((zzz)=>{ /// zzz = egy doc a collectionben
      //       console.log(zzz.id)
      //       console.log(zzz.data())
      //       state.debts.push(
      //         {...zzz.data(), 'page': 'dinnye', 'uniqueIdentifier': zzz.id }
      //       )
      //     })
      //   })
      // })



      // baseRef.doc('5toojopmHYAhJ8E0rIQM').collection('debts').onSnapshot(snapshot => {
      //   let changes = snapshot.docChanges();
      //   changes.forEach(change => {
      //     if (change.type == 'added'){
      //         console.log('DEBT ADDED TO STATE: ', change.doc.data().amount)
      //         state.debts.push(
      //           {...change.doc.data(), 'page': 'dinnye', 'uniqueIdentifier': change.doc.id }
      //         )
      //       } else if (change.type == 'removed'){
      //         // let tempArray = state.debts.filter(element => element.uniqueIdentifier == change.doc.id)
      //         // state.debts.splice(state.debts.indexOf(tempArray[0]),1)

      //         state.debts = state.debts.filter(element => element.uniqueIdentifier != change.doc.id)
      //       } else if (change.type == 'modified'){
      //         console.log('DEBT CHANGED!!')
      //         state.debts.forEach((el)=>{
      //           if (el.uniqueIdentifier == change.doc.id){
      //             console.log("OLD VALUE: " + el.amount)
      //             console.log("NEW VALUE: " + change.doc.data().amount)
      //             console.log("UNIQUE ID: " + change.doc.id)
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
          console.log(context,payload)
      }, 100)
    },

    editPerson: (context, payload) => {
      setTimeout(() => {
        console.log('person being editted')
          console.log(context,payload)
          context.commit('editPerson', payload);
      }, 100);
    },

    addNewDebt: (context, payload) => {
      setTimeout(function(){
        console.log('before adding new debt')
          console.log(context,payload)
          context.commit('addNewDebt', payload);
      }, 500)
        
      
    },

    setupView: (context, payload) => {
      setTimeout(function(){
        // if (myglobalcounter == 0){
          console.log(context,payload)
          context.commit('realTimeSetupView', payload);
        // }
      }, 100);
    },

    removeDebt: (context, payload) => {
      setTimeout(() => {
          console.log(context,payload)
          context.commit('removeDebt', payload);
      }, 100);
    },
    removePage: (context, payload) => {
      console.log(payload)
      setTimeout(() => {
          console.log(context,payload)
          context.commit('removePage', payload);
      }, 100);
    },

    changeDebt: (context,payload) => {
      setTimeout(() => {
          console.log(context,payload)
          context.commit('changeDebt', payload)
      }, 100);
    },

    resetState: (context) => {
      setTimeout(() => {
          console.log(context)
          context.commit('resetState')
        console.log(context)
      }, 100);
    },

    // bindDebtRef: firestoreAction(context => {
    //   return context.bindFirestoreRef('test_debts', db.collection('usersdata').doc('0F1Af0i1BAME1KWMAieU3En63CU2').collection('pages').doc('5toojopmHYAhJ8E0rIQM').collection('debts'))
    // })

  },
  modules: {},
});



