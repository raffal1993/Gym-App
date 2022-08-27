import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { setEditMode } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import WorkoutStats from 'components/Molecules/WorkoutStats/WorkoutStats';
import { WorkoutStatsProps } from 'components/Organisms/Workout/WorkoutTypes';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSubPageID } from '../../mocks/mockedSidebarData';
import { workoutStatsProps } from '../../mocks/mockedWorkoutData';
import { renderWithProviders } from '../../utils/test-utils';

const getScrollPosition = jest.fn();
const updateScrollPosition = jest.fn();

jest.mock('helpers/scrollPosition', () => ({
  getScrollPosition: () => getScrollPosition(),
  updateScrollPosition: () => updateScrollPosition(),
}));

const updateSetToDB = jest.fn();

jest.mock('firebase-cfg/database/workout/update', () => ({
  updateSetToDB: () => updateSetToDB(),
}));

const addSetToDB = jest.fn();

jest.mock('firebase-cfg/database/workout/add', () => ({
  addSetToDB: () => addSetToDB(),
}));
const isWidthSmaller = jest.fn();

jest.mock('hooks/useResize', () => {
  return {
    __esModule: true,
    default: () => ({
      isWidthSmaller: isWidthSmaller(),
    }),
  };
});

const initialState = {
  interfaceState: { isEditModeOn: false },
  pagesState: {
    subPageID: mockedSubPageID,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = (props: Partial<WorkoutStatsProps> = {}) => {
  cleanup();
  const newProps = { ...workoutStatsProps, ...props };
  renderWithProviders(<WorkoutStats {...newProps} />, { store });
};

describe('testing WorkoutStats component', () => {
  const stats = (
    name: 'Set' | 'Weight' | 'Reps' | 'Info',
    amount: number = workoutStatsProps.stats.length,
  ) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`stat${i}${name}`, 'i')));
    }
    return array;
  };

  const addSetButton = (option: 'query' | 'get') => {
    return (
      ((option === 'get' && screen.getByRole('button', { name: /\+/i })) as HTMLElement) ||
      (option === 'query' && screen.queryByRole('button', { name: /\+/i }))
    );
  };

  beforeEach(() => {
    store.dispatch(setEditMode(false));
    renderWithProviders(<WorkoutStats {...workoutStatsProps} />, { store });
    jest.restoreAllMocks();
  });

  test('if elements are displayed on wider screens', () => {
    isWidthSmaller.mockReturnValueOnce(() => false);
    expect(screen.getByText('Set', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Weight', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Reps/Time', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Info', { exact: true })).toBeInTheDocument();
    expect(stats('Set')).toHaveLength(3);
    expect(stats('Weight')).toHaveLength(3);
    expect(stats('Reps')).toHaveLength(3);
    expect(stats('Info')).toHaveLength(3);
  });
  test('if elements are displayed on smaller screens', () => {
    isWidthSmaller.mockReturnValueOnce(() => true);
    expect(screen.getAllByText('Set', { exact: true })).toHaveLength(3);
    expect(screen.getAllByText('Weight', { exact: true })).toHaveLength(3);
    expect(screen.getAllByText('Reps/Time', { exact: true })).toHaveLength(3);
    expect(screen.getAllByText('Info', { exact: true })).toHaveLength(3);
    expect(stats('Set')).toHaveLength(3);
    expect(stats('Weight')).toHaveLength(3);
    expect(stats('Reps')).toHaveLength(3);
    expect(stats('Info')).toHaveLength(3);
  });
  describe('show/hide EditDbButton', () => {
    afterAll(() => {
      require('helpers/staticVariables').MAX_SETS = 10;
    });
    test('show EditDbButton', () => {
      store.dispatch(setEditMode(true));
      expect(addSetButton('get')).toBeInTheDocument();
    });
    test('hide EditDbButton', () => {
      expect(addSetButton('query')).not.toBeInTheDocument();

      require('helpers/staticVariables').MAX_SETS = 2;
      store.dispatch(setEditMode(true));
      rerender();
      expect(addSetButton('query')).not.toBeInTheDocument();
    });
  });

  test('update text in cell', async () => {
    await userEvent.click(stats('Info')[2]);
    await userEvent.keyboard('newValue');
    expect(screen.getByText(/newValue/i)).toBeInTheDocument();
    fireEvent.blur(screen.getByText(/newValue/i));
    expect(updateSetToDB).toHaveBeenCalled();
  });
  test('add new set', () => {
    store.dispatch(setEditMode(true));
    fireEvent.click(addSetButton('get'));
    expect(addSetToDB).toHaveBeenCalled();
  });

  test('scroll position', async () => {
    fireEvent.scroll(screen.getByTestId(/stats/i), { target: { scrollY: 1000 } });
    expect(getScrollPosition).toHaveBeenCalled();
    await waitFor(() => {
      expect(updateScrollPosition).toHaveBeenCalled();
    });
  });
});
