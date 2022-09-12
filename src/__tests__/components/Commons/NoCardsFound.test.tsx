import { screen } from '@testing-library/react';
import NoCardsFound from 'components/Commons/NoCardsFound/NoCardsFound';
import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';

describe('testing NoCardsFound component', () => {
  beforeEach(() => {
    renderWithProviders(<NoCardsFound text="testText" />);
    jest.restoreAllMocks();
  });

  test('display elements on initial render', () => {
    expect(screen.getByText(/testText/i)).toBeInTheDocument();
    expect(screen.getByText(/clickfor more details/i)).toBeInTheDocument();
    expect(screen.getByText(/clickfor more details/i)).toBeInTheDocument();
    expect(screen.getByTestId(/ConstructionIcon/i)).toBeInTheDocument();
  });
});
