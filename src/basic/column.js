import {
  max,
  min,
  scaleBand,
  scaleLinear,
  schemeCategory10,
  axisLeft,
  axisRight
} from 'd3';
import Chart from './chart';

export default class Column extends Chart {
  constructor(props) {
    super({ ...props });
    const { data, xField, yField, color = schemeCategory10 } = props;
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

    this.color = color;
  }

  render() {
    const g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    g.append('g').call(axisRight(this.yScale).tickSize(innerWidth));
    let s = g.selection();
    s.select('.domain').remove();
    s.selectAll('.tick line')
      .filter(Number)
      .attr('stroke', '#777');
    s.selectAll('.tick text')
      .attr('x', 4)
      .attr('dy', -4);

    g.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', datum => this.xScale(this.xValue(datum)))
      .attr('y', datum => this.yScale(Math.max(0, this.yValue(datum))))
      .attr('width', this.xScale.bandwidth())
      .attr('height', datum =>
        Math.abs(this.yScale(this.yValue(datum)) - this.yScale(0))
      )
      .attr('fill', () => {
        if (this.color instanceof Array) {
          return this.color[0];
        }
        return this.color;
      });
  }
}
