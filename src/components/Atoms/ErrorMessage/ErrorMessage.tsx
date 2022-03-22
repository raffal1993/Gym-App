import { FC } from 'react';
import { ErrorMessageStyled } from './ErrorMessage.styled';

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  return <ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>;
};

export default ErrorMessage;
