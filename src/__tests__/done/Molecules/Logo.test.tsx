import { screen } from '@testing-library/react';
import Logo from 'components/Molecules/Logo/Logo';
import { renderWithProviders } from '__tests__/utils/test-utils';

jest.mock('assets/images/arm.svg', () => ({
  ReactComponent: () => <svg data-testid="arm" />,
}));

describe('testing Logo component', () => {
  const arms = () => screen.getAllByTestId('arm');
  beforeEach(() => {
    renderWithProviders(<Logo />);

    jest.resetAllMocks();
  });

  test('if elements are displayed', () => {
    expect(arms()).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /welcome to gym app/i })).toBeInTheDocument();
  });
});
