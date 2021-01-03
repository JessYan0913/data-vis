import {
  select,
  scaleLinear,
  scaleOrdinal,
  scaleBand,
  extent,
  max
} from 'd3';
import Chart from './chart';

const BarChart = (() => {
  let x = d => d[0];
  let y = d => d.slice(1, d.length);
  let xScale = scaleBand();
  let yScale = scaleLinear();
  let xValue = [];
  let yValue = [];
  let rectWidth = 10;

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

      let svg = select(this.selection)
        .append('svg')
        .attr('width', super.width())
        .attr('height', super.height());

      let chartWidth =
        super.width() - super.margin().left - super.margin().right;
      let chartHeight =
        super.height() - super.margin().top - super.margin().bottom;

      yScale
        .domain(extent(yValue, d => d[1]))
        .range([chartHeight, 0])
        .nice();

      xScale
        .domain(xValue)
        .range([0, chartWidth])
        .paddingOuter(0.2);
      console.log(xScale.bandwidth());

      let pillarNum = max(yValue, d => d.length);

      let xGroupScale = scaleOrdinal()
        .domain(xValue)
        .range([0, super.width() - super.margin().left - super.margin().right]);

      yValue.forEach(function(item, index) {
        svg
          .selectAll('rect')
          .data(item)
          .enter()
          .append('rect')
          .attr('fill', 'red')
          .attr('width', rectWidth - 2)
          .attr('height', d => chartHeight - yScale(d))
          .attr('x', (d, i) => {
            return i;
          })
          .attr('y', d => yScale(d));
      });

      //   svg
      //     .selectAll('rect')
      //     .data(data)
      //     .enter()
      //     .append('rect')
      //     .attr('fill', 'red')
      //     .attr('width', 5)
      //     .attr('height', d => super.height() - yScale(d[1]))
      //     .attr('x', d => xScale(d[0]))
      //     .attr('y', d => yScale(d[1]));
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
