<template>
  <div class="d-flex flex-column align-center" ><!-- <div :class="width"> -->
    


    <v-tabs  show-arrows >
      
      <v-tab v-for="someone in ppl" :key="someone.tempUrl">
        <v-icon left >
          mdi-account
        </v-icon>
        {{someone.name}}
      </v-tab>
      




      <v-tab-item v-for="someone in ppl" :key="someone">
        <v-card flat :class="isVertical ? 'd-flex' : 'd-flex flex-column'">
          <v-img
            :src="someone.tempUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :height="dynamicTabStyle"

            :width="dynamicWidth"
          >


          <v-menu
            bottom
            left
            transition="slide-x-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
                top
                absolute
                right
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn 
                      v-on="on"
                      width="100%"
                      >
                      Add New Debt
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
                              :error-messages="amountErrors"
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
                        @click="function(){
                          $v.$reset()
                          dialog = false
                          amount = ''
                          information = ''
                        }"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="function(){
                          $v.$touch()
                          if (!$v.amount.$invalid){
                            if (information.trim() == '') information = 'No information provided'
                            addNewDebt({'on': triggerOn() ,'amount': amount, 'information':information});
                            dialog = false
                            amount = ''
                            information = ''
                            $v.$reset()
                          }
                        }"
                      >
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item>

              <v-list-item>
                <v-dialog
                  v-model="editDialog"
                  max-width="600"
                >
                    <!-- <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:default="dialog"> -->
                    <v-card>
                        <v-toolbar
                        color="success"
                        dark
                        >Edit Person</v-toolbar>
                        <v-card-text>
                            <v-text-field
                                success 
                                label="Nickname"
                                v-model="myinputname"
                                :error-messages="myinputnameErrors"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                        <v-btn
                            text
                            color="green darken-1"
                            @click="()=>{
                                $v.$touch()
                                if (!$v.myinputname.$invalid){
                                    editPerson({on: triggerOn(), newName: myinputname});
                                    editDialog = false
                                    myinputname = ''
                                    $v.$reset()
                                }

                            }"

                        >Apply</v-btn>
                        <v-btn
                            text
                            @click="()=>{
                                editDialog = false
                                myinputname = ''
                                $v.$reset()}"
                        >Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-btn
                  width="100%"
                  @click.stop="editDialog = true"
                >Edit person</v-btn>
              </v-list-item>

              <v-list-item>
                <v-dialog
                  v-model="removeDialog"
                  max-width="300"
                >
                  <v-card>
                    <v-card-title class="text-h5">
                      Remove person card?
                    </v-card-title>

                    <v-card-text>
                      Removing a person card results in losing all the related data to the person, ongoing debts included. Are you sure? 
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="removeDialog = false"
                      >
                        No, cancel
                      </v-btn>

                      <v-btn
                        color="red darken-1"
                        text
                        @click="()=>{
                          removeDialog = false
                          removePage({'on': triggerOn()});
                        }"
                      >
                        Yes, go ahead
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              <v-btn
                width="100%"
                @click.stop="removeDialog = true"
              >Remove person</v-btn>
              </v-list-item>
              <v-list-item>
              <v-btn
                width="100%"
              >View Statistics</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>


          
          </v-img> 
          <v-expansion-panels :style="dynamicStyle">
              <v-expansion-panel v-for="debt in debtsFiltered(someone.name)" :key="debt.id">
                <v-expansion-panel-header class="pa-5 grey--text" color="light-green lighten-5">
                  <div class="d-flex justify-space-between pa-2">
                    <div class="mx-5 green--text font-weight-bold">{{ debt.amount }} HUF</div>
                    <div class="mx-5">{{ debt.date.toDate().getDate() + ' - ' + months[debt.date.toDate().getMonth()] + ' - '  + debt.date.toDate().getFullYear() }}</div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content :id="debt.uniqueIdentifier" class="marker4ID">
                  
                  <v-btn 
                    color="warning" 
                    dark 
                    class="ma-5"
                    >
                    <span class="mr-2">Payback (incomplete)</span>
                    <v-icon>mdi-cash</v-icon>
                  </v-btn>
                  <v-dialog
                  v-model="paybackDialog"
                  max-width="600"
                  >
                    <v-card>
                        <v-toolbar
                        color="success"
                        dark
                        >Complete Payback Confirmation</v-toolbar>

                        <v-card-text class="mt-5">
                          Are you sure the debt has been fully paid back?
                        </v-card-text>

                        <v-card-actions class="justify-end">
                        <v-btn
                            text
                            color="green darken-1"
                            @click="()=>{
                                paybackDialog = false
                                completePayback(eventObj)
                            }"

                        >Absolutely</v-btn>
                        <v-btn
                            text
                            @click="()=>{
                                paybackDialog = false
                                }"
                        >Not sure</v-btn>
                        </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-btn 
                  color="success" 
                  dark 
                  class="ma-5"
                  @click="($event)=>{
                      paybackDialog = true
                      eventObj = $event
                    }"
                  >
                    <span class="mr-2">Complete Payback</span>
                    <v-icon>mdi-cash-check</v-icon>
                  </v-btn>
                  <v-tooltip
                    top
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        v-on="on"
                      >
                        <v-icon color="grey lighten-1">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{debt.information}}</span>
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
import { validationMixin } from 'vuelidate';
import { minValue, required } from 'vuelidate/lib/validators';


export default {
  name: "tabsComponent",
  mixins: [validationMixin],

  validations: {
    amount: { minValue: minValue(10), required  },
    myinputname: { required }
    },

  data: () => ({
      dialog: false,
      amount: '',
      myinputname: '',
      information: '',
      eventObj: {},
      triggerOn: function(){
        return document.querySelector('.v-tab--active').textContent.trim()
      },
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      removeDialog: false,
      editDialog: false,
      paybackDialog: false
    }),

  computed: {



    amountErrors () {
        const errors = []
        if (!this.$v.amount.$dirty) return errors
        !this.$v.amount.minValue && errors.push('Amount is too low.')
        !this.$v.amount.required && errors.push('Field cannot be empty.')
        return errors
    },

    myinputnameErrors(){
        const errors = []
        if (!this.$v.myinputname.$dirty) return errors
        !this.$v.myinputname.required && errors.push('Field cannot be empty.')
        console.log(errors)
        console.log(this.$v.myinputname)
        return errors
    },

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
      'addNewDebt',
      'removeDebt',
      'removePage',
      'editPerson'
    ]),

    debtsFiltered (someone) {
        return this.$store.state.debts.filter(debt => debt.page == someone)
      },

    completePayback(event){
      let toBePassed = {'on': this.triggerOn(), 'id': event.target.closest(".marker4ID").id}
      this.removeDebt(toBePassed)
    }
    
  }
};
</script>

<style>
#tabs{
  max-height: 50vh;
  overflow-y: hidden;
}


</style>