<template>
  <div><!-- <div :class="width"> -->

    <v-tabs :vertical="isVertical">
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Option 1
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        Option 2
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        Option 3
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>

            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
            </p>

            <p>
              Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
            </p>

            <p>
              Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
            </p>

            <p>
              Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
            </p>

            <p class="mb-0">
              Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <!-- <v-carousel v-model="model" :show-arrows="false" hide-delimiters height="auto">
      <v-img
        contain
        src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      
      >
      </v-img> 
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
    </v-carousel> -->
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
      },
    isVertical(){ return true }
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