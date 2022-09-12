import React, { FC } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Wrapper } from './NoCardsFound.styled';

interface NoCardsFountProps {
  text: string;
}

const NoCardsFound: FC<NoCardsFountProps> = ({ text }) => {
  return (
    <Wrapper>
      <span className="info">{text}</span>
      <div className="info">
        Click
        <ConstructionIcon />
        for more details
      </div>
    </Wrapper>
  );
};

export default NoCardsFound;
