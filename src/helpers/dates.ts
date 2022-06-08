const API_UTC_4_OFFSET_TO_UTC = 60 * 60 * 4;

export const getDayName = (timestamp: number, timezoneOffset: number) => {
  const date = new Date((timestamp - API_UTC_4_OFFSET_TO_UTC + timezoneOffset) * 1000);
  const day = date.getDay();
  const today = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (dayNames[day] === dayNames[today]) return 'Today';
  return dayNames[day];
};

export const getTime = (
  timestamp: number,
  timezoneOffset: number,
  type: 'sunriseOrSunset' | 'default' = 'default',
) => {
  let date;
  if (type === 'sunriseOrSunset') {
    const localTimezoneOffset = new Date().getTimezoneOffset() * 60;
    date = new Date((timestamp + localTimezoneOffset + timezoneOffset) * 1000);
  } else {
    date = new Date((timestamp - API_UTC_4_OFFSET_TO_UTC + timezoneOffset) * 1000);
  }

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
};
