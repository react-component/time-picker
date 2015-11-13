import DateTimeFormat from 'gregorian-calendar-format';

export function getFormatter(format, locale) {
  if (typeof format === 'string') {
    return new DateTimeFormat(format, locale.format);
  }
  return format;
}
