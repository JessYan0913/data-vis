import {
  max,
  min,
  scaleBand,
  scaleLinear,
  schemeCategory10,
  axisBottom,
  group,
  axisLeft
} from 'd3';
import Chart from './chart';
import { LabelPositionType } from './components/label';
import { unique } from './utils/data-vis-util';

export default class Column extends Chart {
  constructor(props) {
    super(props);
    const {
      data,
      xField,
      yField,
      seriesField,
      color = schemeCategory10
    } = props;
    this.xValue = item => item[xField];
    this.yValue = item => item[yField];
    this.seriesValue = item => item[seriesField];

    this.minValue = min(data, this.yValue);
    this.maxValue = max(data, this.yValue);

    this.yScale = scaleLinear()
      .domain([this.minValue, this.maxValue])
      .range([this.innerHeight, this.margin.top])
      .nice();

    this.xKeys = unique(data.map(this.xValue));

    this.xScale = scaleBand()
      .domain(this.xKeys)
      .range([this.margin.left, this.innerWidth])
      .padding(0.2);

    this.seriesKeys = unique(data.map(this.seriesValue));

    this.seriesScale = scaleBand()
      .domain(this.seriesKeys)
      .range([0, this.xScale.bandwidth()])
      .padding(0.05);

    this.color = color;
  }

  render() {
    const chartGroup = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    //generate yAxis
    //TODO: 坐标轴应该抽成组件
    const yAxisGroup = chartGroup
      .append('g')
      .call(axisLeft(this.yScale).tickSize(0));
    yAxisGroup.select('.domain').remove();
    yAxisGroup
      .selectAll('.tick')
      .select('line')
      .attr('x2', this.innerWidth)
      .attr('stroke-dasharray', '5,10,2,5');

    //generate xAxis
    //TODO: 坐标轴应该抽成组件
    const xAxisGroup = chartGroup
      .append('g')
      .call(axisBottom(this.xScale))
      .attr('transform', `translate(${0}, ${this.innerHeight})`);
    xAxisGroup
      .selectAll('.tick')
      .select('line')
      .attr('y2', -this.innerHeight);

    const groupData = Array.from(
      group(this.data, this.xValue),
      ([key, value]) => ({ key, value })
    );

    //generate column
    const columnGroup = chartGroup
      .selectAll('column')
      .data(groupData)
      .join('g')
      .attr('transform', datum => {
        return `translate(${this.xScale(datum.key)}, 0)`;
      });

    const seriesColumnGroup = columnGroup
      .selectAll('rect')
      .data(datum => datum.value)
      .enter()
      .append('g');

    seriesColumnGroup
      .append('rect')
      .attr('x', datum => this.seriesScale(this.seriesValue(datum)))
      .attr('y', datum => this.yScale(Math.max(0, this.yValue(datum))))
      .attr('width', this.seriesScale.bandwidth())
      .attr('height', datum =>
        this.minValue < 0
          ? Math.abs(this.yScale(this.yValue(datum)) - this.yScale(0))
          : Math.abs(this.yScale(this.yValue(datum)) - this.innerHeight)
      )
      .attr('fill', (_, index) => {
        if (this.color instanceof Array) {
          return this.color[index];
        }
        return this.color;
      });

    //generate column label
    this.label?.render({
      type: LabelPositionType.ColumnLabelPosition,
      selection: seriesColumnGroup,
      width: () => this.seriesScale.bandwidth(),
      height: datum =>
        this.minValue < 0
          ? Math.abs(this.yScale(this.yValue(datum)) - this.yScale(0))
          : Math.abs(this.yScale(this.yValue(datum)) - this.innerHeight),
      x: datum => this.seriesScale(this.seriesValue(datum)),
      y: datum => this.yScale(Math.max(0, this.yValue(datum))),
      text: datum => this.yValue(datum)
    });
  }
}
