import { useAppSelector } from 'app/hooks';
import AddExercise from 'components/Commons/AddExercise/AddExercise';
import AddExerciseTabs from 'components/Molecules/CustomTabs/CustomTabs';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutCard from 'components/Molecules/WorkoutCard/WorkoutCard';
import { WorkoutCardProps } from 'components/Organisms/Workout/WorkoutTypes';
import NoCardsFound from 'components/Commons/NoCardsFound/NoCardsFound';
import useDelay from 'hooks/useDelay';
import { Tab } from '@mui/material';
import { v4 as uuid4 } from 'uuid';
import { clearLocalStorage } from 'helpers/localStorage';
import { importImages } from 'helpers/importImages';
import { workoutListDBListener } from 'firebase-cfg/database/workout/listeners';
import { MAX_CARDS } from 'utils/staticVariables/maxElements';
import { memo, useEffect, useState } from 'react';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = memo(() => {
  const {
    pages: { subPageID, sidebarList, mainPage },
    interface: { isEditModeOn, isSidebarItemSelected },
  } = useAppSelector((state) => state);

  const [workoutList, setWorkoutList] = useState<WorkoutCardProps[]>([]);
  const { isDelayed } = useDelay(300, mainPage);

  useEffect(() => {
    return workoutListDBListener(subPageID, setWorkoutList);
  }, [subPageID]);

  useEffect(() => {
    clearLocalStorage('selectedVersions');
    return () => clearLocalStorage('selectedVersions');
  }, [subPageID]);

  const isAddExerciseDisabled =
    sidebarList.length === 0 || workoutList.length >= MAX_CARDS || !isSidebarItemSelected;

  const showNoCardsFoundInfo =
    !isEditModeOn && isSidebarItemSelected && workoutList.length === 0 && !isDelayed;

  return (
    <Wrapper>
      <StoperWidget />
      {isEditModeOn && (
        <AddExerciseTabs value={null} className="addExerciseTabs">
          {exercises.map((el) => (
            <Tab
              style={{ cursor: isAddExerciseDisabled ? 'not-allowed' : 'pointer' }}
              key={uuid4()}
              label={<AddExercise isDisabled={isAddExerciseDisabled} name={el} />}
            ></Tab>
          ))}
        </AddExerciseTabs>
      )}
      {showNoCardsFoundInfo && <NoCardsFound text="You don't have any EXERCISES added" />}
      {workoutList.map((workoutItem) => {
        const { exerciseID, name, type, versions } = workoutItem;
        return (
          <WorkoutCard
            key={uuid4()}
            exerciseID={exerciseID}
            name={name}
            type={type}
            versions={versions}
          />
        );
      })}
    </Wrapper>
  );
});

export default Workout;
