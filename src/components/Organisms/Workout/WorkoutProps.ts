export interface Set {
  info?: string;
  reps?: string;
  weight?: string;
  set: string;
}

type VersionSet = Set[];

export interface WorkoutCardProps {
  name: string;
  type: string;
  versions: VersionSet[];
}

export type PropsCard = WorkoutCardProps;
