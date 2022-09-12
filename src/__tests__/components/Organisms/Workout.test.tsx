import { cleanup, screen, waitFor } from '@testing-library/react';
import { setEditMode, setSidebarItemSelected } from 'app/slices/interfaceSlice';
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
jest.mock('components/Commons/NoCardsFound/NoCardsFound', () => {
  return {
    __esModule: true,
    default: () => <div>NoCardsFound</div>,
  };
});

const removeItemFromLS = jest.spyOn(Storage.prototype, 'removeItem');

jest.mock('helpers/importImages', () => ({
  importImages: jest.fn(() => ({
    exercises: ['test1,test2', 'test3'],
  })),
}));

const snapshotValue = jest.fn().mockReturnValue({
  ...mockedExerciseCardDBSnapshot(1),
  ...mockedExerciseCardDBSnapshot(2),
  ...mockedExerciseCardDBSnapshot(3),
});

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = {
      val: () => snapshotValue(),
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

  test('display NoCardsFound component', async () => {
    store.dispatch(setSidebarItemSelected(true));
    snapshotValue.mockReturnValue({})();
    rerender();
    await waitFor(() => {
      expect(screen.getByText(/NoCardsFound/i)).toBeInTheDocument();
    });
  });
  test('clearLocalStorage', () => {
    expect(removeItemFromLS).toHaveBeenCalled();
  });
});
