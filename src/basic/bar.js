import {
  select,
  scaleLinear,
  scaleBand,
  extent,
  schemeCategory10,
  range
} from 'd3';
import Chart from './chart';

const BarChart = (() => {
  let x = d => d[0];
  let y = d => d.slice(1, d.length);
  let xScale = scaleBand();
  let yScale = scaleLinear();
  let xValue = [];
  let yValue = [];

  class BarChart extends Chart {
    constructor(selection) {
      super(selection);
    }

    draw() {
      let data = super.data();
      data.forEach((item, index) => {
        xValue.push(x.call(data, item, index));
        yValue.push(y.call(data, item, index));
      });

      let chartWidth =
        super.width() - super.margin().left - super.margin().right;
      let chartHeight =
        super.height() - super.margin().top - super.margin().bottom;

      let svg = select(this.selection)
        .append('svg')
        .attr('width', chartWidth)
        .attr('height', chartHeight);
      console.log(yValue);
      yScale
        .domain(extent([].concat.apply([], yValue)))
        .range([chartHeight, 0])
        .nice();

      xScale
        .domain(xValue)
        .range([0, chartWidth])
        .paddingOuter(1);

      let xGroupScale = scaleBand()
        .domain(range(yValue.length))
        .range([0, xScale.bandwidth()]);

      svg
        .append('g')
        .selectAll('g')
        .data(yValue)
        .enter()
        .append('g')
        .style('fill', function(d, i) {
          return schemeCategory10[i];
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
          return yScale(d);
        })
        .attr('x', function(d, i) {
          console.log(xScale(i));
          return xScale(i);
        })
        .attr('y', function(d) {
          return chartHeight - yScale(d);
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
  }

  return BarChart;
})();

export default BarChart;
