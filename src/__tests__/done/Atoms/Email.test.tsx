import { fireEvent, screen } from '@testing-library/react';
import Email from 'components/Atoms/Inputs/Email/Email';
import { renderWithProviders } from '__tests__/utils/test-utils';

describe('testing Email component', () => {
  const handleEmail = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('email prop', () => {
    renderWithProviders(
      <Email
        email="testEmail"
        handleEmail={handleEmail}
        handleSubmit={handleSubmit}
        isError={false}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('testEmail');
  });
  test('handleEmail prop', () => {
    renderWithProviders(
      <Email
        email="testEmail"
        handleEmail={handleEmail}
        handleSubmit={handleSubmit}
        isError={false}
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new test email' } });
    expect(handleEmail).toBeCalledTimes(1);
  });
  test('handleSubmit prop', () => {
    renderWithProviders(
      <Email
        email="testEmail"
        handleEmail={handleEmail}
        handleSubmit={handleSubmit}
        isError={false}
      />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new test email' } });
    fireEvent.keyPress(input, { charCode: 13 });
    expect(handleSubmit).toBeCalledTimes(1);
  });
  test('isError prop', () => {
    renderWithProviders(
      <Email email="testEmail" handleEmail={handleEmail} handleSubmit={handleSubmit} isError />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
