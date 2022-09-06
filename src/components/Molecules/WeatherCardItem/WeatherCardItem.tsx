import { FC } from 'react';
import { DailyWeatherInfos } from 'components/Organisms/Weather/WeatherTypes';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Wrapper } from './WeatherCardItem.styled';

const weatherIconUrl = (url: string) => {
  return url ? `http://openweathermap.org/img/w/${url}.png` : '';
};

interface WeatherCardItemProps {
  dailyWeatherInfos: DailyWeatherInfos;
}

const WeatherCardItem: FC<WeatherCardItemProps> = ({ dailyWeatherInfos }) => {
  const {
    time,
    temperature,
    sensibleTemperature,
    pressure,
    possibilityOfPrecipitation,
    description,
    icon,
    windDeg,
    windSpeed,
  } = dailyWeatherInfos;

  return (
    <Wrapper wind_deg={windDeg}>
      <p className="time">
        <AccessTimeIcon />
        {time}
      </p>
      <div className="imgContainer">
        <img src={weatherIconUrl(icon)} alt="weatherImage" />
        <p>
          {temperature.toFixed(1)} <span>°C</span>
        </p>
      </div>
      <p className="description">{description}</p>
      <div className="infos">
        <p>
          <span> Sensible temperature:</span>
          <span>{sensibleTemperature.toFixed(1)}°C</span>
        </p>
        <p>
          <span>Pressure: </span>
          <span>{pressure.toFixed(1)} hPa</span>
        </p>
        <p>
          <span>Possibility of precipitation: </span>
          <span>{(possibilityOfPrecipitation * 100).toFixed(0)}%</span>
        </p>
        <p>
          <span>Wind: </span>
          <span>
            <KeyboardDoubleArrowDownIcon className="windArrow" /> {windSpeed} m/s
          </span>
        </p>
      </div>
    </Wrapper>
  );
};

export default WeatherCardItem;
