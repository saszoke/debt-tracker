<template>
    <div>
        <v-toolbar
        
        dark
        
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
        

                <v-btn icon @click="addDialog = true">
                    <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
            v-model="addDialog"
            >
            
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

                    <v-file-input
                        :rules="rules"
                        v-model="filename"
                        accept="image/*"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                        ref="fileupload"
                        @change="imgData = $event"
                    ></v-file-input>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="function(){

                        $v.$touch()
                        if (!$v.$invalid){
                            fileUpload()
                            
                            $v.$reset()
                        }

                    }"

                >Create</v-btn>
                <v-btn
                    text
                    @click="function(){
                        addDialog = false
                        inputName = ''
                        imgData = null
                        picture = null
                        filename = null
                        $v.$reset()}"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
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
            addDialog: false,
            inputName: '',
            loggedInUser: '',
            rules: [
                    value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
                ],
            imgData: {},
            picture: null,
            filename: null

        }
    },

    mounted(){
        this.loggedInUser = firebase.auth().currentUser.email
        this.setupView()
    },
    created(){},

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
            'setupView',
            'resetState'
        ]),

        async signOut(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace({ name: 'Login'})
                this.resetState()
            })
        },

        fileUpload(){
            
            const storageRef = firebase.storage().ref(this.imgData.name).put(this.imgData)

            storageRef.on('state_changed', (state)=>{
                if (state.bytesTransferred === state.totalBytes){
                    storageRef.snapshot.ref.getDownloadURL().then(url => {
                    this.picture = url
                    this.addNewPerson({name: this.inputName, img: this.imgData.name, tempUrl: this.picture});
                    this.addDialog = false
                    this.inputName = ''
                    this.imgData = null
                    this.picture = null
                    this.filename = null
                })
                }
            })
        },

        

        
    }

}

// minél több debt dialogot nyitok, annál sötétebb a háttér

</script>
