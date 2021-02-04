import { camelToLineConverter } from '../utils/string-util';

export const LabelPosition = {
  top: 0,
  left: 1,
  middle: 2,
  right: 3,
  bottom: 4
};

export class Label {
  constructor(props) {
    const { style, position } = props;
    this.position = LabelPosition[position];
    this.style = style;
  }

  render(selection, x, y, text) {
    const textGroup = selection.append('text');
    for (const item in this.style) {
      if (Object.hasOwnProperty.call(this.style, item)) {
        textGroup.attr(camelToLineConverter(item), this.style[item]);
      }
    }
    textGroup.attr('x', datum => x(datum));
    textGroup.attr('y', datum => y(datum));
    textGroup.text(datum => text(datum));
    return textGroup;
  }
}
