import { cleanup, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SearchPanel, { SearchPanelProps } from 'components/Molecules/SearchPanel/SearchPanel';
import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('assets/images/404food.svg', () => ({
  ReactComponent: () => <svg data-testid="404food"></svg>,
}));

const searchFoodCb = jest.fn();
const searchWeatherCb = jest.fn();

const ref = { current: document.createElement('div') };

type ParentComponentProps = Omit<
  SearchPanelProps,
  'setInputValue' | 'inputValue' | 'setErrorMessage'
>;

const parentComponentProps: ParentComponentProps = {
  title: 'testTitle',
  isLoading: false,
  info: 'testInfo',
  errorMessage: '',
  placeholder: 'testPlaceholder',
  buttonText: 'testButtonText',
  searchFoodCb,
  searchWeatherCb,
};

const ParentComponent = (props: ParentComponentProps) => {
  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(props.errorMessage);

  const searchPanelProps: SearchPanelProps = {
    ...props,
    setInputValue,
    inputValue,
    errorMessage,
    setErrorMessage,
  };

  return <SearchPanel {...searchPanelProps} ref={ref} />;
};

describe('testing SearchPanel component', () => {
  const searchInput = () => screen.getByRole('textbox');
  const searchButton = (buttonText: string = 'testButtonText') =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  beforeEach(() => {
    renderWithProviders(<ParentComponent {...parentComponentProps} />);
    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /testTitle/i })).toBeInTheDocument();
    expect(screen.getByTestId(/SearchIcon/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/testPlaceholder/i)).toBeInTheDocument();
    expect(searchInput()).toBeInTheDocument();
    expect(searchButton()).toBeInTheDocument();
    expect(screen.getByText(/testInfo/i)).toBeInTheDocument();
  });

  test('input value change', () => {
    fireEvent.change(searchInput(), { target: { value: 'something' } });
    expect(searchInput()).toHaveValue('something');
  });

  test('search button click', () => {
    fireEvent.change(searchInput(), { target: { value: 'something' } });
    fireEvent.click(searchButton());
    expect(searchFoodCb).toHaveBeenCalledTimes(1);
    expect(searchWeatherCb).toHaveBeenCalledTimes(1);
  });

  describe('error message', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      cleanup();
      renderWithProviders(
        <ParentComponent {...parentComponentProps} errorMessage="testErrorMessage" />,
      );
    });
    test('error message shows up', () => {
      expect(screen.getByText(/testErrorMessage/i)).toBeInTheDocument();
    });
    test('error message fade out', async () => {
      jest.advanceTimersByTime(2000);
      await waitForElementToBeRemoved(() => screen.queryByText(/testErrorMessage/i));
    });
  });
});
