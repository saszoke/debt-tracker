import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ppl: ["Livi", "Kriszti", "Lali"],
    debts: []
  },
  mutations: {
    addNewPerson: (state, payload) => {
      state.ppl.push(payload)
  },
    addNewDebt: (state, payload)=>{
      console.log(payload)
      state.debts.push(
        { id: 11, date: "07/18/2021", amount: payload.amount, info: payload.information}
      )
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
    }
  },
  modules: {},
});
