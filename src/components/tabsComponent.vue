<template>
  <div class="d-flex flex-column align-center" ><!-- <div :class="width"> -->
    


    <v-tabs  show-arrows >
      
      <v-tab v-for="someone in ppl" :key="someone">
        <v-icon left >
          mdi-account
        </v-icon>
        {{someone}}
      </v-tab>
      




      <v-tab-item v-for="someone in ppl" :key="someone">
        <v-card flat :class="isVertical ? 'd-flex' : 'd-flex flex-column'">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :height="dynamicTabStyle"

            :width="dynamicWidth"
          >
          <v-btn absolute top class="ma-5" @click="ppl.push('Marci')">New</v-btn>
          </v-img> 
          <v-expansion-panels :style="dynamicStyle">
              <v-expansion-panel v-for="debt in debts" :key="debt.id">
                <v-expansion-panel-header class="pa-5 grey--text" color="light-green lighten-5">
                  <div class="d-flex justify-space-between pa-2">
                    <div class="mx-5 green--text font-weight-bold">{{ debt.amount }} HUF</div>
                    <div class="mx-5">{{ debt.date }}</div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  
                  <v-btn color="warning" dark class="ma-5">
                    <span class="mr-2">Payback (incomplete)</span>
                    <v-icon>mdi-cash</v-icon>
                  </v-btn>

                  <v-btn color="success" dark class="ma-5">
                    <span class="mr-2">Complete Payback</span>
                    <v-icon>mdi-cash-check</v-icon>
                  </v-btn>
                  <v-tooltip
                    v-model="show"
                    top
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="grey lighten-1">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{debt.info}}</span>
                  </v-tooltip>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
      </v-tab-item>
      
    </v-tabs>
    
  </div>
</template>

<script>
export default {
  name: "tabsComponent",

  data: () => ({
    mylist: ["light-green lighten-1", "light-green lighten-2", "light-green lighten-3", "light-green lighten-4", "light-green lighten-5"],
    ppl: ["Livi", "Kriszti", "Lali"],
    debts: [
      { id: 1, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 2, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 3, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 4, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 5, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
            { id: 1, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 2, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 3, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 4, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 5, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
    ],
    model: 0,

  }),
  computed: {
    isVertical () {
        switch (this.$vuetify.breakpoint.name) { //$vuetify.breakpoint.xs ? '' : 'too-big'
          case 'xs': return false
          case 'sm': return false
          case 'md': return true
          case 'lg': return true
          case 'xl': return true
        }
        return ""
      },
    dynamicWidth () {
      switch (this.$vuetify.breakpoint.name) { //$vuetify.breakpoint.xs ? '' : 'too-big'
          case 'xs': return ''
          case 'sm': return ''
          case 'md': return '400'
          case 'lg': return '600'
          case 'xl': return '800'
        }
        return ""
    },

    dynamicHeight () {
      switch (this.$vuetify.breakpoint.name) { //$vuetify.breakpoint.xs ? '' : 'too-big'
          case 'xs': return ''
          case 'sm': return ''
          case 'md': return '200'
          case 'lg': return '400'
          case 'xl': return '600'
        }
        return ""
    },

    dynamicStyle(){
      // if (this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm') return 'max-height: 50vh; overflow-y: auto'
      return 'max-height: 70vh; overflow-y: auto'
    },
    dynamicTabStyle(){
      switch (this.$vuetify.breakpoint.name) { //$vuetify.breakpoint.xs ? '' : 'too-big'
          case 'xs': return ''
          case 'sm': return ''
          case 'md': return '70vh'
          case 'lg': return '70vh'
          case 'xl': return '70vh'
        }
      return 'max-height: 65vh'
    }
  },

  watch: {},
};
</script>

<style>
#tabs{
  max-height: 50vh;
  overflow-y: hidden;
}


</style>