import {
  scaleBand,
  scaleLinear,
  schemeCategory10,
  min,
  max,
  line,
  curveLinear,
  curveNatural,
  curveBasis,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from 'd3';
import Chart from './chart';
import { Axis } from './components/axis';
import { Point } from './components/point';

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
      point,
      lineType = 'linear',
      xAxis,
      yAxis,
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

    this.point = point ? new Point({ ...point }) : undefined;

    this.xAxis = new Axis({ position: 'bottom', ...xAxis });
    this.yAxis = new Axis({ position: 'left', lineStyle: {}, ...yAxis });
    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.yAxis.render({
      selection: chartGroup,
      scale: this.yScale,
      height: this.innerHeight,
      width: this.innerWidth
    });

    this.xAxis.render({
      selection: chartGroup,
      scale: this.xScale,
      height: this.innerHeight,
      width: this.innerWidth
    });

    const lineGroup = chartGroup.append('g');

    //generate column
    lineGroup
      .append('path')
      .attr('d', this.linePath(this.data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', 'green');

    const pointGroup = lineGroup
      .append('g')
      .selectAll('point')
      .data(this.data)
      .enter();

    this.point?.render({
      selection: pointGroup,
      x: datum => this.xScale(this.xValue(datum)) + this.xScale.bandwidth() / 2,
      y: datum => this.yScale(this.yValue(datum))
    });
  }
}
