<template>
  <div id="column-div"></div>
</template>

<script>
import Column from '../../basic/column';

const data = [
  {
    type: '家具家电',
    name: '电视',
    sales: 38
  },
  {
    type: '粮油副食',
    name: '大米',
    sales: 52
  },
  {
    type: '生鲜水果',
    name: '苹果',
    sales: 61
  },
  {
    type: '美容洗护',
    name: '面膜',
    sales: 145
  },
  {
    type: '母婴用品',
    name: '纸尿裤',
    sales: 48
  }
];

export default {
  mounted() {
    const column = new Column({
      container: '#column-div',
      data,
      label: {
        position: 'top',
        style: {
          fontSize: 16,
          fill: 'red'
        },
        formatter: datum => `${datum.sales} ¥`
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