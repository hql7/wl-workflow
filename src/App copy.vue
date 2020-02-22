<template>
  <div id="app">
    <div class="logo-box">
      <img class="a-algo" alt="Vue logo" src="./assets/logo.png">
    </div>
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
html,body{
  width: 100%;
  height: 100%; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.logo-box{
  text-align: center;
}
.a-algo{
  height: 100px;
}

.wl-workflow{
  margin: 0 auto;
  width: 90%;
  height: calc(100% - 160px);
}
</style>
