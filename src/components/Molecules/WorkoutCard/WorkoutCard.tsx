import { FC, SyntheticEvent, useState } from 'react';
import VersionButton from 'components/Atoms/Buttons/VersionButton/VersionButton';
import { importImages } from 'helpers/importImages';
import ConstructionIcon from '@mui/icons-material/Construction';
import { v4 as uuid4 } from 'uuid';
import { getLocalStorage, updateLocalStorage } from 'helpers/localStorage';
import { addVersionToDB } from 'firebase-cfg/database';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import { RootState } from 'app/store';
import { setModalOpen } from 'app/slices/interfaceSlice';
import WorkoutStats from '../WorkoutStats/WorkoutStats';
import { TitleStyled, VersionsStyled, Wrapper } from './WorkoutCard.styled';
import { WorkoutCardProps } from '../../Organisms/Workout/WorkoutProps';
import EditExerciseModal from '../Modals/EditExerciseModal/EditExerciseModal';

const { images } = importImages();

const MAX_VERSIONS = 5;

const WorkoutCard: FC<WorkoutCardProps> = ({ exerciseID, name, type, versions }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(
    getLocalStorage('selectedVersions', exerciseID) || 1,
  );

  const dispatch = useAppDispatch();

  const {
    pages: { subPageID },
    interface: { isEditModeOn },
  } = useAppSelector((state: RootState) => state);

  const handleVersion = (_event: SyntheticEvent, versionNumber: number) => {
    setSelectedVersion(versionNumber);
    updateLocalStorage('selectedVersions', { [exerciseID]: versionNumber });
  };

  const handleAddVersion = () => {
    if (subPageID && versions.length < MAX_VERSIONS)
      addVersionToDB(exerciseID, subPageID, versions.length);
  };

  const handleOpenModal = () => {
    dispatch(
      setModalOpen(<EditExerciseModal exerciseID={exerciseID} subPageID={subPageID || ''} />),
    );
  };

  return (
    <Wrapper key={uuid4()} url={images[type]}>
      {isEditModeOn && (
        <EditDbButton className="buttonEditExercise" onClick={handleOpenModal}>
          <ConstructionIcon />
        </EditDbButton>
      )}
      <TitleStyled>
        {versions[selectedVersion - 1].alternativeName?.toUpperCase() || name.toUpperCase()}
      </TitleStyled>

      <WorkoutStats
        stats={versions[selectedVersion - 1].sets}
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
        {isEditModeOn && versions.length < MAX_VERSIONS && (
          <EditDbButton className="addVersionButton" onClick={handleAddVersion} />
        )}
      </VersionsStyled>
    </Wrapper>
  );
};

export default WorkoutCard;
