import AddExercise from 'components/Atoms/AddExercise/AddExercise';
import CustomTabs from 'components/Molecules/CustomTabs/CustomTabs';
import Sidebar, { SidebarProps } from 'components/Molecules/Sidebar/Sidebar';
import StoperWidget from 'components/Molecules/StoperWidget/StoperWidget';
import WorkoutContent from 'components/Templates/DashboardContent/DashboardContent';
import { importImages } from 'helpers/importImages';
import { useEffect, useState } from 'react';
import { Wrapper } from './Workout.styled';

const { exercises } = importImages();

const Workout = () => {
  const [sidebarWorkoutList, setSidebarWorkoutList] = useState<SidebarProps['sidebarList']>([]);

  useEffect(() => {
    setSidebarWorkoutList(['Workout', 'Workout', 'Workout']);
  }, []);

  return (
    <>
      <Sidebar sidebarList={sidebarWorkoutList} />
      <WorkoutContent>
        <Wrapper>
          <StoperWidget></StoperWidget>
          <CustomTabs
            className="AddWorkout"
            elements={exercises}
            component={<AddExercise />}
          ></CustomTabs>
        </Wrapper>
      </WorkoutContent>
    </>
  );
};

export default Workout;
