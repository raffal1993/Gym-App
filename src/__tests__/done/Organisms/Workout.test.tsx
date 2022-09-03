import { cleanup, screen } from '@testing-library/react';
import { setEditMode } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import Workout from 'components/Organisms/Workout/Workout';
import React from 'react';
import { mockedExerciseCardDBSnapshot } from '__tests__/mocks/mockedWorkoutData';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSidebarList, mockedSubPageID } from '../../mocks/mockedSidebarData';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('components/Molecules/WorkoutCard/WorkoutCard', () => {
  return {
    __esModule: true,
    default: () => <div>WorkoutCard</div>,
  };
});

jest.mock('components/Molecules/CustomTabs/CustomTabs', () => {
  return {
    __esModule: true,
    default: () => <div>AddExerciseTabs</div>,
  };
});

jest.mock('components/Molecules/StoperWidget/StoperWidget', () => {
  return {
    __esModule: true,
    default: () => <div>StoperWidget</div>,
  };
});

const removeItemFromLS = jest.spyOn(Storage.prototype, 'removeItem');

jest.mock('helpers/importImages', () => ({
  importImages: jest.fn(() => ({
    exercises: ['test1,test2', 'test3'],
  })),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = {
      val: () => ({
        ...mockedExerciseCardDBSnapshot(1),
        ...mockedExerciseCardDBSnapshot(2),
        ...mockedExerciseCardDBSnapshot(3),
      }),
    };
    callback(snapshot);
  }),
}));

const initialState = {
  pagesState: {
    subPageID: mockedSubPageID,
    sidebarList: mockedSidebarList,
  },
  interfaceState: {
    isEditModeOn: false,
    isSidebarItemSelected: true,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = (newStore = store) => {
  cleanup();
  renderWithProviders(<Workout />, {
    store: newStore,
  });
};

describe('testing Workout component', () => {
  beforeEach(() => {
    store.dispatch(setEditMode(false));
    renderWithProviders(<Workout />, { store });
    jest.restoreAllMocks();
  });

  test('elements displayed on initial render', () => {
    expect(screen.getByText(/StoperWidget/i)).toBeInTheDocument();
    expect(screen.getAllByText(/WorkoutCard/i)).toHaveLength(3);
  });

  test('elements displayed when isEditModeOn === true', () => {
    store.dispatch(setEditMode(true));
    rerender();
    expect(screen.getByText(/AddExerciseTabs/i)).toBeInTheDocument();
  });
  test('clearLocalStorage', () => {
    expect(removeItemFromLS).toHaveBeenCalled();
  });
});
