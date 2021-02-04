export function smallCamelConverter(str, suffix = '') {
  if (!str) return '';
  return (
    str
      .split(/-|_|\.|\//)
      .filter(value => {
        return value && value.trim();
      })
      .map(value => {
        return value.replace(/^\S/, s => s.toUpperCase());
      })
      .join('')
      .replace(/^\S/, s => s.toLowerCase()) + suffix
  );
}

export function camelToLineConverter(str) {
  if (!str) return '';
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
