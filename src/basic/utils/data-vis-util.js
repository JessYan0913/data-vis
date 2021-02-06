import { camelToLineConverter } from '../utils/string-util';

export function parseStyle(selection, style) {
  for (const item in style) {
    if (Object.hasOwnProperty.call(style, item)) {
      selection.attr(camelToLineConverter(item), style[item]);
    }
  }
}
