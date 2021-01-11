<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/bar';

let data = [
  [1, 20, 50, 4, 4],
  [2, 1, 23, 11, 23],
  [3, 3, 30, 13],
  [30, 3, 30, 33, 7],
  [33, 23, 10, 13]
];

let data1 = [
  {id: 1, name: 'a', value: 32},
  {id: 2, name: 'b', value: 25},
  {id: 3, name: 'c', value: 67},
  {id: 4, name: 'd', value: 2},
];

export default {
  mounted() {
    let chart = new BarChart('#div');
    chart
      .width(600)
      .height(600)
      .data(data)
      .tooltip(d => `<div>数据:${d}</div>`)
      .draw();
  }
};
</script>