import { FC } from 'react';
import { LoginPanelTitleStyled } from './LoginPanelTitle.styled';

interface TitleProps {
  title: string;
}

const LoginPanelTitle: FC<TitleProps> = ({ title }) => {
  return <LoginPanelTitleStyled>{title}</LoginPanelTitleStyled>;
};

export default LoginPanelTitle;
