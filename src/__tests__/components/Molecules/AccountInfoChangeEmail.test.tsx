import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import AccountInfoChangeEmail from 'components/Molecules/AccountInfoChangeEmail/AccountInfoChangeEmail';
import { renderWithProviders } from '__tests__/utils/test-utils';

const updateEmailToDB = jest.fn();

jest.mock('firebase-cfg/database/user/update', () => ({
  updateEmailToDB: () => updateEmailToDB(),
}));

const updateEmail = jest.fn();

jest.mock('firebase/auth', () => ({
  updateEmail: () => updateEmail(),
}));

const initialProps = {
  email: 'test@test.com',
};

const rerender = (newProps: Partial<typeof initialProps> = {}) => {
  cleanup();
  const props = { ...initialProps, ...newProps };
  renderWithProviders(<AccountInfoChangeEmail {...props} />);
};

describe('testing AccountInfoChangeEmail component', () => {
  const inputChangeEmail = (option: 'query' | 'get' = 'get') => {
    return (
      ((option === 'get' &&
        screen.getByRole('textbox', { name: /change email:/i })) as HTMLElement) ||
      (option === 'query' && screen.queryByRole('textbox', { name: /change email:/i }))
    );
  };
  const buttonChangeEmail = (option: 'query' | 'get' = 'get') => {
    return (
      ((option === 'get' && screen.getByTestId(/SendIcon/i)) as HTMLElement) ||
      (option === 'query' && screen.queryByTestId(/SendIcon/i))
    );
  };

  beforeEach(() => {
    renderWithProviders(<AccountInfoChangeEmail {...initialProps} />);
    jest.clearAllMocks();
  });

  test('to display elements with initial render', () => {
    expect(screen.getByText(/Change email:/i)).toBeInTheDocument();
    expect(inputChangeEmail()).toBeInTheDocument();
    expect(buttonChangeEmail()).toBeInTheDocument();
  });

  describe('error handling', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      updateEmail.mockImplementation(async () => {
        return Promise.reject({ message: 'Firebase test error' });
      });
      rerender();
    });
    test('error message when error input is empty', () => {
      expect(inputChangeEmail()).toHaveDisplayValue('');
      fireEvent.click(buttonChangeEmail());
      expect(screen.getByText(/Email can't be empty/i)).toBeInTheDocument();
    });
    test('error message when firebase error occured', async () => {
      fireEvent.change(inputChangeEmail(), { target: { value: 'test@email.com' } });
      fireEvent.click(buttonChangeEmail());
      await waitFor(async () => expect(await screen.findByText(/test error/i)).toBeInTheDocument());
    });
    test('error message fade out after 2000 ms', async () => {
      fireEvent.click(buttonChangeEmail());
      jest.advanceTimersByTime(1800);
      await waitForElementToBeRemoved(() => screen.queryByText(/Email can't be empty/i));
    });
  });

  test('successfull change Email, updateEmailToDB is called, show/hide elements', async () => {
    updateEmail.mockImplementation(async () => {
      await Promise.resolve();
    });
    fireEvent.change(inputChangeEmail(), { target: { value: 'test@email.com' } });
    fireEvent.click(buttonChangeEmail());
    expect(updateEmail).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByText('Email has been changed. You can login now with new email.'),
    ).toBeInTheDocument();

    expect(screen.queryByText(/Change email:/i)).not.toBeInTheDocument();
    expect(buttonChangeEmail('query')).not.toBeInTheDocument();
    expect(inputChangeEmail('query')).not.toBeInTheDocument();
  });
});
