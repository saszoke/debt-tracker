<template>
<v-dialog
    v-model="show"
    max-width="300"
>
    <v-card>
    <v-card-title class="text-h5">
        Remove person card?
    </v-card-title>

    <v-card-text>
        Removing a person card results in losing all the related data to the person, ongoing debts included. Are you sure? 
    </v-card-text>

    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
        color="green darken-1"
        text
        @click="show = false"
        >
        No, cancel
        </v-btn>

        <v-btn
        color="red darken-1"
        text
        @click="()=>{
            show = false
            $emit('delete')
            
        }"
        >
        Yes, go ahead
        </v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['visible'],
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
        }
    }
}
</script>