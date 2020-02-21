<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <wl-workflow></wl-workflow>
  </div>
</template>

<script>
import WlWorkflow from './components/wl-workflow.vue'

export default {
  name: 'App',
  components: {
    WlWorkflow
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
