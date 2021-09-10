<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="show"
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
                        createPerson()
                        $v.$reset()
                    }

                }"

            >Create</v-btn>
            <v-btn
                text
                @click="function(){
                    show = false
                    inputName = ''
                    imgData = null
                    picture = null
                    filename = null
                    $v.$reset()}"
            >Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions} from 'vuex';
import firebase from 'firebase/app';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
    props: ['visible'],
    mixins: [validationMixin],

    validations: {
        inputName: { required },
        },
    data: ()=>{
        return {

            triggerOn: function(){
                return document.querySelector('.v-tab--active').textContent.trim()
            },
            picture: null,
            inputName: '',
            imgData: null,
            filename: null,
            rules: [
                value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
            ],
        }
    },
    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        },

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
        ]),
        createPerson(){
            if (this.imgData){

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
            } else {
                this.addNewPerson({name: this.inputName});
                this.show = false
                this.inputName = ''
            }
        },
    }
}
</script>