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
import { LabelPositionType, Label } from './components/label';

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
      label,
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

    this.label = label
      ? new Label({ position: 'top', style: { fontSize: 14 }, ...label })
      : undefined;

    this.point = point ? new Point({ ...point }) : undefined;

    this.xAxis = new Axis({ position: 'bottom', ...xAxis });
    this.yAxis = new Axis({ position: 'left', lineStyle: {}, ...yAxis });

    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const axisConfig = {
      selection: chartGroup,
      height: this.innerHeight,
      width: this.innerWidth
    };

    this.yAxis.render({
      scale: this.yScale,
      ...axisConfig
    });

    this.xAxis.render({
      scale: this.xScale,
      ...axisConfig
    });

    const lineGroup = chartGroup.append('g');

    //TODO: 缺少图例组件

    //TODO: 缺少分组展示功能

    //generate line
    lineGroup
      .append('path')
      .attr('d', this.linePath(this.data))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', this.color[0]);

    //generate point
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

    //generate point label
    this.label?.render({
      type: LabelPositionType.PointLabelPosition,
      selection: pointGroup,
      pointSize: this.point?.size,
      x: datum => this.xScale(this.xValue(datum)) + this.xScale.bandwidth() / 2,
      y: datum => this.yScale(this.yValue(datum)),
      text: datum => this.yValue(datum)
    });
  }
}
