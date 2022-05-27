import { ref, remove, set } from 'firebase/database';
import { Set, Version } from 'components/Organisms/Workout/WorkoutProps';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const removeVersion = async (subPageID: string, exerciseID: string, versionIndex: number) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${versionIndex}`;

  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as Version[];

    if (data) {
      return remove(ref(db, targetPath));
    }
  }
};
const removeExercise = async (subPageID: string, exerciseID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}`;

  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err);

    if (data) {
      return remove(ref(db, targetPath));
    }
  }
};
const removeSet = async (
  subPageID: string,
  exerciseID: string,
  versionIndex: number,
  setIndex: number,
) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${versionIndex}/sets`;

  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as Set[];

    let newSets = [] as Set[];
    let helpingIndex = 0;

    if (data) {
      newSets = data
        .map((set) => {
          if (Number(set.set) === setIndex + 1) return;
          return { ...set, set: String(++helpingIndex) };
        })
        .filter((set) => !!set) as Set[];
      return set(ref(db, targetPath), newSets);
    }
  }
};

export { removeVersion, removeExercise, removeSet };
