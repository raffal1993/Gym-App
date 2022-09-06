import { renderWithProviders } from '__tests__/utils/test-utils';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomButton from 'components/Commons/Buttons/CustomButton/CustomButton';

describe('test CustomButton', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test('onClick', async () => {
    renderWithProviders(<CustomButton handleClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  test('isSucceed prop', async () => {
    const { rerender } = renderWithProviders(<CustomButton handleClick={onClick} />);
    const button = screen.getByRole('button');
    const primaryColor = getComputedStyle(button).backgroundColor;
    rerender(<CustomButton handleClick={onClick} isSucceed />);
    const succeedColor = getComputedStyle(button).backgroundColor;
    expect(primaryColor).not.toEqual(succeedColor);
    expect(button).toHaveTextContent(/Success/i);
  });

  test('isError prop', async () => {
    const { rerender } = renderWithProviders(<CustomButton handleClick={onClick} />);
    const button = screen.getByRole('button');
    const primaryColor = getComputedStyle(button).backgroundColor;
    rerender(<CustomButton handleClick={onClick} isError />);
    const errorColor = getComputedStyle(button).backgroundColor;
    expect(primaryColor).not.toEqual(errorColor);
  });

  test('passing children as a prop', async () => {
    renderWithProviders(<CustomButton handleClick={onClick}>Button</CustomButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/Button/i);
  });

  test('if button is disabled', async () => {
    renderWithProviders(<CustomButton handleClick={onClick} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
