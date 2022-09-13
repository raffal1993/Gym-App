export const modifyTimerValue = (value: number) => {
  const timer = (value / 10).toFixed().toString();

  switch (timer.length) {
    case 0:
      return `00:00`;
    case 1:
      return `00:0${timer}`;
    case 2:
      return `00:${timer}`;
    case 3:
      return `0${timer[0]}:${timer.slice(-2)}`;
    default:
      return `${timer.slice(0, -2)}:${timer.slice(-2)}`;
  }
};
