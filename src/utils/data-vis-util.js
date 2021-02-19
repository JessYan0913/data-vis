import { camelToLineConverter } from './string-util';

export function parseStyle(selection, style) {
  if (!selection) {
    return;
  }
  for (const item in style) {
    if (Object.hasOwnProperty.call(style, item)) {
      selection.attr(camelToLineConverter(item), style[item]);
    }
  }
}

export function unique(arr) {
  return [...new Set(arr)];
}
