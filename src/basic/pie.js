import { arc, min, pie, scaleOrdinal, schemeCategory10 } from 'd3';
import Chart from './chart';

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
      color = schemeCategory10
    } = props;

    this.colorValue = item => item[colorField];
    this.angleValue = item => item[angleField];

    this.pie = pie().value(d => this.angleValue(d))(data);

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

    this.colorScale = scaleOrdinal(color).domain(this.pie.map(d => d.index));

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
      .data(this.pie)
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', datum => this.colorScale(datum.index));

    chartGroup
      .selectAll('text')
      .data(this.pie)
      .enter()
      .append('text')
      .text(datum => this.angleValue(datum.data))
      .attr('x', datum => {
        return this.arc
          .innerRadius(this.radius - this.innerRadius)
          .centroid(datum)[0];
      })
      .attr(
        'y',
        datum =>
          this.arc
            .innerRadius(this.radius - this.innerRadius)
            .centroid(datum)[1]
      )
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle');
  }
}
