import { arc, min, pie, scaleOrdinal, schemeCategory10 } from 'd3';
import Chart from './chart';
import { LabelPositionType } from './components/label';

export default class Pie extends Chart {
  constructor(props) {
    super(props);
    const {
      data,
      angleField,
      colorField,
      innerRadius = 0,
      radius = 0.8,
      cornerRadius = 0,
      appendPadding = 0,
      color = schemeCategory10
    } = props;

    this.colorValue = item => item[colorField];
    this.angleValue = item => item[angleField];

    this.pieData = pie()
      .value(d => this.angleValue(d))
      .padAngle(appendPadding)(data);

    const minSize = Math.min(this.innerWidth, this.innerHeight);

    if (innerRadius < 0) {
      innerRadius = 0;
    } else if (innerRadius > 1) {
      innerRadius = 1;
    }
    this.innerRadius = (innerRadius * minSize) / 2;

    if (radius < 0) {
      radius = 0;
    } else if (radius > 1) {
      radius = 1;
    }
    this.radius = (radius * minSize) / 2;

    this.arc = arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius)
      .cornerRadius(cornerRadius);

    this.colorScale = scaleOrdinal(color).domain(
      this.pieData.map(d => d.index)
    );

    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.margin.left + this.innerWidth / 2}, ${this.margin
          .top +
          this.innerHeight / 2})`
      );

    chartGroup
      .selectAll('path')
      .data(this.pieData)
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', datum => this.colorScale(datum.index));

    const labelGroup = chartGroup
      .selectAll('g')
      .data(this.pieData)
      .enter()
      .append('g');

    this.label?.render({
      type: LabelPositionType.PieLabelPosition,
      selection: labelGroup,
      radius: this.radius,
      innerRadius: this.innerRadius,
      text: datum => this.angleValue(datum.data)
    });
  }
}
