import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { setSubPageID } from 'app/slices/pagesSlice';
import { setupStore } from 'app/store';
import Weather from 'components/Organisms/Weather/Weather';
import React from 'react';
import { mockedWeatherDataAPI, todayWeatherInfosAPI } from '__tests__/mocks/mockedWeatherData';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSidebarList, mockedSubPageID } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

const mockWeatherAPI = jest.fn();

jest.mock('api/WeatherAPI/instance', () => ({
  WeatherApiInstance: {
    get: () => mockWeatherAPI(),
  },
}));

const getCurrentPosition = jest.fn();

Object.assign(navigator, {
  geolocation: {
    getCurrentPosition,
  },
});

jest.mock('components/Molecules/WeatherCard/WeatherCard', () => {
  return {
    __esModule: true,
    default: () => <div>WeatherCard</div>,
  };
});

const initialState = {
  pagesState: {
    subPageID: mockedSubPageID,
    sidebarList: mockedSidebarList,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = (newStore = store) => {
  cleanup();
  renderWithProviders(<Weather />, {
    store: newStore,
  });
};

describe('testing Weather component', () => {
  const findLocationButton = () => screen.getByTestId(/TravelExploreIcon/i);
  const searchWeatherButton = () => screen.getByRole('button', { name: /search weather/i });
  const input = () => screen.getByRole('textbox');

  beforeEach(() => {
    renderWithProviders(<Weather />, { store });
    jest.restoreAllMocks();
  });

  test('elements displayed on initial render', () => {
    expect(findLocationButton()).toBeInTheDocument();
    expect(screen.getByTestId(/searchPanel/i)).toBeInTheDocument();
  });

  test('get current location', async () => {
    fireEvent.click(findLocationButton());
    expect(getCurrentPosition).toHaveBeenCalled();
  });

  describe('handle error', () => {
    test('input is empty', () => {
      expect(input()).toHaveDisplayValue('');
      fireEvent.click(searchWeatherButton());
      expect(screen.getByText(/Enter name of the city !/i)).toBeInTheDocument();
    });
    test('error from api', async () => {
      mockWeatherAPI.mockImplementationOnce(async () => {
        await Promise.reject();
      });
      fireEvent.change(input(), { target: { value: 'test' } });
      fireEvent.click(searchWeatherButton());
      await waitFor(() => {
        expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
      });
      expect(mockWeatherAPI).toHaveBeenCalled();
    });
  });

  test('get data from api', async () => {
    expect(screen.queryByText(/WeatherCard/i)).not.toBeInTheDocument();
    mockWeatherAPI.mockImplementationOnce(async () => {
      return Promise.resolve({
        data: {
          city: todayWeatherInfosAPI(),
          list: [mockedWeatherDataAPI()],
        },
      });
    });
    fireEvent.change(input(), { target: { value: 'test' } });
    fireEvent.click(searchWeatherButton());
    await waitFor(() => {
      expect(screen.getByText(/WeatherCard/i)).toBeInTheDocument();
    });
    expect(mockWeatherAPI).toHaveBeenCalled();
  });
  test('insert input value from sidebar element', () => {
    expect(input()).toHaveDisplayValue('');
    store.dispatch(setSubPageID(mockedSubPageID + '1'));
    rerender();
    expect(input()).toHaveDisplayValue(mockedSidebarList[0].name);
  });
});
