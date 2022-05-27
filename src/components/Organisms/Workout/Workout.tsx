import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddExercise from 'components/Atoms/AddExercise/AddExercise';
import AddExerciseTabs from 'components/Molecules/CustomTabs/CustomTabs';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import CustomizedRoutes from 'components/Templates/CustomizedRoutes/CustomizedRoutes';
import { v4 as uuid4 } from 'uuid';
import { clearLocalStorage } from 'helpers/localStorage';
import { importImages } from 'helpers/importImages';
import { workoutListDBListener } from 'firebase-cfg/database/workout/listeners';
import { MAX_CARDS } from 'helpers/staticVariables';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = () => {
  const [workoutList, setWorkoutList] = useState<WorkoutCardProps[]>([]);

  const {
    pages: { subPageID },
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    return workoutListDBListener(subPageID, setWorkoutList);
  }, [subPageID]);

  useEffect(() => {
    clearLocalStorage('selectedVersions');
  }, [subPageID]);

  return (
    <Wrapper>
      <StoperWidget></StoperWidget>
      {isEditModeOn && workoutList.length < MAX_CARDS && (
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
