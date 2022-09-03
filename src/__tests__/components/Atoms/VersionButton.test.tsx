import { renderWithProviders } from '__tests__/utils/test-utils';
import React from 'react';
import VersionButton from 'components/Atoms/Buttons/VersionButton/VersionButton';
import { fireEvent, screen } from '@testing-library/react';

describe('test VersionButton', () => {
  const onClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('onClick prop', () => {
    renderWithProviders(<VersionButton onClick={onClick} versionNumber={1} isActive={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toBeCalledTimes(1);
  });

  test('versionNumber prop', () => {
    renderWithProviders(<VersionButton onClick={onClick} versionNumber={1} isActive={false} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('isActive prop === true', () => {
    renderWithProviders(<VersionButton onClick={onClick} versionNumber={1} isActive={true} />);
    expect(screen.getByRole('button').getAttribute('class')).toMatch(/active/gi);
  });

  test('isActive prop === false', () => {
    renderWithProviders(<VersionButton onClick={onClick} versionNumber={1} isActive={false} />);
    expect(screen.getByRole('button').getAttribute('class')).not.toMatch(/active/gi);
  });
});
