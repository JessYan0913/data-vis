<template>
  <div id="app">
    <line-chart />
  </div>
</template>

<script>
import LineChart from './components/line';
import BarChart from './components/bar';

export default {
  name: 'App',
  components: {
    LineChart,
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
