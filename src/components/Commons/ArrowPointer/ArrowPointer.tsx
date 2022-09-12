import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { FC, HTMLProps } from 'react';
import { Wrapper } from './ArrowPointer.styled';

const ArrowPointer: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <DoubleArrowIcon />
      <DoubleArrowIcon className="secondArrow" />
    </Wrapper>
  );
};

export default ArrowPointer;
