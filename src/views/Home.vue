<template>
  <v-app>

    <nav-component/>
    <tabs-component ref="tabsComp"/>
    <footer-component/>
  </v-app>
</template>

<script>
import TabsComponent from '../components/tabsComponent.vue';
import NavComponent from '../components/navComponent.vue';
import FooterComponent from '../components/footerComponent.vue';

export default {
  name: "Home",

  components: {
    
    TabsComponent,
    NavComponent,
    FooterComponent
  },
};
</script>
