import { isFunction } from '../../utils/function-util';
import { camelToLineConverter } from '../../utils/string-util';

const ColumnLabelPosition = {
  top: (datum, width, height, x, y) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y) ? y(datum) - 5 : +y
  }),
  left: (datum, width, height, x, y) => ({
    x: isFunction(x) ? x(datum) + 10 : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  middle: (datum, width, height, x, y) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  right: (datum, width, height, x, y) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) + 10
      : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  bottom: (datum, width, height, x, y) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height)
      : +y
  })
};

const PieLabelPosition = {
  inner,
  outer
};

export const LabelPositionType = {
  ColumnLabelPosition,
  PieLabelPosition
};

export class Label {
  constructor(props) {
    const { style, position, content } = props;
    this.position = position;
    this.style = style;
    this.content = content;
  }

  render({ type, selection, width, height, x, y, text }) {
    const textGroup = selection.append('text');
    for (const item in this.style) {
      if (Object.hasOwnProperty.call(this.style, item)) {
        textGroup.attr(camelToLineConverter(item), this.style[item]);
      }
    }
    textGroup.attr(
      'x',
      datum => type[this.position](datum, width, height, x, y).x
    );
    textGroup.attr(
      'y',
      datum => type[this.position](datum, width, height, x, y).y
    );

    textGroup.attr('text-anchor', 'middle');
    textGroup.text(datum => (this.content ? this.content : text(datum)));
    return textGroup;
  }
}
