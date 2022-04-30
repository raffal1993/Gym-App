import VersionButton from 'components/Atoms/Buttons/VersionButton/VersionButton';
import { importImages } from 'helpers/importImages';
import { FC, SyntheticEvent, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from 'helpers/localStorage';
import { addVersionToDB } from 'firebase-cfg/database';
import { useAppSelector } from 'app/hooks';
import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import { RootState } from 'app/store';
import WorkoutStats from '../WorkoutStats/WorkoutStats';
import { TitleStyled, VersionsStyled, Wrapper } from './WorkoutCard.styled';
import { WorkoutCardProps } from '../../Organisms/Workout/WorkoutProps';

const { images } = importImages();

const MAX_VERSIONS = 4;

const WorkoutCard: FC<WorkoutCardProps> = ({ exerciseID, name, type, versions }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(
    getLocalStorage('selectedVersions', exerciseID) || 1,
  );

  const {
    pages: { subPageID },
    interface: { isAddModeOn },
  } = useAppSelector((state: RootState) => state);

  const handleVersion = (_event: SyntheticEvent, versionNumber: number) => {
    setSelectedVersion(versionNumber);
    updateLocalStorage('selectedVersions', { [exerciseID]: versionNumber });
  };

  const handleAddVersion = () => {
    if (subPageID && versions.length < MAX_VERSIONS)
      addVersionToDB(exerciseID, subPageID, versions.length);
  };

  return (
    <Wrapper key={uuid4()} url={images[type]}>
      <TitleStyled>{name.toUpperCase()}</TitleStyled>

      <WorkoutStats
        stats={versions[selectedVersion - 1]}
        exerciseID={exerciseID}
        selectedVersion={selectedVersion}
      />

      <VersionsStyled>
        {versions.map((_version, index) => (
          <VersionButton
            key={uuid4()}
            onClick={(_e: SyntheticEvent) => handleVersion(_e, index + 1)}
            isActive={index + 1 === selectedVersion}
            versionNumber={index + 1}
          />
        ))}
        {isAddModeOn && versions.length < MAX_VERSIONS && (
          <AddToDbButton onClick={handleAddVersion} />
        )}
      </VersionsStyled>
    </Wrapper>
  );
};

export default WorkoutCard;
