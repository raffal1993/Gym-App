import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddExercise from 'components/Atoms/AddExercise/AddExercise';
import CustomTabs from 'components/Molecules/CustomTabs/CustomTabs';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { PropsCard } from 'components/Organisms/Workout/WorkoutProps';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import WorkoutContent from 'components/Templates/DashboardContent/DashboardContent';
import { v4 as uuid4 } from 'uuid';
import { auth, db } from 'firebase-cfg/firebase-config';
import { onValue, ref } from 'firebase/database';
import { importImages } from 'helpers/importImages';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = () => {
  const [workoutList, setWorkoutList] = useState<PropsCard[]>([]);

  const {
    pages: { subPage },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const dbRef = ref(db, `users/${uid}/workout`);

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        if (subPage) {
          const list = data[subPage];
          if (list) {
            const newObj = {} as typeof list;
            Object.keys(list).forEach((key: string) => {
              key !== 'name' && (newObj[key] = list[key]);
            });
            setWorkoutList(Object.values(newObj));
          }
        }
      });
    }
  }, [subPage]);

  return (
    <>
      <WorkoutContent>
        <Wrapper>
          <StoperWidget></StoperWidget>
          <CustomTabs
            className="addWorkout"
            elements={exercises}
            component={<AddExercise />}
          ></CustomTabs>
          <CustomizedRoutes>
            <Route
              path={`/${subPage}`}
              element={
                <>
                  {workoutList.map(({ name, type, versions }) => (
                    <WorkoutCard key={uuid4()} name={name} type={type} versions={versions} />
                  ))}
                </>
              }
            />

            <Route path="/*" element={<></>} />
          </CustomizedRoutes>
        </Wrapper>
      </WorkoutContent>
    </>
  );
};

export default Workout;
