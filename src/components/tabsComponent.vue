<template>
  <div class="d-flex flex-column align-center" ><!-- <div :class="width"> -->
    


    <v-tabs  show-arrows >
      
      <v-tab v-for="someone in ppl" :key="someone.uniqueIdentifier">
        <v-icon left >
          mdi-account
        </v-icon>
        {{someone.name}}
      </v-tab>
      




      <v-tab-item v-for="someone in ppl" :key="someone.uniqueIdentifier">
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
                <v-btn 
                  @click="showAddDebtDialogComponent = true"
                  width="100%"
                  >
                  Add New Debt
                </v-btn>
              </v-list-item>

              <v-list-item>
                <v-btn
                  width="100%"
                  @click="showEditDialogComponent = true"
                >Edit person</v-btn>
              </v-list-item>

              <v-list-item>
                <v-btn
                  width="100%"
                  @click="showRemoveDialogComponent = true"
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
                    <div class="mx-5 green--text font-weight-bold marker4AMT" :mySecret="'id'+debt.uniqueIdentifier">{{ debt.amount }} HUF</div>
                    <div class="mx-5">{{ debt.date.toDate().getDate() + ' - ' + months[debt.date.toDate().getMonth()] + ' - '  + debt.date.toDate().getFullYear() }}</div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content :id="'id'+debt.uniqueIdentifier" class="marker4ID">
                  
                  <v-btn 
                    color="warning" 
                    dark 
                    class="ma-5"
                    @click="($event)=>{
                        removeDebtIncompleteDialogComponent = true
                        eventObj = $event
                      }"
                    >
                    <span class="mr-2">Payback (incomplete)</span>
                    <v-icon>mdi-cash</v-icon>
                  </v-btn>
                  
                    
                  <v-btn 
                  color="success" 
                  dark 
                  class="ma-5"
                  @click="($event)=>{
                      removeDebtCompleteDialogComponent = true
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
    <!-- DIALOGS -->
      <!-- PAYBACKDIALOG START-->
      <remove-debt-complete-dialog-component :visible="removeDebtCompleteDialogComponent" :eventObj="eventObj" @close="removeDebtCompleteDialogComponent=false"/>
      <!-- PAYBACKDIALOG END-->

      <!-- INCOMPLETEDIALOG START-->
      <remove-debt-incomplete-dialog-component :visible="removeDebtIncompleteDialogComponent" :eventObj="eventObj" @close="removeDebtIncompleteDialogComponent=false"/>
      <!-- INCOMPLETEDIALOG END-->

      <!-- EDITDIALOG START-->
      <edit-dialog-component :visible="showEditDialogComponent"  @close="showEditDialogComponent=false"/>
      <!-- EDITDIALOG END-->

      <!-- REMOVEDIALOG START -->
      <remove-dialog-component :visible="showRemoveDialogComponent"  @close="showRemoveDialogComponent=false" @delete="removePage({'on': triggerOn()});"/>
      <!-- REMOVEDIALOG END -->

      <!-- DEBTDIALOG START -->
      <add-debt-dialog-component :visible="showAddDebtDialogComponent"  @close="showAddDebtDialogComponent=false"/>
      <!-- DEBTDIALOG END -->
    <!-- DIALOGS END-->
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import removeDialogComponent from './dialogs/removeDialogComponent.vue';
import editDialogComponent from './dialogs/editDialogComponent.vue';
import addDebtDialogComponent from './dialogs/addDebtDialogComponent.vue';
import removeDebtCompleteDialogComponent from './dialogs/removeDebtCompleteDialogComponent.vue';
import removeDebtIncompleteDialogComponent from './dialogs/removeDebtIncompleteDialogComponent.vue';

export default {
  components: { removeDialogComponent, editDialogComponent, addDebtDialogComponent, removeDebtCompleteDialogComponent, removeDebtIncompleteDialogComponent },
  name: "tabsComponent",
  mixins: [validationMixin],

  validations: {
    myinputname: { required },

    },

  data: () => ({
      debtDialog: false,
      amount: '',
      myinputname: '',
      incompletePaybackAmount: '',
      information: '',
      eventObj: {},
      triggerOn: function(){
        console.log(document.querySelector('.v-tab--active').textContent.trim())
        return document.querySelector('.v-tab--active').textContent.trim()
      },
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      editDialog: false,
      paybackDialog: false,
      incompletePaybackDialog: false,
      rules: [
              value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
            ],
      imgData: null,
      picture: null,
      filename: null,
      showRemoveDialogComponent: false,
      showEditDialogComponent: false,
      showAddDebtDialogComponent: false,
      removeDebtCompleteDialogComponent: false,
      removeDebtIncompleteDialogComponent: false,
    }),


  computed: {
    myinputnameErrors(){
        const errors = []
        if (!this.$v.myinputname.$dirty) return errors
        !this.$v.myinputname.required && errors.push('Field cannot be empty.')
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
      return 'height: 100%; max-height: 70vh; overflow-y: auto'
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
      'removePage',
    ]),

    debtsFiltered (someone) {
        return this.$store.state.debts.filter(debt => debt.page == someone)
      },




    
  }
};
</script>

<style>
#tabs{
  max-height: 50vh;
  overflow-y: hidden;
}


</style>