import { select } from 'd3';

export default class Chart {
  constructor(props) {
    const {
      container,
      data,
      width,
      height,
      margin = { top: 20, left: 20, bottom: 20, right: 20 }
    } = props;

    this.svg = select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    this.innerWidth = width - margin.left - margin.right;
    this.innerHeight = height - margin.top - margin.bottom;
    this.data = data;
    this.margin = margin;
  }
}
