import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import AddEditNameModal from 'components/Molecules/Modals/AddEditNameModal/AddEditNameModal';
import { AddEditNameModalProps } from 'components/Molecules/Modals/ModalsTypes';
import { renderWithProviders } from '__tests__/utils/test-utils';

const updateDbCallback = jest.fn();
const checkIfAllIsValid = jest.fn();

const props: AddEditNameModalProps = {
  title: 'testTitle',
  buttonText: 'testButtonText',
  className: 'testClassName',
  inputType: 'text',
  updateDbCallback,
  checkIfAllIsValid,
};

describe('testing AccountInfo component', () => {
  jest.useFakeTimers();

  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;
  const button = () => screen.getByText('testButtonText');
  const input = (type: 'textbox' | 'spinbutton' = 'textbox') => screen.getByRole(type);

  beforeEach(() => {
    const { rerender } = renderWithProviders(<AddEditNameModal {...props} />);
    renderNew = rerender;

    jest.clearAllMocks();
  });

  test('to display title, button, input', () => {
    expect(screen.getByText(/testTitle/i)).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
    expect(input()).toBeInTheDocument();
  });

  test('input type', () => {
    fireEvent.change(input(), { target: { value: 'test' } });
    expect(input()).toHaveValue('test');

    renderNew(<AddEditNameModal {...props} inputType="number" />);
    fireEvent.change(input('spinbutton'), { target: { value: 'test' } });
    expect(input('spinbutton')).toHaveDisplayValue('');

    fireEvent.change(input('spinbutton'), { target: { value: 1234 } });
    expect(input('spinbutton')).toHaveValue(1234);
  });

  test('error message', async () => {
    fireEvent.change(input(), { target: { value: 'te' } });
    fireEvent.click(button());
    expect(screen.getByText(/Name must be at least 3 chars !/i)).toBeInTheDocument();
    jest.advanceTimersByTime(1900);
    await waitForElementToBeRemoved(() => screen.queryByText(/Name must be at least 3 chars !/i), {
      timeout: 2000,
    });
  });

  test('submit to DB', () => {
    checkIfAllIsValid.mockReturnValue(true);
    fireEvent.change(input(), { target: { value: 'test' } });
    fireEvent.click(button());
    expect(updateDbCallback).toHaveBeenCalledWith('test');
  });

  test('checkIfAllIsValid prop as false', () => {
    checkIfAllIsValid.mockReturnValue(false);
    fireEvent.change(input(), { target: { value: 'test' } });
    fireEvent.click(button());
    expect(updateDbCallback).not.toHaveBeenCalled();
    expect(updateDbCallback).not.toHaveBeenCalledWith('test');
  });

  test('focus input', () => {
    expect(input()).toHaveFocus();
  });
});
