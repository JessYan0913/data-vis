import { axisBottom, axisLeft, axisRight, axisTop } from 'd3';
import { parseStyle } from '../utils/data-vis-util';

const AxisPosition = {
  top: ({ selection, scale }) => selection.append('g').call(axisTop(scale)),
  left: ({ selection, scale }) =>
    selection.append('g').call(axisLeft(scale).tickSize(0)),
  bottom: ({ selection, scale, height }) =>
    selection
      .append('g')
      .call(axisBottom(scale))
      .attr('transform', `translate(${0}, ${height})`),
  right: ({ selection, scale, width }) =>
    selection
      .append('g')
      .call(axisRight(scale).tickSize(0))
      .attr('transform', `translate(${width}, ${0})`)
};

const AxisLine = {
  top: ({ selection, height }) => selection.attr('y2', height),
  left: ({ selection, width }) => selection.attr('x2', width),
  bottom: ({ selection, height }) => selection.attr('y2', -height),
  right: ({ selection, width }) => selection.attr('x2', -width)
};

export class Axis {
  constructor(props) {
    const { title, position, lineStyle } = props;
    this.position = position;
    this.title = title;
    this.lineStyle = lineStyle;
  }

  render(params) {
    const axisGroup = AxisPosition[this.position]({ ...params });
    axisGroup.select('.domain').remove();
    if (this.lineStyle) {
      axisGroup
        .selectAll('.tick')
        .select('line')
        .call(selection => AxisLine[this.position]({ ...params, selection }))
        .call(selection => parseStyle(selection, this.lineStyle));
    }
  }
}
