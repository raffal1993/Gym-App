import { child, ref, update, push, serverTimestamp } from 'firebase/database';
import { ConvertTimestampDB } from 'components/Organisms/Food/FoodProps';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { Set, Version, WorkoutCardProps } from 'components/Organisms/Workout/WorkoutProps';
import { auth, db } from '../../firebase-config';

const addVersionToDB = (exerciseID: string, subPageID: string, indexOfNextVersion: number) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${indexOfNextVersion}`;

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
    const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${indexOfSelectedVersion}/sets/${indexOfNextSet}`;

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
    const targetPath = `users/${uid}/workout/${subPageID}`;

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

const addSubPageToDB = (mainPage: string, subPageName: string) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/${mainPage}`;

    const newSubPageKey = push(child(ref(db), targetPath)).key;
    if (!newSubPageKey) return console.error('newSubPageKey is null');

    const newSubPage: Omit<ConvertTimestampDB<SidebarListProps>, 'id'> = {
      name: subPageName,
      timestamp: serverTimestamp(),
    };

    const updates = {} as {
      [key: string]: typeof newSubPage;
    };

    updates[targetPath + `/${newSubPageKey}`] = newSubPage;

    return update(ref(db), updates);
  }
};

export { addVersionToDB, addSetToDB, addExerciseToDB, addSubPageToDB };
