export const isMaxDigitsAfterDot = (value: string, MAX_DIGITS_AFTER_DOT: number): boolean => {
  return value.split('.').length === 2 && value.split('.')[1].length === MAX_DIGITS_AFTER_DOT + 1;
};
