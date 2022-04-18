import CustomInput from 'components/Atoms/CustomTextarea/CustomTextarea';
import { Set } from 'components/Organisms/Workout/WorkoutProps';
import useResize from 'hooks/useResize';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  HeaderStyled,
  StatsRowStyled,
  StatsStyled,
  Wrapper,
  SetContainerStyled,
} from './WorkoutStats.styled';

interface Column {
  id: 'set' | 'weight' | 'reps' | 'info';
  label: string;
}

const headerCells: Column[] = [
  { id: 'set', label: 'Set' },
  { id: 'weight', label: 'Weight' },
  {
    id: 'reps',
    label: 'Reps',
  },
  {
    id: 'info',
    label: 'Info',
  },
];

const setMaxWidth = (cell: string) => {
  switch (cell) {
    case 'weight':
      return 70;
    case 'reps':
      return 70;
    case 'info':
      return 120;
    default:
      return 80;
  }
};

interface Sets {
  stats: Set[];
}

const WorkoutStats: FC<Sets> = ({ stats }) => {
  const { isWidthSmaller } = useResize('xs');

  return (
    <Wrapper>
      {isWidthSmaller ? null : (
        <HeaderStyled>
          {headerCells.map((cell) => (
            <div key={uuidv4()}>{cell.label}</div>
          ))}
        </HeaderStyled>
      )}

      <StatsStyled>
        {stats.map((row) => {
          return isWidthSmaller ? (
            <SetContainerStyled key={uuidv4()}>
              {headerCells.map((cell) => (
                <div className="stat" key={uuidv4()}>
                  <span>{cell.label}</span>
                  <CustomInput
                    initialValue={row[cell.id]}
                    disabled={cell.id === 'set'}
                    maxWidth={setMaxWidth(cell.id)}
                  />
                </div>
              ))}
            </SetContainerStyled>
          ) : (
            <StatsRowStyled key={uuidv4()}>
              {headerCells.map((cell) => (
                <div key={uuidv4()}>
                  <CustomInput
                    initialValue={row[cell.id]}
                    disabled={cell.id === 'set'}
                    maxWidth={setMaxWidth(cell.id)}
                  />
                </div>
              ))}
            </StatsRowStyled>
          );
        })}
      </StatsStyled>
    </Wrapper>
  );
};

export default WorkoutStats;
