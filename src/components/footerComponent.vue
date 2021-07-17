<template>
    <v-footer
        dark
        padless


    >
        <v-card
        flat
        tile
        class="teal lighten-1 white--text text-center"
        >
        <v-card-text>
            <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            >
            <v-icon size="24px">
                {{ icon }}
            </v-icon>
            </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
            Bank App helps you manage your money effectively. This piece of software is published on the MIT license. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe incidunt labore corrupti officia rem minima enim necessitatibus nostrum consequuntur mollitia. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Bank App</strong>
        </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {

    name: "footerComponent",

    data: ()=>({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ]
    }),



}
</script>