import {
  max,
  min,
  scaleBand,
  scaleLinear,
  schemeCategory10,
  axisRight,
  axisBottom
} from 'd3';
import Chart from './chart';
import { LabelPositionType } from './components/label';

export default class Column extends Chart {
  constructor(props) {
    super(props);
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
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    //generate yAxis
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
    chartGroup
      .append('g')
      .call(axisBottom(this.xScale))
      .attr('transform', `translate(${0}, ${this.innerHeight})`);

    //generate column
    const columnGroup = chartGroup
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('g');

    columnGroup
      .append('rect')
      .attr('x', datum => this.xScale(this.xValue(datum)))
      .attr('y', datum => this.yScale(Math.max(0, this.yValue(datum))))
      .attr('width', this.xScale.bandwidth())
      .attr('height', datum =>
        Math.abs(
          this.yScale(this.yValue(datum)) - this.yScale(this.margin.bottom)
        )
      )
      .attr('fill', () => {
        if (this.color instanceof Array) {
          return this.color[0];
        }
        return this.color;
      });

    //generate column label
    this.label?.render({
      type: LabelPositionType.ColumnLabelPosition,
      selection: columnGroup,
      width: () => this.xScale.bandwidth(),
      height: datum =>
        this.yScale(this.yValue(datum)) - this.yScale(this.margin.bottom),
      x: datum => this.xScale(this.xValue(datum)),
      y: datum => this.yScale(this.yValue(datum)),
      text: datum => this.yValue(datum)
    });
  }
}
