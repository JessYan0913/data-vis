import { arc, pie, scaleOrdinal, schemePaired } from 'd3';
import Chart from './chart';
import { LabelPositionType } from './components/label';
import { Statistic } from './components/statistic';

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
      color = schemePaired,
      statistic
    } = props;

    this.colorValue = item => item[colorField];
    this.angleValue = item => item[angleField];

    this.pieData = pie()
      .value(d => this.angleValue(d))
      .padAngle(appendPadding)(data);

    const minSize = Math.min(this.innerWidth, this.innerHeight);

    //calculate innerRadius
    if (innerRadius < 0) {
      innerRadius = 0;
    } else if (innerRadius > 1) {
      innerRadius = 1;
    }
    this.innerRadius = (innerRadius * minSize) / 2;

    //calculate radius
    if (radius < 0) {
      radius = 0;
    } else if (radius > 1) {
      radius = 1;
    }
    this.radius = (radius * minSize) / 2;

    this.arcPath = arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius)
      .cornerRadius(cornerRadius);

    this.colorScale = scaleOrdinal(color).domain(
      this.pieData.map(d => d.index)
    );

    this.color = color;
    this.statistic = new Statistic({ ...statistic });
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

    //generate statistic
    this.statistic?.render({ selection: chartGroup });

    //generate pie chart
    chartGroup
      .selectAll('path')
      .data(this.pieData)
      .enter()
      .append('path')
      .attr('d', this.arcPath)
      .attr('fill', datum => this.colorScale(datum.index));

    //generate label
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
