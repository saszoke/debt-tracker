<template>
    <v-dialog
        v-model="show"
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
                    show = false
                    completePayback(eventObj)
                }"

            >Absolutely</v-btn>
            <v-btn
                text
                @click="()=>{
                    show = false
                    }"
            >Not sure</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>



<script>
import {mapActions} from 'vuex';
import { validationMixin } from 'vuelidate';
import { minValue, required } from 'vuelidate/lib/validators';

export default {
    props: ['visible', 'eventObj'],
    mixins: [validationMixin],

    validations: {
        amount: { minValue: minValue(10), required  },
        },
    data: ()=>{
        return {
            triggerOn: function(){
                return document.querySelector('.v-tab--active').textContent.trim()
            },
            amount: '',
            information: '',
        }
    },
    computed: {
        amountErrors () {
            const errors = []
            if (!this.$v.amount.$dirty) return errors
            !this.$v.amount.minValue && errors.push('Amount is too low.')
            !this.$v.amount.required && errors.push('Field cannot be empty.')
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
            'removeDebt',
        ]),
        completePayback(event){
            let toBePassed = {'on': this.triggerOn(), 'id': event.target.closest(".marker4ID").id.slice(2)}
            this.removeDebt(toBePassed)
        },
    }
}
</script>
