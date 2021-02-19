<template>
  <div id="app">
    <column />
    <pie />
    <line-chart />
    <scatter />
  </div>
</template>

<script>
import Column from './example/column';
import Pie from './example/pie';
import LineChart from './example/line';
import Scatter from './example/scatter';

export default {
  name: 'App',
  components: {
    Column,
    Pie,
    LineChart,
    Scatter
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
