import { screen } from '@testing-library/react';
import PageNotFound from 'components/Organisms/PageNotFound/PageNotFound';
import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';

describe('testing PageNotFound component', () => {
  beforeEach(() => {
    renderWithProviders(<PageNotFound />);
    jest.restoreAllMocks();
  });

  test('elements displayed on initial render', () => {
    expect(screen.getByText(/Sorry... Page Not Found :\(/i)).toBeInTheDocument();
  });
});
