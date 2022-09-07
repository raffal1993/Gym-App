import { cleanup, fireEvent, screen } from '@testing-library/react';
import { setEditMode } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import React from 'react';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedSubPageID } from '../../mocks/mockedSidebarData';
import { mockedWorkoutCard } from '../../mocks/mockedWorkoutData';
import { renderWithProviders } from '../../utils/test-utils';

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

jest.mock('helpers/importImages', () => ({
  importImages: jest.fn(() => ({
    images: { testType: '/test/src.webp' },
  })),
}));

const addVersionToDB = jest.fn();

jest.mock('firebase-cfg/database/workout/add', () => ({
  addVersionToDB: () => addVersionToDB(),
}));

jest.mock('components/Molecules/Modals/EditExerciseModal/EditExerciseModal', () => {
  return {
    __esModule: true,
    default: () => <div>EditExerciseModal</div>,
  };
});

const mockedSetModalOpen = jest.fn();

jest.mock('app/slices/interfaceSlice', () => ({
  __esModule: true,
  ...jest.requireActual('app/slices/interfaceSlice'),
  setModalOpen: () => mockedSetModalOpen,
}));

jest.mock('components/Molecules/WorkoutStats/WorkoutStats', () => {
  return {
    __esModule: true,
    default: () => <div>WorkoutStats</div>,
  };
});

const getLocalStorage = jest.spyOn(Storage.prototype, 'getItem');
const updateLocalStorage = jest.fn();

jest.mock('helpers/localStorage', () => ({
  ...jest.requireActual('helpers/localStorage'),
  updateLocalStorage: () => updateLocalStorage(),
}));

const initialState = {
  interfaceState: { isEditModeOn: false },
  pagesState: {
    subPageID: mockedSubPageID,
  },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = (props: Partial<WorkoutCardProps> = {}) => {
  cleanup();
  const workoutCardProps = { ...mockedWorkoutCard, ...props };
  renderWithProviders(<WorkoutCard {...workoutCardProps} />, { store });
};

describe('testing WorkoutCard component', () => {
  const versionButton = (buttonText: string) =>
    screen.getByRole('button', { name: new RegExp(buttonText, 'i') });

  const addVersionButton = () => screen.getByRole('button', { name: /\+/i });

  const editCardButton = () => screen.getByTestId(/ConstructionIcon/i);

  beforeEach(() => {
    renderWithProviders(<WorkoutCard {...mockedWorkoutCard} />, { store });
    jest.restoreAllMocks();
  });

  test('if elements are displayed', () => {
    expect(screen.getByRole('heading', { name: /TESTALTERNATIVENAME1/i })).toBeInTheDocument();
    expect(screen.getByText(/WorkoutStats/i)).toBeInTheDocument();
    expect(versionButton('1')).toBeInTheDocument();
    expect(versionButton('2')).toBeInTheDocument();
    expect(versionButton('3')).toBeInTheDocument();
  });
  describe('editModeOn === true', () => {
    beforeAll(() => {
      store.dispatch(setEditMode(true));
    });
    afterAll(() => {
      store.dispatch(setEditMode(false));
      require('utils/staticVariables/maxElements').MAX_VERSIONS = 5;
    });

    test('if element are displayed', () => {
      expect(addVersionButton()).toBeInTheDocument();
      expect(editCardButton()).toBeInTheDocument();
    });

    test('open modal with workoutCard edit', () => {
      fireEvent.click(editCardButton());
      expect(dispatch).toHaveBeenCalledWith(mockedSetModalOpen);
    });
    test('add new version', () => {
      fireEvent.click(addVersionButton());
      expect(addVersionToDB).toHaveBeenCalled();
    });

    test('add new version disabled', () => {
      require('utils/staticVariables/maxElements').MAX_VERSIONS = 3;
      rerender();
      expect(screen.queryByRole('button', { name: /\+/i })).not.toBeInTheDocument();
    });
  });

  test('active versionButton', () => {
    expect(versionButton('1').getAttribute('class')).toMatch(/active/gi);
    expect(versionButton('2').getAttribute('class')).not.toMatch(/active/gi);
    expect(versionButton('3').getAttribute('class')).not.toMatch(/active/gi);
    fireEvent.click(versionButton('2'));
    expect(versionButton('1').getAttribute('class')).not.toMatch(/active/gi);
    expect(versionButton('2').getAttribute('class')).toMatch(/active/gi);
    expect(versionButton('3').getAttribute('class')).not.toMatch(/active/gi);

    expect(screen.getByRole('heading', { name: /TESTALTERNATIVENAME2/i })).toBeInTheDocument();
    localStorage.clear();
  });

  test('alternative name === undefined', () => {
    rerender({
      ...mockedWorkoutCard,
      versions: [
        { ...mockedWorkoutCard.versions[0], alternativeName: '' },
        { ...mockedWorkoutCard.versions[1] },
        { ...mockedWorkoutCard.versions[2] },
      ],
    });
    expect(screen.getByRole('heading', { name: /TESTWORKOUTCARDNAME/i })).toBeInTheDocument();
  });

  test('image url in wrapper', () => {
    expect(screen.getByTestId(/wrapper/i)).toHaveAttribute('url', '/test/src.webp');
  });

  describe('Local storage', () => {
    beforeAll(() => {
      localStorage.clear();
    });
    afterAll(() => {
      localStorage.clear();
    });

    test('get selected version from LS', () => {
      fireEvent.click(versionButton('2'));
      expect(screen.getByRole('heading', { name: /TESTALTERNATIVENAME2/i })).toBeInTheDocument();
      rerender();
      expect(getLocalStorage).toHaveBeenCalled();
    });

    test('add/update version to LS', async () => {
      rerender();
      fireEvent.click(versionButton('3'));
      expect(updateLocalStorage).toHaveBeenCalled();
    });
  });
});
