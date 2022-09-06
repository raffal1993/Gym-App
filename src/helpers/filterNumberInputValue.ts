const removeFirstDot = (value: string) => {
  return value[0] === '.' ? `0${value}` : value;
};

const removeSecondZero = (value: string) => {
  return value.slice(0, 2) === '00' ? `0${value.slice(2)}` : value;
};

const removeFirstZero = (value: string) => {
  return value.length > 1 && value[1] !== '.' && value[0] === '0' ? value.slice(1) : value;
};

const convertToEqualOrGreaterThanZero = (value: string) => {
  return Number(value) < 0 ? '0' : value;
};

export const filterNumberInputValue = (value: string) => {
  let newValue = value;
  // REMOVE DOT (.) IF ITS FIRST
  newValue = removeFirstDot(newValue);
  // REMOVE 2nd ZERO IF VALUE STARTS WITH "00"
  newValue = removeSecondZero(newValue);
  // REMOVE ZERO AS FIRST CHAR
  newValue = removeFirstZero(newValue);
  //CONVERT TO EQUAL OR GREATER THAN 0
  newValue = convertToEqualOrGreaterThanZero(newValue);
  return newValue;
};
