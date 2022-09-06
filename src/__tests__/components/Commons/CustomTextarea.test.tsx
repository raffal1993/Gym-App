import { renderWithProviders } from '__tests__/utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import CustomTextarea from 'components/Commons/CustomTextarea/CustomTextarea';
import userEvent from '@testing-library/user-event';

describe('test CustomTextarea', () => {
  test('to show text', () => {
    renderWithProviders(<CustomTextarea initialValue="testText" />);
    expect(screen.getByText(/testText/i)).toBeInTheDocument();
  });

  test('to set width and max_width (width is: value.length * 12 px)', () => {
    renderWithProviders(<CustomTextarea initialValue="12345" maxWidth={100} />);
    const cell = screen.getByText(/12345/);
    expect(cell).toHaveStyle({ width: '60px' });
    expect(cell).toHaveStyle({ maxWidth: '100px' });
  });

  test('if disabled ("set" is always disabled)', () => {
    renderWithProviders(
      <CustomTextarea initialValue="disabled" cellData={{ set: '1', cell: 'set' }} />,
    );
    const cell = screen.getByText(/disabled/);
    expect(cell).toBeDisabled();
  });

  test('onBlur', () => {
    const onClick = jest.fn();
    renderWithProviders(<CustomTextarea initialValue="text" updateSet={onClick} />);
    const cell = screen.getByText(/text/);
    fireEvent.blur(cell);
    expect(onClick).toBeCalledTimes(1);
  });

  test('onKeyDown', async () => {
    renderWithProviders(<CustomTextarea initialValue="text" />);
    const cell = screen.getByText(/text/i);
    const onKeyDown = jest.fn();
    cell.onkeydown = onKeyDown;
    await userEvent.click(cell);
    await userEvent.keyboard('A');
    await userEvent.pointer({ target: cell });
    expect(cell).toHaveValue('A');
    expect(onKeyDown).toBeCalledTimes(1);
  });

  test('onChange', async () => {
    renderWithProviders(<CustomTextarea initialValue="text" maxWidth={120} />);
    const cell = screen.getByRole('textbox') as HTMLTextAreaElement;
    const onChange = jest.fn();
    cell.onchange = onChange;
    fireEvent.change(cell, { target: { value: 'changedText' } });
    expect(onChange).toBeCalledTimes(1);
  });
});
