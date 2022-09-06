import { FoodCardInfo } from 'components/Organisms/Food/FoodTypes';

export interface EditExerciseModalProps {
  exerciseID: string;
  subPageID: string;
}

export interface EditNameExercise extends Omit<EditExerciseModalProps, 'subPageID'> {
  versionIndex: number;
}

export interface AddCustomFoodModalProps {
  cards: FoodCardInfo[];
  subPageID: string;
}

export interface AddEditNameModalProps {
  className?: string;
  title: string;
  buttonText: string;
  updateDbCallback: (newName: string) => void;
  checkIfAllIsValid?: () => boolean;
  inputType?: 'text' | 'number';
}

export interface EditSidebarModalProps {
  setIndexSidebarPage: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface EditFoodSetModalProps {
  foodCardID: string;
}
