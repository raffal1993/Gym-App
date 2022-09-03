import { renderWithProviders } from '__tests__/utils/test-utils';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Password from 'components/Atoms/Inputs/Password/Password';

const spyUseState = jest.spyOn(React, 'useState');

describe('test Password', () => {
  const handlePassword = jest.fn();
  const handleSubmit = jest.fn();

  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

  const inputPassword = () => screen.getByLabelText('Password');

  beforeEach(() => {
    const { rerender } = renderWithProviders(
      <Password
        password="testPassword"
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        isError={false}
        label="Password"
      />,
    );

    renderNew = rerender;
  });

  test('label prop, check if input is in document', () => {
    expect(inputPassword()).toBeInTheDocument();
  });

  test('password prop', () => {
    expect(inputPassword()).toHaveValue('testPassword');
  });

  test('onChange = handlePassword prop', () => {
    fireEvent.change(inputPassword(), { target: { value: 'newPassword' } });
    expect(handlePassword).toHaveBeenCalledTimes(1);
  });

  test('onKeyPress = handleSubmit prop', () => {
    fireEvent.change(inputPassword(), { target: { value: 'newPassword' } });
    fireEvent.keyPress(inputPassword(), { charCode: 13 });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('isError prop', () => {
    expect(inputPassword()).toHaveAttribute('aria-invalid', 'false');
    renderNew(
      <Password
        password="testPassword"
        handlePassword={handlePassword}
        handleSubmit={handleSubmit}
        isError={true}
        label="Password"
      />,
    );
    expect(inputPassword()).toHaveAttribute('aria-invalid', 'true');
  });

  test('show Password', async () => {
    const visibilityOnIcon = screen.getByTestId('VisibilityIcon');
    expect(visibilityOnIcon).toBeInTheDocument();
    expect(screen.getByDisplayValue('testPassword')).toHaveAttribute('type', 'password');
    fireEvent.click(visibilityOnIcon);
    const visibilityOffIcon = screen.getByTestId('VisibilityOffIcon');
    expect(spyUseState).toHaveBeenCalled();
    expect(visibilityOffIcon).toBeInTheDocument();
    expect(screen.getByDisplayValue('testPassword')).toHaveAttribute('type', 'text');
  });
});
