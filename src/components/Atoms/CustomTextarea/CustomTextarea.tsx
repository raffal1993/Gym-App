import { CellToChange } from 'components/Organisms/Workout/WorkoutTypes';
import { getlastPressedKey } from 'helpers/getLastPressedKey';
import { ChangeEvent, FC, useState } from 'react';
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
  const [deleteValue, setDeleteValue] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;

    if (deleteValue) {
      const lastKey = getlastPressedKey(newValue, value);
      setValue(lastKey);
      setDeleteValue(false);
      return;
    }
    if (Number((maxWidth / 9).toFixed(0)) < newValue.length) return;
    setValue(newValue.replace(/\n/g, ''));
  };

  const handleBlur = () => {
    if (cellData && updateSet) updateSet({ ...cellData, value });
    setDeleteValue(true);
  };

  return (
    <TextAreaStyled
      width={value.length}
      onBlur={handleBlur}
      onChange={handleChange}
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
