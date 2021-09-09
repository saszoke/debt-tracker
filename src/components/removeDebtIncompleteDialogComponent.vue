<template>
    <v-dialog
        v-model="show"
        max-width="600"
    >
    <v-card>
        <v-toolbar
        color="success"
        dark
        >Payback Confirmation</v-toolbar>

        <v-card-text class="mt-5">
            Please enter the amount that has been paid back.
        </v-card-text>
        <v-text-field
                class="mx-5"
                v-model="incompletePaybackAmount"
                label="Amount"
                :error-messages="incompletePaybackAmountErrors"
        ></v-text-field>

        <v-card-actions class="justify-end">
        <v-btn
            text
            color="green darken-1"
            @click="()=>{
                
                $v.$touch()
                if (!$v.incompletePaybackAmount.$invalid){
                    show = false
                    incompletePayback(eventObj)
                    incompletePaybackAmount = ''
                    $v.$reset()
                }
            }"

        >Confirm</v-btn>
        <v-btn
            text
            @click="()=>{
                show = false
                incompletePaybackAmount = ''
                }"
        >Cancel</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>



<script>
import {mapActions} from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
    props: ['visible', 'eventObj'],
    mixins: [validationMixin],

    validations: {
        incompletePaybackAmount: { required }
        },
    data: ()=>{
        return {
            triggerOn: function(){
                return document.querySelector('.v-tab--active').textContent.trim()
            },
            incompletePaybackAmount: '',
        }
    },
    computed: {
        incompletePaybackAmountErrors(){
            const errors = []
            if (!this.$v.incompletePaybackAmount.$dirty) return errors
            !this.$v.incompletePaybackAmount.required && errors.push('Field cannot be empty.')
            return errors
        },
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    },

    methods: {
        ...mapActions([
            'changeDebt', // 0-t elfogadunk? , ha elérjük a 0-t töröljük má' 
        ]),
        incompletePayback(event){
            let toBePassed = {'on': this.triggerOn(), 'id': event.target.closest(".marker4ID").id.slice(2), 'amount': this.incompletePaybackAmount, 'current': document.querySelector(`[mySecret=${event.target.closest(".marker4ID").id}]`).innerHTML.split(" ")[0]}
            this.changeDebt(toBePassed)
        },
    }
}
</script>
