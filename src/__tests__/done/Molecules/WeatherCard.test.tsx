import { cleanup, screen } from '@testing-library/react';
import WeatherCard from 'components/Molecules/WeatherCard/WeatherCard';
import React from 'react';
import { mockedWeatherData } from '../../mocks/mockedWeatherData';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Molecules/WeatherCardItem/WeatherCardItem', () => ({
  __esModule: true,
  default: () => {
    return <div>WeatherCardItem</div>;
  },
}));
describe('testing WeatherCard component', () => {
  beforeEach(() => {
    renderWithProviders(<WeatherCard {...mockedWeatherData()} />);
    jest.restoreAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /testName1/i })).toBeInTheDocument();
    expect(screen.getAllByTestId(/WbSunnyIcon/i)).toHaveLength(2);
    expect(screen.getByTestId(/ArrowUpwardIcon/i)).toBeInTheDocument();
    expect(screen.getByTestId(/ArrowDownwardIcon/i)).toBeInTheDocument();
    expect(screen.getByText(/testSunrise1/i)).toBeInTheDocument();
    expect(screen.getByText(/testSunset1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/WeatherCardItem/i)).toHaveLength(3);
  });

  test('if sunrise and sunset props are not provided', () => {
    cleanup();
    renderWithProviders(
      <WeatherCard {...{ ...mockedWeatherData(), sunrise: undefined, sunset: undefined }} />,
    );
    expect(screen.queryByTestId(/WbSunnyIcon/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/ArrowUpwardIcon/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/ArrowDownwardIcon/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/testSunrise1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/testSunset1/i)).not.toBeInTheDocument();
  });
});
