export const assertBetween = (min, max, value) => Math.min(max, Math.max(min, value))

export const NUMBER_FORMAT = new Intl.NumberFormat(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
var isFirefox = typeof InstallTrigger !== 'undefined';
export const format = (value) => {
  if (isFirefox) return NUMBER_FORMAT.format(value)
  return value.toFixed(2).toLocaleString(value)
}