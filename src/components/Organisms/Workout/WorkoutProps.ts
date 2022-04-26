export interface Set {
  info?: string;
  reps?: string;
  weight?: string;
  set: string;
}

type VersionSet = Set[];

export interface WorkoutCardProps {
  exerciseID: string;
  name: string;
  type: string;
  versions: VersionSet[];
}
export interface CellToChange {
  set: string;
  cell: string;
  value: string;
}

export type PropsCard = WorkoutCardProps;
