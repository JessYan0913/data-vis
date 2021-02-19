import { camelToLineConverter } from './string-util';

export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function parseStyle(selection, style) {
  if (!selection || !isObject(style)) {
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
