<template>
  <div id="app">
    <column />
    <pie />
  </div>
</template>

<script>
import Column from './example/column';
import Pie from './example/pie';

export default {
  name: 'App',
  components: {
    Column,
    Pie
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
