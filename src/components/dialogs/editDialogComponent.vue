<template>
<v-dialog
    v-model="show"
    max-width="600"
    >

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
            <v-file-input
                :rules="rules"
                v-model="filename"
                accept="image/*"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                @change="imgData = $event"
            ></v-file-input>
        </v-card-text>
        <v-card-actions class="justify-end">
        <v-btn
            text
            color="green darken-1"
            @click="()=>{
                $v.$touch()
                if (!$v.myinputname.$invalid){
                    applyPersonChange()
                    
                    $v.$reset()
                    show = false
                }
            }"
        >Apply</v-btn>
        <v-btn
            text
            @click="()=>{
                show = false
                myinputname = ''
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
        myinputname: { required },
        },
    data: ()=>{
        return {

            triggerOn: function(){
                return document.querySelector('.v-tab--active').textContent.trim()
            },
            picture: null,
            myinputname: '',
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

        myinputnameErrors(){
            const errors = []
            if (!this.$v.myinputname.$dirty) return errors
            !this.$v.myinputname.required && errors.push('Field cannot be empty.')
            return errors
        },
    },

    methods: {
        ...mapActions([
            'editPerson',
        ]),
        applyPersonChange(){
            if (this.imgData){

                const storageRef = firebase.storage().ref(this.imgData.name).put(this.imgData)
        
                storageRef.on('state_changed', (state)=>{
                    if (state.bytesTransferred === state.totalBytes){
                        storageRef.snapshot.ref.getDownloadURL().then(url => {
                        this.picture = url
                        this.editPerson({on: this.triggerOn(), newName: this.myinputname, img: this.imgData.name, tempUrl: this.picture});
                        this.editDialog = false
                        this.myinputname = ''
                        this.imgData = null
                        this.picture = null
                        this.filename = null
                    })
                    }
                })
            } else {
                this.editPerson({on: this.triggerOn(), newName: this.myinputname});
                this.editDialog = false
                this.myinputname = ''
            }
            }
    }
}
</script>