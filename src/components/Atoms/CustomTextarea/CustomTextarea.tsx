import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { TextAreaStyled } from './CustomTextarea.styled';

interface CustomTextareaProps {
  initialValue?: string;
  disabled?: boolean;
  maxWidth?: number;
}

const CustomTextarea: FC<CustomTextareaProps> = ({
  initialValue = '',
  disabled,
  maxWidth = 80,
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
    setValue(e.target.value.replace(/\n/g, ''));
  };

  const handleBlur = () => {
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
      disabled={disabled}
      max_width={maxWidth}
    />
  );
};

CustomTextarea.defaultProps = {
  initialValue: '',
  disabled: false,
  maxWidth: 80,
};

export default CustomTextarea;
