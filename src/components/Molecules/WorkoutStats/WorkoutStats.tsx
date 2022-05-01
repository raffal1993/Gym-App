import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import CustomTextarea from 'components/Atoms/CustomTextarea/CustomTextarea';
import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import { Set, CellToChange } from 'components/Organisms/Workout/WorkoutProps';
import { addSetToDB, updateSetToDB } from 'firebase-cfg/database';
import useResize from 'hooks/useResize';
import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getScrollPosition, updateScrollPosition } from 'helpers/scrollPosition';
import {
  HeaderStyled,
  StatsNormalStyled,
  StatsStyled,
  Wrapper,
  StatsSmallerStyled,
} from './WorkoutStats.styled';

const MAX_SETS = 10;

interface Column {
  id: 'set' | 'weight' | 'reps' | 'info';
  label: string;
}

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

interface AdditionalProps {
  exerciseID: string;
  selectedVersion: number;
}

const WorkoutStats: FC<{ stats: Set[] } & AdditionalProps> = ({
  stats,
  exerciseID,
  selectedVersion,
}) => {
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
    if (refItem) refItem.scroll(0, getScrollPosition(exerciseID));
  }, [exerciseID]);

  useEffect(() => {
    const refItem = ref.current;

    function timeout() {
      setTimeout(() => {
        if (refItem && refItem.scrollTop) {
          updateScrollPosition({ [exerciseID]: refItem.scrollTop });
        }
      }, 300);
    }

    if (refItem) refItem.addEventListener('scroll', timeout);
    return () => refItem?.removeEventListener('scroll', timeout);
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
          <AddToDbButton className="buttonAddSet" onClick={handleAddSet} />
        )}
      </StatsStyled>
    </Wrapper>
  );
};

export default WorkoutStats;
