<template>
  <div id="div"></div>
</template>

<script>
import BarChart from '../../basic/chart/bar';
import { getFields } from '../../utils/array-util';

let data = [
  [1, 20, 50, 4, 4],
  [2, 1, 23, 11, 23],
  [3, 3, 30, 13, 0],
  [30, 3, 30, 33, 7],
  [33, 23, 10, 13, 0]
];

export default {
  mounted() {
    let chart = new BarChart({
      element: '#div'
    });
    console.log(chart);
    chart.width(600);
    chart.height(600);
    chart.data(data);
    chart.tooltip(d => {
      return `<div>数据:${d}</div>`;
    });
    chart.draw();
  }
};
</script>