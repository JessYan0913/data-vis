<template>
  <div id="line-div"></div>
</template>

<script>
import Line from '../../general/line';

const data1 = [
  { date: 'yesterday', time: '13.00', cpu: 63.93689627294421 },
  { date: 'yesterday', time: '13.05', cpu: 65.06585239044342 },
  { date: 'yesterday', time: '13.10', cpu: 66.42719381417056 },
  { date: 'yesterday', time: '13.15', cpu: 63.060669399125935 },
  { date: 'yesterday', time: '13.20', cpu: 64.04639809297761 },
  { date: 'yesterday', time: '13.25', cpu: 64.45117682728456 },
  { date: 'yesterday', time: '13.30', cpu: 63.35488066344804 },
  { date: 'yesterday', time: '13.35', cpu: 65.2969449309885 },
  { date: 'yesterday', time: '13.40', cpu: 66.35014444552017 },
  { date: 'yesterday', time: '13.45', cpu: 66.198378961063 },
  { date: 'yesterday', time: '13.50', cpu: 66.85520134738813 },
  { date: 'yesterday', time: '13.55', cpu: 65.05419984325125 },
  { date: 'yesterday', time: '14.00', cpu: 66.62243229531435 },
  { date: 'yesterday', time: '14.05', cpu: 66.77808066603122 },
  { date: 'yesterday', time: '14.10', cpu: 66.9144977524293 },
  { date: 'yesterday', time: '14.15', cpu: 65.05499508303669 },
  { date: 'yesterday', time: '14.20', cpu: 66.36871158902638 },
  { date: 'yesterday', time: '14.25', cpu: 63.973903073723044 },
  { date: 'yesterday', time: '14.30', cpu: 64.92585536363889 },
  { date: 'yesterday', time: '14.35', cpu: 65.17145801764055 },
  { date: 'yesterday', time: '14.40', cpu: 64.42516834555609 },
  { date: 'yesterday', time: '14.45', cpu: 63.701363912573775 },
  { date: 'yesterday', time: '14.50', cpu: 66.11568649665543 },
  { date: 'yesterday', time: '14.55', cpu: 64.0474592964878 },
  { date: 'yesterday', time: '15.00', cpu: 64.25676632707459 },
  { date: 'yesterday', time: '15.00', cpu: 65 },
  { time: '13.00', cpu: 100, date: 'today' },
  { time: '13.05', cpu: 100, date: 'today' },
  { time: '13.10', cpu: 100, date: 'today' },
  { time: '13.15', cpu: 100, date: 'today' },
  { time: '13.20', cpu: 100, date: 'today' },
  { time: '13.25', cpu: 100, date: 'today' },
  { time: '13.30', cpu: 100, date: 'today' },
  { time: '13.35', cpu: 100, date: 'today' },
  { time: '13.40', cpu: 100, date: 'today' },
  { time: '13.45', cpu: 100, date: 'today' },
  { time: '13.50', cpu: 100, date: 'today' },
  { time: '13.55', cpu: 100, date: 'today' },
  { time: '14.00', cpu: 65, date: 'today' },
  { time: '14.05', cpu: 72.16886580736812, date: 'today' },
  { time: '14.10', cpu: 68.57230489482068, date: 'today' },
  { time: '14.15', cpu: 71.43150028596347, date: 'today' },
  { time: '14.20', cpu: 78.14636866352923, date: 'today' },
  { time: '14.25', cpu: 68.36883432160218, date: 'today' },
  { time: '14.30', cpu: 75.39521675212667, date: 'today' },
  { time: '14.35', cpu: 75.27433214647408, date: 'today' },
  { time: '14.40', cpu: 82.10189835378893, date: 'today' },
  { time: '14.45', cpu: 84.7261454369566, date: 'today' },
  { time: '14.50', cpu: 78.96269733695286, date: 'today' },
  { time: '14.55', cpu: 86.43607929073264, date: 'today' },
  { time: '15.00', cpu: 85, date: 'today' }
];

export default {
  mounted() {
    const line = new Line({
      container: '#line-div',
      data: data1,
      xField: 'time',
      yField: 'cpu',
      seriesField: 'date',
      lineType: 'linear',
      point: {
        shape: 'star',
        size: 60
      },
      width: 800,
      height: 600,
      label: {
        position: 'top',
        formatter: datum => `${datum.cpu.toFixed(1)}`
      },
      xAxis: {
        lineStyle: {
          strokeDasharray: '5,10,5'
        },
        title: {
          text: '类别'
        }
      },
      yAxis: {
        lineStyle: {
          strokeDasharray: '5,10,5'
        },
        title: {
          text: '价格',
          autoRotate: true,
          style: {
            fill: 'red',
            fontSize: 14
          }
        },
        position: 'left'
      }
    });
    line.render();
  }
};
</script>