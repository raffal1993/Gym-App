import { Set } from 'components/Organisms/Workout/WorkoutProps';
import { child, ref, get, set, update } from 'firebase/database';
import { auth, db } from './firebase-config';

const getDataFromDB = async (path: string) => {
  return new Promise((res, rej) => {
    get(child(ref(db), path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return res(snapshot.val());
        }
        console.error(`Snapshot doesn't exist`);
        return rej();
      })
      .catch((error) => {
        console.error(error);
        return rej(error);
      });
  });
};

const updateSetToDB = async (
  subPageID: string,
  exerciseID: string,
  versionIndex: number,
  newSet: Set,
) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const data = (await getDataFromDB(
      `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${[versionIndex]}`,
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
        `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${versionIndex}/${indexOfSet}`,
      ),
      newSet,
    );
  }
};

const addVersionToDB = (exerciseID: string, subPageID: string, numberOfNextVersion: number) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${numberOfNextVersion}/0`;

    const newVersion = {
      set: '1',
      reps: '',
      weight: '',
      info: '',
    } as Set;

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
  selectedVersion: number,
  numberOfNextSet: number,
) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${selectedVersion}/${numberOfNextSet}`;

    const newSet = {
      set: `${numberOfNextSet + 1}`,
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

export { updateSetToDB, addVersionToDB, addSetToDB };
