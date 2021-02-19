import { arc } from 'd3';
import { parseStyle } from '../../utils/data-vis-util';
import { isFunction } from '../../utils/function-util';
import { isString } from '../../utils/string-util';

const ColumnLabelPosition = {
  top: ({ datum, width, x, y }) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y) ? y(datum) - 5 : +y
  }),
  left: ({ datum, height, x, y }) => ({
    x: isFunction(x) ? x(datum) + 10 : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  middle: ({ datum, width, height, x, y }) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y)
      ? y(datum) + (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  right: ({ datum, width, height, x, y }) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) + 10
      : +x,
    y: isFunction(y)
      ? y(datum) - (isFunction(height) ? height(datum) : +height) / 2
      : +y
  }),
  bottom: ({ datum, width, height, x, y }) => ({
    x: isFunction(x)
      ? x(datum) + (isFunction(width) ? width(datum) : +width) / 2
      : +x,
    y: isFunction(y)
      ? y(datum) + (isFunction(height) ? height(datum) : +height)
      : +y
  })
};

const LineLabelPosition = {
  top: ({ datum, x, y, pointSize }) => ({
    x: isFunction(x) ? x(datum) : +x,
    y: isFunction(y) ? y(datum) - Math.sqrt(pointSize) - 2 : +y
  }),
  left: ({ datum, x, y, pointSize }) => ({
    x: isFunction(x) ? x(datum) - Math.sqrt(pointSize) - 10 : +x,
    y: isFunction(y) ? y(datum) + 5 : +y
  }),
  bottom: ({ datum, x, y, pointSize }) => ({
    x: isFunction(x) ? x(datum) : +x,
    y: isFunction(y) ? y(datum) + Math.sqrt(pointSize) * 2 + 2 : +y
  }),
  right: ({ datum, x, y, pointSize }) => ({
    x: isFunction(x) ? x(datum) + Math.sqrt(pointSize) + 10 : +x,
    y: isFunction(y) ? y(datum) + 5 : +y
  })
};

const PieLabelPosition = {
  inner: ({ datum, innerRadius, radius }) => {
    const arcCentroid = arc()
      .innerRadius(+innerRadius)
      .outerRadius(+radius)
      .centroid(datum);
    return {
      x: arcCentroid[0],
      y: arcCentroid[1]
    };
  },
  outer: ({ datum, radius }) => {
    const arcCentroid = arc()
      .innerRadius(+radius + 50)
      .outerRadius(+radius)
      .centroid(datum);
    return {
      x: arcCentroid[0],
      y: arcCentroid[1]
    };
  }
};

export const LabelPositionType = {
  ColumnLabelPosition,
  LineLabelPosition,
  PieLabelPosition
};

export class Label {
  constructor(props) {
    const { style, position, content, formatter } = props;
    this.position = position;
    this.style = style;
    this.content = content;
    this.formatter = formatter;
  }

  render(params) {
    const { type, selection, text } = params;
    const textGroup = selection.append('text');
    parseStyle(textGroup, this.style);
    textGroup.attr('x', datum => type[this.position]({ datum, ...params }).x);
    textGroup.attr('y', datum => type[this.position]({ datum, ...params }).y);
    textGroup.attr('text-anchor', 'middle');
    if (this.content) {
      textGroup.text(this.content);
    }
    if (isFunction(text)) {
      textGroup.text(datum => text(datum));
    }
    if (isString(text)) {
      textGroup.text(`${text}`);
    }

    if (this.formatter) {
      textGroup.text((datum, index, selectionArray) => {
        return this.formatter(datum, index, selectionArray);
      });
    }
  }
}
