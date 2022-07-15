import { renderWithProviders } from '__tests__/utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditCardButton from 'components/Atoms/Buttons/EditCardButton/EditCardButton';

describe('test EditCardButton', () => {
  const onClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('onClick prop', async () => {
    renderWithProviders(<EditCardButton onClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  test('svg icon show', () => {
    renderWithProviders(<EditCardButton onClick={onClick} />);
    expect(screen.getByTestId('ConstructionIcon')).toBeInTheDocument();
  });
});
