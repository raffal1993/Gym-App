import WeatherCardItem from 'components/Molecules/WeatherCardItem/WeatherCardItem';
import { WeatherDataType } from 'components/Organisms/Weather/WeatherTypes';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Tab } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TitleStyled } from '../CardStyled/CardStyled.styled';
import WeatherCardTabs from '../CustomTabs/CustomTabs';
import { Wrapper } from './WeatherCard.styled';

const WeatherCard = ({ name, sunrise, sunset, dailyWeatherList }: WeatherDataType) => {
  return (
    <Wrapper>
      <TitleStyled>{name}</TitleStyled>
      {sunrise && (
        <div className="sunTime sunrise">
          <WbSunnyIcon />
          <ArrowUpwardIcon />
          <p>{sunrise}</p>
        </div>
      )}
      {sunset && (
        <div className="sunTime sunset">
          <p>{sunset}</p>
          <WbSunnyIcon />
          <ArrowDownwardIcon />
        </div>
      )}

      <WeatherCardTabs className="weatherTabs">
        {dailyWeatherList.map((el) => (
          <Tab key={uuidv4()} label={<WeatherCardItem dailyWeatherInfos={el} />}></Tab>
        ))}
      </WeatherCardTabs>
    </Wrapper>
  );
};

export default WeatherCard;
