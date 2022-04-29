import { FC } from 'react';
import { ErrorMessageStyled } from './ErrorMessage.styled';

interface ErrorMessageProps {
  errorMessage: string;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage, className }) => {
  return <ErrorMessageStyled className={className}>{errorMessage}</ErrorMessageStyled>;
};

export default ErrorMessage;

ErrorMessage.defaultProps = {
  className: '',
};
