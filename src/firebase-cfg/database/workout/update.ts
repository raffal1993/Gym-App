import { ref, set } from 'firebase/database';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { Set, Version } from 'components/Organisms/Workout/WorkoutProps';
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
      `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${[versionIndex]}/sets`,
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
        `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${versionIndex}/sets/${indexOfSet}`,
      ),
      newSet,
    );
  }
};
const updateSubPageName = async (
  mainPage: string,
  currentSubPageData: SidebarListProps,
  newSubPageName: string,
) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/${mainPage}`;
  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as { [key: string]: SidebarListProps };

    const changedPages = {} as { [key: string]: SidebarListProps };

    if (data) {
      for (const key in data) {
        if (key === currentSubPageData.id)
          changedPages[key] = { ...data[key], name: newSubPageName };
        else changedPages[key] = data[key];
      }
    }

    return set(ref(db, targetPath), changedPages);
  }
};
const updateExerciseName = async (
  subPageID: string,
  exerciseID: string,
  versionIndex: number,
  newName: string,
) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/workout/${subPageID}/${exerciseID}/versions/${versionIndex}`;

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
export { updateSetToDB, updateSubPageName, updateExerciseName };
