import { camelToLineConverter } from './string-util';

function typeCheck(args, type) {
  return Object.prototype.toString.call(args) === `[object ${type}]`;
}

export function isFunction(fn) {
  return typeCheck(fn, 'Function');
}

export function isObject(obj) {
  return typeCheck(obj, 'Object');
}

export function isArray(arr) {
  return typeCheck(arr, 'Array');
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
