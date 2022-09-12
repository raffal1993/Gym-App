import { screen } from '@testing-library/react';
import ArrowPointer from 'components/Commons/ArrowPointer/ArrowPointer';
import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';

describe('testing ArrowPointer component', () => {
  beforeEach(() => {
    renderWithProviders(<ArrowPointer />);
    jest.restoreAllMocks();
  });

  test('show arrow icons', () => {
    expect(screen.getAllByTestId(/DoubleArrowIcon/i)).toHaveLength(2);
  });
});
