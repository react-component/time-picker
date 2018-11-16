
export function getTimeFormat(format) {
  if (Array.isArray(format)) {
    return format.length ? format[0] : undefined;
  }
  return format;
}

export function formatTime(value, format) {
  if (!value) {
    return '';
  }
  return value.format(getTimeFormat(format));
}
