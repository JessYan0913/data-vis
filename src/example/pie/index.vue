<template>
  <div id="div"></div>
</template>

<script>
import Pie from '../../basic/pie';

const data = [
  {
    type: '家具家电',
    sales: 38
  },
  {
    type: '粮油副食',
    sales: 52
  },
  {
    type: '生鲜水果',
    sales: 61
  },
  {
    type: '美容洗护',
    sales: 145
  },
  {
    type: '母婴用品',
    sales: 48
  }
];

export default {
  mounted() {
    const pie = new Pie({
      container: '#div',
      data,
      appendPadding: 0.001,
      label: {
        position: 'outer',
        style: {
          fill: '#000',
          fontSize: 16
        },
        formatter: (datum, index) =>
          `${data[index].type} ${data[index].sales} $`
      },
      statistic: {
        title: {
          style: {
            fill: '#000',
            fontSize: 18
          },
          formatter: () => '统计'
        },
        content: {
          style: {
            fill: '#000',
            fontSize: 20
          },
          formatter: () => {
            return `${data.reduce((prev, cur) => cur.sales + prev, 0)} $`;
          }
        }
      },
      angleField: 'sales',
      colorField: 'type',
      radius: 0.9,
      innerRadius: 0,
      width: 800,
      height: 600
    });
    pie.render();
  }
};
</script>