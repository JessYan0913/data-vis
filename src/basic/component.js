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
    const { style, position, content } = props;
    this.position = LabelPosition[position];
    this.style = style;
    this.content = content;
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
    textGroup.text(datum => (this.content ? this.content : text(datum)));
    return textGroup;
  }
}
