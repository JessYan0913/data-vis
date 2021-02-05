<template>
  <div id="app">
    <bar-chart />
    <pie-chart />
  </div>
</template>

<script>
import BarChart from './example/bar';
import PieChart from './example/pie';

export default {
  name: 'App',
  components: {
    BarChart,
    PieChart
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
