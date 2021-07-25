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
              <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn 
                    v-on="on"
                    absolute 
                    bottom 
                    right 
                    class="ma-5"
                    >
                    Add
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        <v-col cols="12">
                          <v-text-field
                            v-model="amount"
                            label="Amount"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                              v-model="information"
                              label="Information"
                              
                            ></v-text-field>
                          </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="function(){
                        addNewDebt({'amount': amount, 'information':information});
                        dialog = false 
                      }"
                    >
                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          
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
import {mapActions} from 'vuex';
export default {
  name: "tabsComponent",

  data: () => ({
      dialog: false,
      amount: 0,
      information: ''
    }),

  computed: {

    ppl(){
      return this.$store.state.ppl;
    },

    debts(){
      return this.$store.state.debts;
    },

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

  methods: {
    ...mapActions([
      'addNewDebt'
    ])
  }
};
</script>

<style>
#tabs{
  max-height: 50vh;
  overflow-y: hidden;
}


</style>