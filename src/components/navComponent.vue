<template>
    <div>
        <v-toolbar
        
        dark
        
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
        


        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            >
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <template v-slot:default="dialog">
            <v-card>
                <v-toolbar
                color="success"
                dark
                >Create new Person</v-toolbar>
                <v-card-text>
                    <v-text-field
                        success 
                        label="Nickname"
                        v-model="inputName"
                        :error-messages="inputNameErrors"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="()=>{

                        $v.$touch()
                        if (!$v.$invalid){
                            addNewPerson({name: inputName});
                            dialog.value = false
                            inputName = ''
                            $v.$reset()
                        }

                    }"

                >Create</v-btn>
                <v-btn
                    text
                    @click="()=>{
                        dialog.value = false
                        inputName = ''
                        $v.$reset()}"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
            </template>
        </v-dialog>

        <v-toolbar-title>Bank App</v-toolbar-title>

        <v-spacer></v-spacer>
        <div>
            Logged in as 
            <span class="font-weight-bold">{{ loggedInUser }}</span>
        </div>
        <v-btn icon @click="signOut">
            
            <v-icon>mdi-export</v-icon>
            
        </v-btn>
        </v-toolbar>

            
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import firebase from 'firebase/app';
import "firebase/auth";
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';


export default {

    name: "navComponent",
    mixins: [validationMixin],

    validations: {
        inputName: { required  }
    },
    data: ()=>{
        return {
            inputName: '',
            loggedInUser: ''
        }
    },

    mounted(){
        this.loggedInUser = firebase.auth().currentUser.email
        this.setupView()
    },
    created(){
        
    },

    computed: {
        inputNameErrors () {
            const errors = []
            if (!this.$v.inputName.$dirty) return errors
            !this.$v.inputName.required && errors.push('Field name is mandatory.')
            return errors
        },
    },

    methods: {
        ...mapActions([
            'addNewPerson',
            'setupView'
        ]),

        async signOut(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace({ name: 'Login'})
            })
        }
    }

}
</script>
