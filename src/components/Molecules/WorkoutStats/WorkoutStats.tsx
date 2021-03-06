import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import CustomTextarea from 'components/Atoms/CustomTextarea/CustomTextarea';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import {
  Set,
  CellToChange,
  Column,
  WorkoutStatsProps,
} from 'components/Organisms/Workout/WorkoutTypes';
import useResize from 'hooks/useResize';
import { FC, useLayoutEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getScrollPosition, updateScrollPosition } from 'helpers/scrollPosition';
import { MAX_SETS } from 'helpers/staticVariables';
import { updateSetToDB } from 'firebase-cfg/database/workout/update';
import { addSetToDB } from 'firebase-cfg/database/workout/add';
import {
  HeaderStyled,
  StatsNormalStyled,
  StatsStyled,
  Wrapper,
  StatsSmallerStyled,
} from './WorkoutStats.styled';

const headerCells: Column[] = [
  { id: 'set', label: 'Set' },
  { id: 'weight', label: 'Weight' },
  {
    id: 'reps',
    label: 'Reps/Time',
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

const WorkoutStats: FC<WorkoutStatsProps> = ({ stats, exerciseID, selectedVersion }) => {
  const { isWidthSmaller } = useResize('xs');

  const {
    pages: { subPageID },
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  const ref = useRef<HTMLDivElement>(null);

  const updateSet = (cellToChange: CellToChange) => {
    const index = stats.findIndex((set) => set.set === cellToChange.set);
    const cellName = cellToChange.cell as keyof Set;
    const newSet: Set = {
      ...stats[index],
      [cellName]: cellToChange.value.trim(),
    };

    updateSetToDB(subPageID || '', exerciseID, Number(selectedVersion - 1), newSet);
  };

  const handleAddSet = () => {
    if (subPageID) addSetToDB(exerciseID, subPageID, selectedVersion - 1, stats.length);
  };

  useLayoutEffect(() => {
    const refItem = ref.current;
    let timeout: NodeJS.Timeout;

    if (refItem) refItem.scrollTop = getScrollPosition(exerciseID);

    function listener() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (refItem) {
          updateScrollPosition({ [exerciseID]: refItem.scrollTop });
        }
      }, 300);
    }

    if (refItem) refItem.addEventListener('scroll', listener);
    return () => {
      if (refItem) refItem.removeEventListener('scroll', listener);
    };
  }, [exerciseID]);

  return (
    <Wrapper>
      {isWidthSmaller ? null : (
        <HeaderStyled>
          {headerCells.map((cell) => (
            <div key={uuidv4()}>{cell.label}</div>
          ))}
        </HeaderStyled>
      )}

      <StatsStyled ref={ref}>
        {stats.map((row) => {
          return isWidthSmaller ? (
            <StatsSmallerStyled key={uuidv4()}>
              {headerCells.map((cell) => (
                <div className="stat" key={uuidv4()}>
                  <span>{cell.label}</span>
                  <CustomTextarea
                    updateSet={updateSet}
                    cellData={{ set: row.set, cell: cell.id }}
                    initialValue={row[cell.id]}
                    maxWidth={setMaxWidth(cell.id)}
                  />
                </div>
              ))}
            </StatsSmallerStyled>
          ) : (
            <StatsNormalStyled key={uuidv4()}>
              {headerCells.map((cell) => {
                return (
                  <div key={uuidv4()}>
                    <CustomTextarea
                      updateSet={updateSet}
                      cellData={{ set: row.set, cell: cell.id }}
                      initialValue={row[cell.id]}
                      maxWidth={setMaxWidth(cell.id)}
                    />
                  </div>
                );
              })}
            </StatsNormalStyled>
          );
        })}
        {isEditModeOn && stats.length < MAX_SETS && (
          <EditDbButton className="buttonAddSet" onClick={handleAddSet} />
        )}
      </StatsStyled>
    </Wrapper>
  );
};

export default WorkoutStats;
