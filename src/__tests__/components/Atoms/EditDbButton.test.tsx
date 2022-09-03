import { renderWithProviders } from '__tests__/utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import React, { createRef } from 'react';

jest.mock('React', () => ({
  ...jest.requireActual('React'),
  createRef: jest.fn() as jest.MockedFn<() => React.Ref<HTMLButtonElement>>,
}));

const mockedRef = jest.mocked(createRef).mockReturnValue({ current: <button>ButtonRef</button> });

describe('test EditDbButton', () => {
  const onClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('onClick prop', async () => {
    renderWithProviders(<EditDbButton onClick={onClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  test('passing children to component', async () => {
    renderWithProviders(<EditDbButton onClick={onClick}>children test</EditDbButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('children test');
  });

  test('ref', async () => {
    renderWithProviders(<EditDbButton onClick={onClick} ref={mockedRef} />);
    expect(mockedRef).toBeCalledTimes(1);
  });
});
