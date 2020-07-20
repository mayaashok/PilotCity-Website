<template>
  <v-app>
    <v-main>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
// import Blog from '@/components/Blog'
export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>

</style>
