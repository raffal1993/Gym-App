import { CellToChange } from 'components/Organisms/Workout/WorkoutTypes';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { TextAreaStyled } from './CustomTextarea.styled';

interface CellData {
  set: string;
  cell: string;
}

interface CustomTextareaProps {
  initialValue?: string;
  maxWidth?: number;
  cellData?: CellData;
  updateSet?: (cell: CellToChange) => void;
}

const CustomTextarea: FC<CustomTextareaProps> = ({
  initialValue = '',
  maxWidth = 80,
  cellData,
  updateSet,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [lastKey, setLastKey] = useState<string>('');
  const [deleteValue, setDeleteValue] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (deleteValue) {
      setValue(lastKey);
      setDeleteValue(false);
      return;
    }
    if (Number((maxWidth / 9).toFixed(0)) < e.target.value.length) return;
    setValue(e.target.value.replace(/\n/g, ''));
  };

  const handleBlur = () => {
    if (cellData && updateSet) updateSet({ ...cellData, value });
    setDeleteValue(true);
  };

  const onKeyPress = (e: KeyboardEvent) => {
    setLastKey(e.key === 'Enter' || e.key === 'Backspace' ? '' : e.key);
  };
  return (
    <TextAreaStyled
      width={value.length}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={onKeyPress}
      value={value}
      disabled={cellData?.cell === 'set'}
      max_width={maxWidth}
    />
  );
};

CustomTextarea.defaultProps = {
  initialValue: '',
  maxWidth: 80,
  cellData: {
    set: '',
    cell: '',
  },
  updateSet: () => {},
};

export default CustomTextarea;
