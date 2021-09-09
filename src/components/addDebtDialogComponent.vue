<template>
    <v-dialog
        v-model="show"
        persistent
        max-width="600px"
    >
        <v-card>
        <v-card-title>
            <span class="text-h5">New debt record</span>
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
                show = false
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
                show = false
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
</template>



<script>
import {mapActions} from 'vuex';
import { validationMixin } from 'vuelidate';
import { minValue, required } from 'vuelidate/lib/validators';

export default {
    props: ['visible'],
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
            'addNewDebt',
        ])
    }
}
</script>
