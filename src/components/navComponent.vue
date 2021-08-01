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

                    <v-file-input
                        :rules="rules"
                        v-model="filename"
                        accept="image/*"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                        @change="onFileSelected"
                        ref="fileupload"
                    ></v-file-input>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="function(){

                        $v.$touch()
                        if (!$v.$invalid){
                            addNewPerson({name: inputName, img: imgData.name, tempUrl: picture});
                            dialog.value = false
                            inputName = ''
                            imgData = null
                            picture = null
                            filename = null
                            $v.$reset()
                        }

                    }"

                >Create</v-btn>
                <v-btn
                    text
                    @click="function(){
                        dialog.value = false
                        inputName = ''
                        imgData = null
                        picture = null
                        filename = null
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
        },

        onFileSelected(event){
            console.log(this.$refs.fileupload)
            console.log(this)
            const storageRef = firebase.storage().ref(event.name).put(event)
            console.log(event)
            this.imgData = event

            storageRef.on('state_changed', ()=>{
                storageRef.snapshot.ref.getDownloadURL().then(url => {
                    this.picture = url
                    console.log(url)
                })
            })
        }
    }

}

// minél több debt dialogot nyitok, annál sötétebb a háttér

</script>
