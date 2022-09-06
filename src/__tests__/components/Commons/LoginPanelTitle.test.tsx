import { renderWithProviders } from '__tests__/utils/test-utils';
import React from 'react';
import { screen } from '@testing-library/react';
import LoginPanelTitle from 'components/Commons/LoginPanelTitle/LoginPanelTitle';

describe('test LoginPanelTitle', () => {
  test('title prop', () => {
    renderWithProviders(<LoginPanelTitle title="testTitle" />);
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
  });
});
