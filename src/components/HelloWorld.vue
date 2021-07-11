<template>
  <div :class="width">
    <v-carousel v-model="model" :show-arrows="false" hide-delimiters height="auto">
      <v-img
        contain
        src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      
      >
      </v-img> <!--CHECK CARD REVEAL INSTEAD-->
      <v-carousel-item v-for="(color, i) in mylist" :key="color">
        <v-sheet :color="color">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2 py-10">Slide {{ i + 1 }}</div>
            <v-expansion-panels class="">
              <v-expansion-panel v-for="debt in debts" :key="debt.id">
                <v-expansion-panel-header class="pa-5 grey--text" color="light-green lighten-5">
                  <div class="d-flex justify-space-between pa-2">
                    <div class="mx-5 green--text font-weight-bold">{{ debt.amount }} HUF</div>
                    <div class="mx-5">{{ debt.date }}</div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  
                  <v-btn color="warning" dark class="ma-5">
                    <span class="mr-2">Payback (incomplete)</span>
                    <v-icon>mdi-cash</v-icon>
                  </v-btn>

                  <v-btn color="success" dark class="ma-5">
                    <span class="mr-2">Complete Payback</span>
                    <v-icon>mdi-cash-check</v-icon>
                  </v-btn>
                  <v-tooltip
                    v-model="show"
                    top
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="grey lighten-1">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{debt.info}}</span>
                  </v-tooltip>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    mylist: ["light-green lighten-1", "light-green lighten-2", "light-green lighten-3", "light-green lighten-4", "light-green lighten-5"],

    debts: [
      { id: 1, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 2, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 3, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 4, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
      { id: 5, date: "03/25/2015", amount: 10000, info: "Random information about debt" },
    ],
    model: 0,

  }),
  computed: {
    width () {
        switch (this.$vuetify.breakpoint.name) { //$vuetify.breakpoint.xs ? '' : 'too-big'
          case 'xs': return ""
          case 'sm': return ""
          case 'md': return "too-big"
          case 'lg': return "too-big"
          case 'xl': return "too-big"
        }
        return ""
      }
  },

  watch: {},
};
</script>

<style>
.too-big{
  max-width: 50%;
  margin: 0 auto;
  border: 1px solid grey;
}
</style>