import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setModalClose } from 'app/slices/interfaceSlice';
import EditExerciseModal from 'components/Molecules/Modals/EditExerciseModal/EditExerciseModal';
import React from 'react';
import { mockedSubPageID } from '__tests__/mocks/mockedSidebarData';
import { mockedExerciseID, mockedWorkoutCard } from '__tests__/mocks/mockedWorkoutData';
import { renderWithProviders } from '__tests__/utils/test-utils';

const removeExercise = jest.fn();
const removeVersion = jest.fn();
const removeSet = jest.fn();

jest.mock('firebase-cfg/database/workout/remove', () => ({
  removeExercise: () => removeExercise(),
  removeVersion: () => removeVersion(),
  removeSet: () => removeSet(),
}));

const updateExerciseName = jest.fn();

jest.mock('firebase-cfg/database/workout/update', () => ({
  updateExerciseName: () => updateExerciseName(),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn().mockReturnValue('testRef'),
  onValue: jest.fn((_ref, callback) => {
    const snapshot = { val: () => mockedWorkoutCard };
    callback(snapshot);
  }),
}));

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

describe('testing EditExerciseModal component', () => {
  const removeExerciseButton = (text: string = 'Remove exercise ?') =>
    screen.getByRole('button', { name: RegExp(text, 'i') });

  const versionNumbers = (amount: number = mockedWorkoutCard.versions.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`${i}\\.`, 'i')));
    }
    return array;
  };

  const versionNames = (amount: number = mockedWorkoutCard.versions.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`TESTALTERNATIVENAME${i}`, 'i')));
    }
    return array;
  };

  const sets = (versionNumber: number, amount: number = mockedWorkoutCard.versions.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`test${versionNumber}set${i}Set`, 'i')));
    }
    return array;
  };

  const removeVersionButtons = () => screen.getAllByTestId(/CloseIcon/i);

  beforeEach(() => {
    renderWithProviders(
      <EditExerciseModal exerciseID={mockedExerciseID} subPageID={mockedSubPageID} />,
    );
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    versionNumbers().forEach((versionNumber) => expect(versionNumber).toBeInTheDocument());
    versionNames().forEach((versionName) => expect(versionName).toBeInTheDocument());

    sets(1).forEach((set) => expect(set).toBeInTheDocument());
    sets(2).forEach((set) => expect(set).toBeInTheDocument());
    sets(3).forEach((set) => expect(set).toBeInTheDocument());

    expect(removeVersionButtons()).toHaveLength(3);

    expect(removeExerciseButton()).toBeInTheDocument();
  });

  describe('change version name', () => {
    test('if form elemets showed up after click on version name', () => {
      fireEvent.click(versionNames()[0]);
      expect(screen.getByText(/Enter new name:/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /change name/i })).toBeInTheDocument();
    });

    test('if form elemets fade after click on "active" element', () => {
      fireEvent.click(versionNames()[0]);
      expect(versionNames()[0].getAttribute('class')).toMatch(/active/gi);
      fireEvent.click(versionNames()[0]);
      versionNames().forEach((versionName) =>
        expect(versionName.getAttribute('class')).not.toMatch(/active/gi),
      );
      expect(screen.queryByText(/Enter new name:/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /change name/i })).not.toBeInTheDocument();
    });

    test('"active" element if it toggle properly', () => {
      versionNames().forEach((versionName) =>
        expect(versionName.getAttribute('class')).not.toMatch(/active/gi),
      );
      fireEvent.click(versionNames()[0]);
      expect(versionNames()[0].getAttribute('class')).toMatch(/active/gi);
      expect(versionNames()[2].getAttribute('class')).not.toMatch(/active/gi);
      fireEvent.click(versionNames()[2]);
      expect(versionNames()[0].getAttribute('class')).not.toMatch(/active/gi);
      expect(versionNames()[2].getAttribute('class')).toMatch(/active/gi);
    });
  });

  describe('confirmation feature', () => {
    jest.useFakeTimers();

    test('if "confirm" button show up after click remove version button', () => {
      fireEvent.click(removeVersionButtons()[0]);
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    test('if "X" button show up after click to remove set', () => {
      fireEvent.click(sets(1)[0]);
      expect(screen.getByRole('button', { name: /X/ })).toBeInTheDocument();
    });

    test('if "Are you sure" button show up after click remove exercise button', () => {
      fireEvent.click(removeExerciseButton());
      expect(screen.getByRole('button', { name: /are you sure \?/i })).toBeInTheDocument();
    });

    test('timeout clear after 2.5 sec (if all confirmations fade out)', async () => {
      fireEvent.click(removeVersionButtons()[0]);
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /confirm/i }), {
        timeout: 2500,
      });

      fireEvent.click(sets(1)[0]);
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /X/ }), {
        timeout: 2500,
      });

      fireEvent.click(removeExerciseButton());
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(
        () => screen.queryByRole('button', { name: /are you sure \?/i }),
        { timeout: 2500 },
      );
    });
  });
  describe('remove from DB functions', () => {
    test('if remove set is called', () => {
      fireEvent.click(sets(1)[0]);
      fireEvent.click(screen.getByRole('button', { name: /X/ }));
      expect(removeSet).toHaveBeenCalled();
    });

    test('if remove version is called', () => {
      fireEvent.click(removeVersionButtons()[0]);
      fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
      expect(removeVersion).toHaveBeenCalled();
    });

    test('if remove exercise is called', () => {
      fireEvent.click(removeExerciseButton());
      fireEvent.click(screen.getByRole('button', { name: /are you sure \?/i }));
      expect(removeExercise).toHaveBeenCalled();
      expect(dispatch).toBeCalledWith(setModalClose());
    });
  });

  test('if update exercise name is called', () => {
    fireEvent.click(versionNames()[0]);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'newName' } });
    fireEvent.click(screen.getByRole('button', { name: /change name/i }));
    expect(updateExerciseName).toHaveBeenCalled();
  });
});
