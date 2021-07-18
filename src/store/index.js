import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ppl: ["Livi", "Kriszti", "Lali"],
    debts: [
      { id: 1, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 2, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 3, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 4, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 5, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 6, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 7, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 8, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 9, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 10, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
    ]
  },
  mutations: {
    addNewPerson: (state, payload) => {
      state.ppl.push(payload)
  },
    addNewDebt: (state, payload, payload2)=>{
      console.log(payload, payload2)
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
