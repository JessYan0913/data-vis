import {
  scaleBand,
  scaleLinear,
  schemeCategory10,
  min,
  max,
  axisRight,
  axisBottom,
  line,
  curveLinear,
  curveNatural,
  curveBasis,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from 'd3';
import Chart from './chart';

const curveType = {
  linear: curveLinear,
  natural: curveNatural,
  basis: curveBasis,
  step: curveStep,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore
};

export default class Line extends Chart {
  constructor(props) {
    super(props);
    const {
      data,
      xField,
      yField,
      lineType = 'linear',
      color = schemeCategory10
    } = props;
    this.xValue = item => item[xField];
    this.yValue = item => item[yField];

    this.yScale = scaleLinear()
      .domain([min(data, this.yValue), max(data, this.yValue)])
      .range([this.innerHeight, 0])
      .nice();

    this.xScale = scaleBand()
      .domain(data.map(this.xValue))
      .range([this.margin.left, this.innerWidth])
      .padding(0.2);

    this.linePath = line()
      .curve(curveType[lineType] ?? curveType.linear)
      .x(d => this.xScale(this.xValue(d)))
      .y(d => this.yScale(this.yValue(d)));

    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    //generate yAxis
    chartGroup
      .append('g')
      .call(axisRight(this.yScale).tickSize(this.innerWidth));

    const yAxisGroup = chartGroup.selection();
    yAxisGroup.select('.domain').remove();
    yAxisGroup
      .selectAll('.tick line')
      .filter(Number)
      .attr('stroke', '#777');
    yAxisGroup
      .selectAll('.tick text')
      .attr('x', 4)
      .attr('dy', -4);

    //generate xAxis
    chartGroup
      .append('g')
      .call(axisBottom(this.xScale))
      .attr('transform', `translate(${0}, ${this.innerHeight})`);

    //generate column
    chartGroup
      .append('g')
      .append('path')
      .attr('d', this.linePath(this.data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', 'green');
  }
}
