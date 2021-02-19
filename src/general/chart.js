import { select } from 'd3';

export default class Chart {
  constructor(props) {
    const {
      container,
      title,
      data,
      width,
      height,
      margin = { top: 40, left: 40, bottom: 40, right: 40 }
    } = props;

    this.svg = select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    this.innerWidth = width - margin.left - margin.right;
    this.innerHeight = height - margin.top - margin.bottom;
    this.title = title;
    this.data = data;
    this.margin = margin;
  }
}
