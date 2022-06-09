export interface Set {
  info?: string;
  reps?: string;
  weight?: string;
  set: string;
}

export interface Column {
  id: 'set' | 'weight' | 'reps' | 'info';
  label: string;
}

export interface Version {
  alternativeName?: string;
  sets: Set[];
}

export interface WorkoutStatsProps {
  exerciseID: string;
  selectedVersion: number;
  stats: Set[];
}

export interface WorkoutCardProps {
  exerciseID: string;
  name: string;
  type: string;
  versions: Version[];
  timestamp?: number;
}
export interface CellToChange {
  set: string;
  cell: string;
  value: string;
}

export interface AddExerciseProps {
  name?: string;
}
