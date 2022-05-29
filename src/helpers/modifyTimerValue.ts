export const modifyTimerValue = (value: number) => {
  const timerValues = value.toString().split('.');

  let firstValue = timerValues[0];
  let secondValue = timerValues[1];

  firstValue = firstValue.length === 1 ? `0${firstValue}` : firstValue;

  secondValue = !secondValue ? `00` : secondValue.length === 1 ? `${secondValue}0` : secondValue;

  return `${firstValue}:${secondValue}`;
};
