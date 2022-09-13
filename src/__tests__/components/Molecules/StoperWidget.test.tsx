import { fireEvent, screen, waitFor } from '@testing-library/react';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../../utils/test-utils';

describe('testing StoperWidget component', () => {
  const wrapper = () => screen.getByTestId(/wrapper/i);
  const hideStoper = () => screen.getByTestId(/ArrowForwardIcon/i);
  const showStoper = () => screen.getByTestId(/TimerIcon/i);
  const display = () => screen.getByTestId(/display/i);
  const startTimer = () => screen.getByTestId(/PlayCircleOutlineIcon/i);
  const pauseTimer = () => screen.getByTestId(/PauseCircleIcon/i);
  const resetTimer = () => screen.getByTestId(/StopCircleIcon/i);
  const copyTimer = () => screen.getByTestId(/ContentCopyIcon/i);

  beforeEach(() => {
    renderWithProviders(<StoperWidget />);
    jest.restoreAllMocks();
  });

  test('if elements are displayed when stoper is hide and pause', () => {
    expect(wrapper()).toBeInTheDocument();
    expect(showStoper()).toBeInTheDocument();
    expect(display()).toBeInTheDocument();
    expect(startTimer()).toBeInTheDocument();
    expect(resetTimer()).toBeInTheDocument();
    expect(copyTimer()).toBeInTheDocument();
  });
  test('if elements are displayed when stoper is visible', () => {
    fireEvent.click(showStoper());
    fireEvent.click(startTimer());
    expect(pauseTimer()).toBeInTheDocument();
    expect(hideStoper()).toBeInTheDocument();
  });
  test('stoper shows up', () => {
    expect(wrapper()).toHaveAttribute('is_hided', 'true');
    expect(wrapper()).toHaveStyle({ transform: 'translateX(260px)' });
    fireEvent.click(showStoper());
    expect(wrapper()).toHaveAttribute('is_hided', 'false');
    expect(wrapper()).not.toHaveStyle({ transform: 'translateX(260px)' });
  });
  describe('stoper usage', () => {
    jest.useFakeTimers();

    test('display properly time after about 10 sec', () => {
      fireEvent.click(startTimer());
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      expect(display()).toHaveTextContent('09:99');
    });

    test('pause stoper', () => {
      fireEvent.click(startTimer());
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      fireEvent.click(pauseTimer());
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(display()).toHaveTextContent('09:99');
    });
    test('reset stoper', () => {
      fireEvent.click(startTimer());
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      expect(display()).toHaveTextContent('09:99');
      fireEvent.click(resetTimer());
      expect(display()).toHaveTextContent('00:00');
    });
  });
  describe('copy timer value', () => {
    test('using document.execCommand()', async () => {
      document.execCommand = jest.fn();
      fireEvent.click(copyTimer());
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      await waitFor(async () =>
        expect(await screen.findByText('Copied to clipboard')).toBeInTheDocument(),
      );
    });

    test("if 'clipboard' is in navigator", async () => {
      const mockedWriteText = jest.fn();
      Object.assign(global.navigator, {
        clipboard: {
          writeText: mockedWriteText,
        },
      });
      fireEvent.click(copyTimer());
      expect(mockedWriteText).toHaveBeenCalledWith('00:00');
      await waitFor(async () =>
        expect(await screen.findByText('Copied to clipboard')).toBeInTheDocument(),
      );
    });
  });
});
