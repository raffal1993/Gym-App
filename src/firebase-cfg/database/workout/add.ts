import { child, ref, update, push, serverTimestamp } from 'firebase/database';
import { Set, Version, WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import { pagesPaths } from 'utils/staticVariables/pages';
import { auth, db } from '../../firebase-config';
import { ConvertTimestampDB } from '../dbTypes';

const addVersionToDB = (exerciseID: string, subPageID: string, indexOfNextVersion: number) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}/versions/${indexOfNextVersion}`;

    const newVersion = {
      alternativeName: '',
      sets: [
        {
          set: '1',
          reps: '',
          weight: '',
          info: '',
        },
      ],
    } as Version;

    const updates = {} as {
      [key: string]: typeof newVersion;
    };

    updates[targetPath] = newVersion;

    return update(ref(db), updates);
  }
};

const addSetToDB = (
  exerciseID: string,
  subPageID: string,
  indexOfSelectedVersion: number,
  indexOfNextSet: number,
) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}/versions/${indexOfSelectedVersion}/sets/${indexOfNextSet}`;

    const newSet = {
      set: `${indexOfNextSet + 1}`,
      reps: '',
      weight: '',
      info: '',
    } as Set;

    const updates = {} as {
      [key: string]: typeof newSet;
    };

    updates[targetPath] = newSet;

    return update(ref(db), updates);
  }
};

const addExerciseToDB = (subPageID: string, name: string, type: string) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/${pagesPaths.workout.name}/${subPageID}`;

    const newExerciseKey = push(child(ref(db), targetPath)).key;
    if (!newExerciseKey) return console.error('newExerciseKey is null');

    const newExercise: Omit<ConvertTimestampDB<WorkoutCardProps>, 'exerciseID'> = {
      name,
      type,
      timestamp: serverTimestamp(),
      versions: [{ alternativeName: '', sets: [{ set: '1', reps: '', weight: '', info: '' }] }],
    };

    const updates = {} as {
      [key: string]: typeof newExercise;
    };

    updates[targetPath + `/${newExerciseKey}`] = newExercise;

    return update(ref(db), updates);
  }
};

export { addVersionToDB, addSetToDB, addExerciseToDB };
