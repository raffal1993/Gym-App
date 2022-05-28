export const filterNumberInputValue = (value: string) => {
  value = value[0] === '.' ? `0${value}` : value;
  value = value.slice(0, 2) === '00' ? `0${value.slice(2)}` : value;
  value = value.length > 1 && value[1] !== '.' && value[0] === '0' ? value.slice(1) : value;

  return value;
};
