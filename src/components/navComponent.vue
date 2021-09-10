<template>
    <div>
        <v-toolbar
        
        dark
        
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
        

        <v-btn icon @click="showAddPersonDialogComponent = true">
            <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
        

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

        <add-person-dialog-component :visible="showAddPersonDialogComponent"  @close="showAddPersonDialogComponent=false"/>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import firebase from 'firebase/app';
import "firebase/auth";

import addPersonDialogComponent from './dialogs/addPersonDialogComponent.vue';


export default {

    name: "navComponent",
    components: { addPersonDialogComponent },

    data: ()=>{
        return {
            showAddPersonDialogComponent: false,
            loggedInUser: '',


        }
    },

    mounted(){
        this.loggedInUser = firebase.auth().currentUser.email
        this.setupView()
    },

    methods: {
        ...mapActions([
            'setupView',
            'resetState'
        ]),

        async signOut(){
            firebase.auth().signOut().then(()=>{
                this.$router.replace({ name: 'Login'})
                this.resetState()
            })
        },
    }
}

</script>
