import { extent, max, scaleBand, scaleLinear, schemeCategory10 } from 'd3';
import Chart from './chart';

export default class Column extends Chart {
  constructor(props) {
    super({ ...props });
    const { data, xField, yField, color = schemeCategory10 } = props;
    const xValue = item => item[xField];
    const yValue = item => item[yField];

    this.yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([this.innerHeight, 0]);

    this.xScale = scaleBand()
      .domain(data.map(xValue))
      .range([this.margin.left, this.innerWidth])
      .padding(0.2);

    this.xValue = xValue;
    this.yValue = yValue;
    this.color = color;
  }

  render() {
    const g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    g.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', datum => this.xScale(this.xValue(datum)))
      .attr('y', datum => this.yScale(this.yValue(datum)))
      .attr('width', this.xScale.bandwidth())
      .attr('height', datum => {
        return this.innerHeight - this.yScale(this.yValue(datum));
      })
      .attr('fill', (datum, index) => {
        if (this.color instanceof Array) {
          return this.color[0];
        }
        return this.color;
      });
  }
}
