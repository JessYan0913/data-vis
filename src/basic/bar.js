import {
  scaleLinear,
  scaleBand,
  extent,
  schemeCategory10,
  range,
  max
} from 'd3';
import { dimensionArray } from '../utils/array-util';
import Chart from './chart';

const BarChart = (() => {
  let x = d => d[0];
  let y = d => d;
  let xScale = scaleBand();
  let yScale = scaleLinear();
  let xValue = [];
  let yValue = [];
  let colors = schemeCategory10;

  class BarChart extends Chart {
    constructor(selection) {
      super(selection);
    }

    draw() {
      let data = this.data();
      data.forEach((item, index) => {
        xValue.push(x.call(data, item, index));
        yValue.push(y.call(data, item, index));
      });

      //判断数组维度，如果是一维数组，则一维数组变成二维数组
      let yValueDimension = dimensionArray(yValue);
      if (yValueDimension == 1) {
        yValue = [yValue];
      }

      //获取svg的高度和宽度
      let chartWidth = this.svg.attr('width');
      let chartHeight = this.svg.attr('height');

      yScale
        //将二维数组转换为一维数组，然后求出全部数据的最大值和最小值
        .domain(extent([].concat.apply([], yValue)))
        .range([chartHeight, 0])
        .nice();

      xScale
        //求二维数组中长度最长数组长度
        .domain(range(max(yValue, d => d.length)))
        .range([0, chartWidth]);

      let xGroupScale = scaleBand()
        .domain(range(yValue.length))
        .range([0, xScale.bandwidth()])
        .paddingOuter(0.2);

      this.svg
        .append('g')
        .selectAll('g')
        .data(yValue)
        .enter()
        .append('g')
        .style('fill', function(d, i) {
          return colors[Math.min(i, colors.length - 1)];
        })
        .attr('transform', function(d, i) {
          return 'translate(' + xGroupScale(i) + ',0)';
        })
        .selectAll('rect')
        .data(function(d) {
          return d;
        })
        .enter()
        .append('rect')
        .attr('width', xGroupScale.bandwidth())
        .attr('height', function(d, i) {
          return chartHeight - yScale(d);
        })
        .attr('x', function(d, i) {
          return xScale(i);
        })
        .attr('y', function(d) {
          return yScale(d);
        });
    }

    x(_) {
      if (!arguments.length) return x;
      x = _;
      return this;
    }

    y(_) {
      if (!arguments.length) return y;
      y = _;
      return this;
    }

    colors(_) {
      if (!arguments.length) return colors;
      colors = _;
      return this;
    }
  }

  return BarChart;
})();

export default BarChart;
