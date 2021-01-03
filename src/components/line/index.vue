<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/bar';
import { select } from 'd3';

let data = [
  [1, 2, 3, 4],
  [2, 34, 23, 11],
  [3, 39, 3, 13],
  [4, 37, 35, 12],
  [5, 43, 30, 15],
  [6, 49, 50, 10]
];

export default {
  mounted() {
    let chart = new BarChart('#div');
    chart
      .width(500)
      .height(500)
      .data(data)
      .draw();
  }
};
</script>