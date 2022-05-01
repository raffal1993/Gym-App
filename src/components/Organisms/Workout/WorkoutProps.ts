export interface Set {
  info?: string;
  reps?: string;
  weight?: string;
  set: string;
}

export interface Versions {
  alternativeName?: string;
  sets: Set[];
}

export interface WorkoutCardProps {
  exerciseID: string;
  name: string;
  type: string;
  versions: Versions[];
  timestamp?: number;
}
export interface CellToChange {
  set: string;
  cell: string;
  value: string;
}
