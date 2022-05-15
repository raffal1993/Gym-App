import { ref, set } from 'firebase/database';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { Set, Version, WorkoutCardProps } from 'components/Organisms/Workout/WorkoutProps';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const removeSubPage = async (mainPage: string, subPageID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/${mainPage}`;
  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as { [key: string]: SidebarListProps };

    const changedPages = {} as { [key: string]: SidebarListProps };

    if (data) {
      for (const key in data) {
        if (key !== subPageID) changedPages[key] = data[key];
      }
    }

    return set(ref(db, targetPath), changedPages);
  }
};
const removeVersion = async (subPageID: string, exerciseID: string, versionIndex: number) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions`;

  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as Version[];

    let newVersions = [] as Version[];

    if (data) {
      newVersions = data.filter((_version, index) => index !== versionIndex);
    }

    return set(ref(db, targetPath), newVersions);
  }
};
const removeExercise = async (subPageID: string, exerciseID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/workout/${subPageID}`;

  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as { [key: string]: Omit<WorkoutCardProps, 'exerciseID'> };

    const newExercises = {} as { [key: string]: Omit<WorkoutCardProps, 'exerciseID'> };

    if (data) {
      for (const key in data) {
        if (key !== exerciseID) newExercises[key] = data[key];
      }
    }

    return set(ref(db, targetPath), newExercises);
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
    }

    return set(ref(db, targetPath), newSets);
  }
};

export { removeSubPage, removeVersion, removeExercise, removeSet };
