import { axisBottom, axisLeft, axisRight, axisTop } from 'd3';
import { parseStyle } from '../../utils/data-vis-util';

class AxisPosition {
  constructor(props) {
    const { selection, scale, height, width, title } = props;

    this.scale = scale;
    this.height = height;
    this.width = width;
    this.title = {
      offset: 30,
      autoRotate: true,
      style: { fill: 'black' },
      ...title
    };
    this.axisGroup = selection.append('g');
    this.axisTitle = this.title.text
      ? this.axisGroup.append('text').text(this.title.text)
      : undefined;

    parseStyle(this.axisTitle, this.title.style);
  }

  top() {
    this.axisTitle?.attr(
      'transform',
      `translate(${this.width / 2}, ${-this.title.offset})`
    );
    return this.axisGroup.call(axisTop(this.scale));
  }

  left() {
    this.axisTitle?.attr(
      'transform',
      this.title.autoRotate
        ? `rotate(${270}),translate(${-this.height / 2}, ${-this.title.offset})`
        : `translate(${-this.title.offset / 2}, ${this.height / 2})`
    );
    return this.axisGroup.call(axisLeft(this.scale).tickSize(0));
  }

  bottom() {
    this.axisTitle?.attr(
      'transform',
      `translate(${this.width / 2}, ${this.title.offset})`
    );
    return this.axisGroup
      .call(axisBottom(this.scale))
      .attr('transform', `translate(${0}, ${this.height})`);
  }

  right() {
    this.axisTitle?.attr(
      'transform',
      this.title.autoRotate
        ? `rotate(${270}),translate(${-this.height / 2}, ${this.title.offset})`
        : `translate(${this.title.offset / 2}, ${this.height / 2})`
    );
    return this.axisGroup
      .call(axisRight(this.scale).tickSize(0))
      .attr('transform', `translate(${this.width}, ${0})`);
  }
}

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
    const axisGroup = new AxisPosition({ ...params, title: this.title })[
      this.position
    ]();
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
