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
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
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
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="()=>{
                        addNewPerson(inputName);
                        dialog.value = false
                    }"

                >Create</v-btn>
                <v-btn
                    text
                    @click="dialog.value = false"
                >Close</v-btn>
                </v-card-actions>
            </v-card>
            </template>
        </v-dialog>

        <v-toolbar-title>Bank App</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$router.push('/login')">
            <v-icon>mdi-export</v-icon>
        </v-btn>
        </v-toolbar>

            
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {

    name: "navComponent",

    data: ()=>{
        return {
            inputName: ''
        }
    },
    methods: {
        ...mapActions([
            'addNewPerson'
        ])
    }

}
</script>
