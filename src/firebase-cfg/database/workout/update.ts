import { ref, set } from 'firebase/database';
import { Set, Version } from 'components/Organisms/Workout/WorkoutTypes';
import { pagesPaths } from 'utils/staticVariables/pages';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const updateSetToDB = async (
  subPageID: string,
  exerciseID: string,
  versionIndex: number,
  newSet: Set,
) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const data = (await getDataFromDB(
      `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}/versions/${[
        versionIndex,
      ]}/sets`,
    )
      .then((res) => res)
      .catch((err) => err)) as Set[];

    let indexOfSet;

    if (data) {
      indexOfSet = data.findIndex((setItem) => setItem.set === newSet.set);
    }

    return set(
      ref(
        db,
        `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}/versions/${versionIndex}/sets/${indexOfSet}`,
      ),
      newSet,
    );
  }
};

const updateExerciseName = async (
  subPageID: string,
  exerciseID: string,
  versionIndex: number,
  newName: string,
) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}/versions/${versionIndex}`;

  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as Version;

    let newVersion = {} as Version;

    if (data) {
      newVersion = { ...data, alternativeName: newName };
    }

    return set(ref(db, targetPath), newVersion);
  }
};
export { updateSetToDB, updateExerciseName };
