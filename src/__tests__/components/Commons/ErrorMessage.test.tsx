import { screen } from '@testing-library/react';
import ErrorMessage from 'components/Commons/ErrorMessage/ErrorMessage';
import { renderWithProviders } from '__tests__/utils/test-utils';

describe('testing ErrorMessage component', () => {
  test('email prop', () => {
    renderWithProviders(<ErrorMessage errorMessage="testErrorMessage" />);
    expect(screen.getByText('testErrorMessage')).toBeInTheDocument();
  });

  test('className prop', () => {
    renderWithProviders(<ErrorMessage errorMessage="testErrorMessage" className="testClass" />);
    expect(screen.getByText('testErrorMessage').getAttribute('class')).toMatch(/testClass/gi);
  });
});
