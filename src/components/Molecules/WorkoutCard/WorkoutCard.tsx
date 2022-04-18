import VersionButton from 'components/Atoms/VersionButton/VersionButton';
import { importImages } from 'helpers/importImages';
import { FC, SyntheticEvent, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import WorkoutStats from '../WorkoutStats/WorkoutStats';
import { TitleStyled, VersionsStyled, Wrapper } from './WorkoutCard.styled';
import { WorkoutCardProps } from '../../Organisms/Workout/WorkoutProps';

const { images } = importImages();

const WorkoutCard: FC<WorkoutCardProps> = ({ name, type, versions }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(1);

  const handleVersion = (_event: SyntheticEvent, versionNumber: number) => {
    setSelectedVersion(versionNumber);
  };

  return (
    <>
      <Wrapper key={uuid4()} url={images[type]}>
        <TitleStyled>{name.toUpperCase()}</TitleStyled>
        <WorkoutStats stats={versions[selectedVersion - 1]} />
        <VersionsStyled>
          {versions.map((version, index) => (
            <VersionButton
              key={uuid4()}
              onClick={(_e: SyntheticEvent) => handleVersion(_e, index + 1)}
              isActive={index + 1 === selectedVersion}
              versionNumber={index + 1}
            />
          ))}
        </VersionsStyled>
      </Wrapper>
    </>
  );
};

export default WorkoutCard;
