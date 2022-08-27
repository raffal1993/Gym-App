import {
  Set,
  Version,
  WorkoutCardProps,
  WorkoutStatsProps,
} from 'components/Organisms/Workout/WorkoutTypes';

export const mockedExerciseID = '-testExerciseID';

export const mockedExerciseSet = (content: string): Set => ({
  info: `${content}Info`,
  reps: `${content}Reps`,
  set: `${content}Set`,
  weight: `${content}Weight`,
});

export const mockedExerciseVersions: Version[] = [
  {
    alternativeName: 'testAlternativeName1',
    sets: [
      { ...mockedExerciseSet('test1set1') },
      { ...mockedExerciseSet('test1set2') },
      { ...mockedExerciseSet('test1set3') },
    ],
  },
  {
    alternativeName: 'testAlternativeName2',
    sets: [
      { ...mockedExerciseSet('test2set1') },
      { ...mockedExerciseSet('test2set2') },
      { ...mockedExerciseSet('test2set3') },
    ],
  },
  {
    alternativeName: 'testAlternativeName3',
    sets: [
      { ...mockedExerciseSet('test3set1') },
      { ...mockedExerciseSet('test3set2') },
      { ...mockedExerciseSet('test3set3') },
    ],
  },
];

export const mockedWorkoutCard: WorkoutCardProps = {
  exerciseID: mockedExerciseID,
  name: 'testWorkoutCardName',
  type: 'testType',
  versions: mockedExerciseVersions,
  timestamp: 1658241432686,
};

export const workoutStatsProps: WorkoutStatsProps = {
  exerciseID: mockedExerciseID,
  selectedVersion: 1,
  stats: [
    { ...mockedExerciseSet('stat1') },
    { ...mockedExerciseSet('stat2') },
    { ...mockedExerciseSet('stat3') },
  ],
};
