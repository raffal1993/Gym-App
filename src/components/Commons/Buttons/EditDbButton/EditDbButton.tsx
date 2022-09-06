import { forwardRef, ReactNode, Ref } from 'react';
import { EditDbButtonStyled } from './EditDbButton.styled';

interface EditDbButtonProps {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

const EditDbButton = forwardRef(
  ({ onClick, className, children }: EditDbButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <EditDbButtonStyled ref={ref} className={className} onClick={onClick}>
        {children || '+'}
      </EditDbButtonStyled>
    );
  },
);

export default EditDbButton;

EditDbButton.defaultProps = {
  className: '',
  children: '',
};
