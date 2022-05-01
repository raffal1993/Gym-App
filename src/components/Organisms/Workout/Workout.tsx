import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddExercise from 'components/Atoms/AddExercise/AddExercise';
import AddExerciseTabs from 'components/Molecules/CustomTabs/CustomTabs';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { WorkoutCardProps } from 'components/Organisms/Workout/WorkoutProps';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { v4 as uuid4 } from 'uuid';
import { auth, db } from 'firebase-cfg/firebase-config';
import { onValue, ref } from 'firebase/database';
import { clearLocalStorage } from 'helpers/localStorage';
import { importImages } from 'helpers/importImages';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = () => {
  const [workoutList, setWorkoutList] = useState<WorkoutCardProps[]>([]);

  const {
    pages: { subPageID },
    interface: { isAddModeOn },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    const dbRef = ref(db, `users/${uid}/workout/${subPageID}`);

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

          setWorkoutList(sortedArray);
        }
      } else setWorkoutList([]);
    });
  }, [subPageID]);

  useEffect(() => {
    clearLocalStorage('selectedVersions');
  }, [subPageID]);

  return (
    <Wrapper>
      <StoperWidget></StoperWidget>
      {isAddModeOn && workoutList.length < 10 && (
        <AddExerciseTabs
          className="addExerciseTabs"
          elements={exercises}
          component={<AddExercise />}
        ></AddExerciseTabs>
      )}

      <CustomizedRoutes>
        <Route
          path={`/${subPageID}`}
          element={
            <>
              {workoutList.map(({ exerciseID, name, type, versions }) => (
                <WorkoutCard
                  key={uuid4()}
                  exerciseID={exerciseID}
                  name={name}
                  type={type}
                  versions={versions}
                />
              ))}
            </>
          }
        />

        <Route path="/*" element={<></>} />
      </CustomizedRoutes>
    </Wrapper>
  );
};

export default Workout;
