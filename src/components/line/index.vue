<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/bar';
import { select } from 'd3';

let data = [
  [1, 2, 3, 4],
  [2, 30, 23, 11],
  [3, 3, 3, 13],
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