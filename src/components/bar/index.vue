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