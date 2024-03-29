import { group, max, min, scaleBand, scaleLinear, schemeCategory10 } from 'd3';
import Chart from './chart';
import { Axis } from './components/axis';
import { LabelPositionType, Label } from './components/label';
import { Point } from './components/point';

export default class Scatter extends Chart {
  constructor(props) {
    super(props);
    const {
      data,
      xField,
      yField,
      colorField,
      shapeField,
      shape,
      label,
      point,
      xAxis,
      yAxis,
      color = schemeCategory10
    } = props;

    this.xValue = item => item[xField];
    this.yValue = item => item[yField];
    this.colorValue = item => item[colorField];
    this.shapeValue = item => item[shapeField];

    this.yScale = scaleLinear()
      .domain([min(data, this.yValue), max(data, this.yValue)])
      .range([this.innerHeight, 0])
      .nice();

    this.xScale = scaleBand()
      .domain(data.map(this.xValue))
      .range([this.margin.left, this.innerWidth]);

    this.shape = shape;

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

    //TODO: 缺少图例组件

    //generate point
    const groupData = Array.from(
      group(this.data, item => this.colorValue(item)?.toString()),
      ([_, value]) => value
    );

    const pointGroup = chartGroup
      .selectAll('.point')
      .data(groupData)
      .join('g')
      .selectAll('point')
      .data(datum => datum)
      .enter();

    //TODO: 缺少Point的颜色和形状
    this.point?.render({
      selection: pointGroup,
      shape: this.shape,
      shapeField: datum => this.shapeValue(datum),
      x: datum => this.xScale(this.xValue(datum)) + this.xScale.bandwidth() / 2,
      y: datum => this.yScale(this.yValue(datum))
    });

    //generate label
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
