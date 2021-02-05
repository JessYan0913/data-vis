<template>
  <div id="div"></div>
</template>

<script>
import Column from '../../basic/column';

const data = [
  {
    type: '家具家电',
    sales: -38
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
    const column = new Column({
      container: '#div',
      data,
      label: {
        position: 'bottom',
        style: {
          fill: '#fff',
          fontSize: 16
        },
        formatter: datum => `类型：${datum.type}`
      },
      xField: 'type',
      yField: 'sales',
      width: 800,
      height: 600
    });
    column.render();
  }
};
</script>