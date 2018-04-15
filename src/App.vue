<template>
  <div id="app">
    <the-navbar></the-navbar>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
export default {
  components: {
    TheNavbar
  },
  name: 'App'
}
</script>
