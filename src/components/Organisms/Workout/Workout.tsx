import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddExercise from 'components/Atoms/AddExercise/AddExercise';
import AddExerciseTabs from 'components/Molecules/CustomTabs/CustomTabs';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import { Tab } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import { clearLocalStorage } from 'helpers/localStorage';
import { importImages } from 'helpers/importImages';
import { workoutListDBListener } from 'firebase-cfg/database/workout/listeners';
import { MAX_CARDS } from 'helpers/staticVariables';
import { memo, useEffect, useState } from 'react';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = memo(() => {
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
    return () => clearLocalStorage('selectedVersions');
  }, [subPageID]);

  return (
    <Wrapper>
      <StoperWidget />
      {isEditModeOn && workoutList.length < MAX_CARDS && (
        <AddExerciseTabs className="addExerciseTabs">
          {exercises.map((el) => (
            <Tab key={uuid4()} label={<AddExercise name={el} />}></Tab>
          ))}
        </AddExerciseTabs>
      )}
      {workoutList.map(({ exerciseID, name, type, versions }) => (
        <WorkoutCard
          key={uuid4()}
          exerciseID={exerciseID}
          name={name}
          type={type}
          versions={versions}
        />
      ))}
    </Wrapper>
  );
});

export default Workout;
