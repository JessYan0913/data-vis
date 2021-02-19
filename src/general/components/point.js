import { symbol, symbols } from 'd3';
import { parseStyle } from '../utils/data-vis-util';

const PointShape = {
  circle: symbols[0],
  cross: symbols[1],
  diamond: symbols[2],
  square: symbols[3],
  star: symbols[4],
  triangle: symbols[5],
  wye: symbols[6]
};

export class Point {
  constructor(props) {
    const { shape, style, size = 80 } = props;
    this.shape = PointShape[shape] ?? PointShape.circle;
    this.size = size;
    this.style = style;
  }

  render(params) {
    const { selection, x, y } = params;
    const symbolPath = selection.append('path').attr(
      'd',
      symbol()
        .type(this.shape)
        .size(this.size)
    );
    parseStyle(symbolPath, this.style);
    symbolPath.attr(
      'transform',
      datum => `translate(${x(datum)}, ${y(datum)})`
    );
  }
}
