import { camelToLineConverter } from '../utils/string-util';

export const LabelPosition = {
  top: (datum, width, height, x, y) => ({
    x: x(datum) + width(datum) / 2,
    y: y(datum) - 5
  }),
  left: (datum, width, height, x, y) => ({
    x: x(datum) + 10,
    y: y(datum) - height(datum) / 2
  }),
  middle: (datum, width, height, x, y) => ({
    x: x(datum) + width(datum) / 2,
    y: y(datum) - height(datum) / 2
  }),
  right: (datum, width, height, x, y) => ({
    x: x(datum) + width(datum) + 10,
    y: y(datum) - height(datum) / 2
  }),
  bottom: (datum, width, height, x, y) => ({
    x: x(datum) + width(datum) / 2,
    y: y(datum) - height(datum)
  })
};

export class Label {
  constructor(props) {
    const { style, position, content } = props;
    this.position = LabelPosition[position] === undefined ? 'top' : position;
    this.style = style;
    this.content = content;
  }

  render(selection, width, height, x, y, text) {
    const textGroup = selection.append('text');
    for (const item in this.style) {
      if (Object.hasOwnProperty.call(this.style, item)) {
        textGroup.attr(camelToLineConverter(item), this.style[item]);
      }
    }
    textGroup.attr(
      'x',
      datum => LabelPosition[this.position](datum, width, height, x, y).x
    );
    textGroup.attr(
      'y',
      datum => LabelPosition[this.position](datum, width, height, x, y).y
    );

    textGroup.attr('text-anchor', 'middle');
    textGroup.text(datum => (this.content ? this.content : text(datum)));
    return textGroup;
  }
}
