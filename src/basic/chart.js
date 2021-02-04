import { select } from 'd3';
import { Label } from './component';

export default class Chart {
  constructor(props) {
    const {
      container,
      title,
      data,
      label,
      width,
      height,
      margin = { top: 30, left: 30, bottom: 30, right: 30 }
    } = props;

    this.svg = select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    this.innerWidth = width - margin.left - margin.right;
    this.innerHeight = height - margin.top - margin.bottom;
    this.title = title;
    this.data = data;
    this.label = label ? new Label({ ...label }) : undefined;
    this.margin = margin;
  }
}
