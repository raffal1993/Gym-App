export interface EditExerciseModalProps {
  exerciseID: string;
  subPageID: string;
}

export interface EditNameExercise extends Omit<EditExerciseModalProps, 'subPageID'> {
  versionIndex: number;
}
