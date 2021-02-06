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
  curveStepBefore,
  symbol,
  symbols
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
      .range([this.margin.left, this.innerWidth]);

    this.linePath = line()
      .curve(curveType[lineType] ?? curveType.linear)
      .x(d => this.xScale(this.xValue(d)) + this.xScale.bandwidth() / 2)
      .y(d => this.yScale(this.yValue(d)));

    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    //generate yAxis
    //TODO: 坐标轴应该抽成组件
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
    //TODO: 坐标轴应该抽成组件
    chartGroup
      .append('g')
      .call(axisBottom(this.xScale))
      .attr('transform', `translate(${0}, ${this.innerHeight})`);

    const lineGroup = chartGroup.append('g');

    //generate column
    lineGroup
      .append('path')
      .attr('d', this.linePath(this.data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', 'green');

    //generate point
    // lineGroup
    //   .append('g')
    //   .selectAll('circle')
    //   .data(this.data)
    //   .enter()
    //   .append('path')
    //   .attr(
    //     'd',
    //     symbol()
    //       .type(symbols[1])
    //       .size(80)
    //   )
    //   .attr(
    //     'transform',
    //     datum =>
    //       `translate(${this.xScale(this.xValue(datum)) +
    //         this.xScale.bandwidth() / 2}, ${this.yScale(this.yValue(datum))})`
    //   )
    //   .attr('fill', 'white')
    //   .attr('stroke', 'red');

    // lineGroup
    //   .selectAll('circle')
    //   .data(this.data)
    //   .enter()
    //   .append('circle')
    //   .attr('r', 10)
    //   .attr(
    //     'cx',
    //     datum => this.xScale(this.xValue(datum)) + this.xScale.bandwidth() / 2
    //   )
    //   .attr('cy', datum => this.yScale(this.yValue(datum)))
    //   .attr('fill', 'white')
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 3);

    lineGroup
      .append('g')
      .selectAll('circle')
      .data(this.data)
      .enter()
      .call(this.generatePoint)
      .attr(
        'transform',
        datum =>
          `translate(${this.xScale(this.xValue(datum)) +
            this.xScale.bandwidth() / 2}, ${this.yScale(this.yValue(datum))})`
      );
  }

  generatePoint(selection) {
    const point = selection
      .append('path')
      .attr(
        'd',
        symbol()
          .type(symbols[1])
          .size(80)
      )
      .attr('fill', 'white')
      .attr('stroke', 'red');
    // return point;
  }
}
