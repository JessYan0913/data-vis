<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/bar';

let data = [
  [1, 20, 50, 4],
  [2, 1, 23, 11],
  [3, 3, 30, 13]
];

export default {
  mounted() {
    let chart = new BarChart('#div');
    chart
      .width(500)
      .height(500)
      .data(data)
      .colors(['#134b71', '#ccff00', '#c08996'])
      .draw();
  }
};
</script>