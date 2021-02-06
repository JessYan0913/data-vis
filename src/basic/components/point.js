import { symbol, symbols } from 'd3';

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
    const { shape, size, style } = props;
    this.shape = PointShape[shape] ?? PointShape.circle;
    this.size = size;
    this.style = style;
  }

  render({ selection }) {
    const symbolPath = selection.append('path').attr(
      'd',
      symbol()
        .type(this.shape)
        .size(this.size)
    );
    for (const item in this.style) {
      if (Object.hasOwnProperty.call(this.style, item)) {
        symbolPath.attr(camelToLineConverter(item), this.style[item]);
      }
    }
  }
}
