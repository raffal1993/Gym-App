import { FC, SyntheticEvent } from 'react';
import { VersionButtonStyled } from './VersionButton.styled';

interface VersionProps {
  versionNumber: number;
  isActive: boolean;
  onClick: (e: SyntheticEvent) => void;
}

const VersionButton: FC<VersionProps> = ({ versionNumber, isActive, onClick }) => {
  return (
    <VersionButtonStyled onClick={onClick} className={isActive ? 'active' : undefined}>
      {versionNumber}
    </VersionButtonStyled>
  );
};

export default VersionButton;
