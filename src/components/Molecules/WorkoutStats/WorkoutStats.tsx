import CustomInput from 'components/Atoms/CustomInput/CustomInput';
import { v4 as uuidv4 } from 'uuid';
import { HeaderStyled, StatsRowStyled, StatsStyled, Wrapper } from './WorkoutStats.styled';

interface Column {
  id: 'set' | 'weight' | 'reps' | 'info';
  label: string;
}

const headerCells: readonly Column[] = [
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

interface Row {
  set: string;
  weight: string;
  reps: string;
  info: string;
}

const tableRows: Row[] = [
  { set: '1', weight: '15kg', reps: '5', info: 'heat up' },
  { set: '2', weight: '20kg', reps: '4', info: 'heat up1' },
  { set: '3', weight: '25kg', reps: '3', info: 'heat up2' },
  { set: '4', weight: '30kg', reps: '2', info: 'heat up3' },
  { set: '5', weight: '45kg', reps: '1', info: 'heat up4' },
  { set: '6', weight: '45kg', reps: '1', info: 'heat up4' },
  { set: '7', weight: '45kg', reps: '1', info: 'heat up4' },
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

const WorkoutStats = () => {
  return (
    <Wrapper>
      <HeaderStyled>
        {headerCells.map((cell) => (
          <div key={uuidv4()}>{cell.label}</div>
        ))}
      </HeaderStyled>
      <StatsStyled>
        {tableRows.map((row) => (
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
        ))}
      </StatsStyled>
      <div>
        V:
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </Wrapper>
  );
};

export default WorkoutStats;
