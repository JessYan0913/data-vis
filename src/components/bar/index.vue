<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/bar';

let data = [
  [1, 20, 50, 4],
  [2, 1, 23, 11],
  [3, 3, 30, 13],
  [33, 23, 10, 13]
];

export default {
  mounted() {
    let chart = new BarChart('#div');
    chart
      .width(400)
      .height(400)
      .data([1, 20, 50, 4])
      .draw();
  }
};
</script>