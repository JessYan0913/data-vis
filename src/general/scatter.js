import { max, min, scaleBand, scaleLinear, schemeCategory10 } from 'd3';
import Chart from './chart';
import { Axis } from './components/axis';
import { Label } from './components/label';
import { Point } from './components/point';

export default class Scatter extends Chart {
  constructor(props) {
    super(props);
    const {
      data,
      xField,
      yField,
      label,
      point,
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

    this.label = label
      ? new Label({ position: 'top', style: { fontSize: 14 }, ...label })
      : undefined;

    this.point = new Point({
      shape: 'circle',
      style: { fill: color[0] },
      ...point
    });

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

    const pointGroup = chartGroup
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
