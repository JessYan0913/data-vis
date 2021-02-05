<template>
  <div id="line-div"></div>
</template>

<script>
import Line from '../../basic/line';

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
    const line = new Line({
      container: '#line-div',
      data,
      xField: 'type',
      yField: 'sales',
      lineType: 'natural',
      width: 800,
      height: 600
    });
    line.render();
  }
};
</script>