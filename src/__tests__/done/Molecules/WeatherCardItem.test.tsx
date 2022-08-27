import { cleanup, screen } from '@testing-library/react';
import WeatherCardItem from 'components/Molecules/WeatherCardItem/WeatherCardItem';
import { DailyWeatherInfos } from 'components/Organisms/Weather/WeatherTypes';
import React from 'react';
import { mockedDailyWeatherInfos } from '../../mocks/mockedWeatherData';
import { renderWithProviders } from '../../utils/test-utils';

const rerender = (props: Partial<DailyWeatherInfos>) => {
  cleanup();
  const dailyWeatherInfos = { ...mockedDailyWeatherInfos(1), ...props };
  renderWithProviders(<WeatherCardItem dailyWeatherInfos={dailyWeatherInfos} />);
};

describe('testing WeatherCardItem component', () => {
  const iconImg = () => screen.getByRole('img', { name: /weatherimage/i });

  const temperature = (temp: string) => screen.getByText(new RegExp(temp, 'i'));

  const sensibleTemperature = (temp: string) => screen.getByText(new RegExp(`${temp}°C`, 'i'));

  const pressure = (pressure: string) => screen.getByText(new RegExp(`${pressure} hPa`, 'i'));

  const possibilityOfPrecipitation = (number: number) =>
    screen.getByText(new RegExp(`${number}%`, 'i'));

  beforeEach(() => {
    renderWithProviders(<WeatherCardItem dailyWeatherInfos={mockedDailyWeatherInfos(1)} />);
    jest.restoreAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByTestId(/AccessTimeIcon/i)).toBeInTheDocument();
    expect(screen.getByText(/2001/i)).toBeInTheDocument();
    expect(iconImg()).toBeInTheDocument();
    expect(temperature('11.0')).toBeInTheDocument();
    expect(temperature('11.0').children[0]).toHaveTextContent('°C');
    expect(screen.getByText(/testDescription1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sensible temperature:/i)).toBeInTheDocument();
    expect(sensibleTemperature('21.0')).toBeInTheDocument();
    expect(screen.getByText(/Pressure:/i)).toBeInTheDocument();
    expect(pressure('1.0')).toBeInTheDocument();
    expect(screen.getByText(/Possibility of precipitation:/i)).toBeInTheDocument();
    expect(possibilityOfPrecipitation(100)).toBeInTheDocument();
    expect(screen.getByText(/Wind:/i)).toBeInTheDocument();
    expect(screen.getByTestId(/KeyboardDoubleArrowDownIcon/i)).toBeInTheDocument();
    expect(screen.getByText(/1 m\/s/i)).toBeInTheDocument();
  });

  test('image src', () => {
    expect(iconImg()).toHaveAttribute('src', 'http://openweathermap.org/img/w/testSRC1.png');
    rerender({ icon: '' });
    expect(iconImg()).toHaveAttribute('src', '');
  });
  test('display temperature - 1 digit after dot', () => {
    rerender({ temperature: 23.14343 });
    expect(temperature('23.1')).toBeInTheDocument();
  });
  test('display sensibleTemperature - 1 digit after dot', () => {
    rerender({ sensibleTemperature: 20.4666 });
    expect(sensibleTemperature('20.5')).toBeInTheDocument();
  });
  test('display pressure - 1 digit after dot', () => {
    rerender({ pressure: 102.74343 });
    expect(pressure('102.7')).toBeInTheDocument();
  });
  test('display possibilityOfPrecipitation (0-100) in %', () => {
    rerender({ possibilityOfPrecipitation: 0.434543 });
    expect(possibilityOfPrecipitation(43)).toBeInTheDocument();
  });
});
