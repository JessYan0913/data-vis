<template>
  <div id="app">
    <bar-chart />
  </div>
</template>

<script>
import BarChart from './components/bar';

export default {
  name: 'App',
  components: {
    BarChart,
  }
};
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
