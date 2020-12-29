<template>
  <div id="app">
    <earth />
  </div>
</template>

<script>
import Earth from './components/earth'

export default {
  name: 'App',
  components: {
    Earth
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
  margin-top: 60px;
}
</style>
