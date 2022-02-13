<template>
  <div id="column-div"></div>
</template>

<script>
import Column from '../../general/column';

const data1 = [
  {
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9,
  },
  {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3,
  },
  {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4,
  },
  {
    name: 'London',
    月份: 'May',
    月均降雨量: 47,
  },
  {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3,
  },
  {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24,
  },
  {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6,
  },
  {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 15,
  },
  {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2,
  },
  {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5,
  },
  {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7,
  },
  {
    name: 'Berlin',
    月份: 'May',
    月均降雨量: 52.6,
  },
  {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5,
  },
  {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4,
  },
  {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4,
  },
  {
    name: 'Beijing',
    月份: 'Jan.',
    月均降雨量: -18.9,
  },
  {
    name: 'Beijing',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'Beijing',
    月份: 'Apr.',
    月均降雨量: 47,
  },
];

export default {
  mounted() {
    const column = new Column({
      data: data1,
      xField: '月份',
      yField: '月均降雨量',
      seriesField: 'name',
      label: {
        position: 'middle',
        style: {
          fontSize: 10,
          fill: 'black',
        },
        formatter: (datum) => {
          console.log(datum);
          return `${datum.月均降雨量}`;
        },
      },
      container: '#column-div',
      width: 800,
      height: 600,
    });
    column.render();
  },
};
</script>