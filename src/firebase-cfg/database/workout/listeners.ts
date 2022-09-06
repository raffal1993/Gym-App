import { Version, WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, onValue } from 'firebase/database';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';
import { pagesPaths } from 'utils/staticVariables/pages';

const workoutListDBListener = (
  subPageID: string | undefined,
  setStateCallback: (value: React.SetStateAction<WorkoutCardProps[]>) => void,
) => {
  const uid = auth.currentUser?.uid;

  const dbRef = ref(db, `users/${uid}/${pagesPaths.workout.name}/${subPageID}`);

  return onValue(dbRef, (snapshot) => {
    if (uid && subPageID) {
      const data = snapshot.val();
      if (data) {
        const newArray = [] as WorkoutCardProps[];

        for (const key in data) {
          if (data[key].type) {
            newArray.push({
              ...data[key],
              exerciseID: key,
            });
          }
        }

        const sortedArray = sortedArrayByTimestamp(newArray as Required<WorkoutCardProps>[]);

        setStateCallback(sortedArray);
      }
    } else setStateCallback([]);
  });
};

const exerciseDBListener = (
  subPageID: string,
  exerciseID: string,
  setExerciseNameCb: (value: React.SetStateAction<string | undefined>) => void,
  setVersionsDb: (value: React.SetStateAction<Version[]>) => void,
) => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const dbRef = ref(db, `users/${uid}/${pagesPaths.workout.name}/${subPageID}/${exerciseID}`);

    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val() as WorkoutCardProps;

      if (data) {
        setExerciseNameCb(data.name);
        setVersionsDb(data.versions);
      } else {
        setExerciseNameCb(undefined);
        setVersionsDb([]);
      }
    });
  }
};

export { workoutListDBListener, exerciseDBListener };
