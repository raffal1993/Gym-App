import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { removeExercise, removeVersion, removeSet } from 'firebase-cfg/database/workout/remove';
import { updateExerciseName } from 'firebase-cfg/database/workout/update';
import { exerciseDBListener } from 'firebase-cfg/database/workout/listeners';
import { clearLocalStorage } from 'helpers/localStorage';
import { useAppDispatch } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import EditDbButton from 'components/Commons/Buttons/EditDbButton/EditDbButton';
import { Version } from 'components/Organisms/Workout/WorkoutTypes';
import { EditExerciseModalProps, EditNameExercise } from '../ModalsTypes';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { Wrapper } from './EditExerciseModal.styled';
import {
  ConfirmationButtonStyled,
  NameStyled,
  RemoveButtonStyled,
  RemoveCardButtonStyled,
} from '../Modals.styled';

const initialTimer = setTimeout(() => {});

const EditExerciseModal: FC<EditExerciseModalProps> = ({ exerciseID, subPageID }) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>();
  const [confirmItems, setConfirmItems] = useState<(number | string)[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [mainExerciseName, setMainExerciseName] = useState<string>();
  const [nameDataForChange, setNameDataForChange] = useState<EditNameExercise>();
  const [timer, setTimer] = useState<NodeJS.Timeout>(initialTimer);

  const dispatch = useAppDispatch();

  const handeRemoveExercise = () => {
    removeExercise(subPageID, exerciseID);
    clearTimeout(timer);
    dispatch(setModalClose());
  };

  const handleRemoveVersion = (index: number) => {
    if (versions.length === 1) {
      handeRemoveExercise();
      return;
    }
    removeVersion(subPageID, exerciseID, index);
    clearLocalStorage('selectedVersions');
  };

  const handleRemoveSet = (versionIndex: number, setIndex: number) => {
    if (versions.length === 1 && versions[versionIndex].sets.length === 1)
      return handeRemoveExercise();
    if (versions[versionIndex].sets.length === 1) return handleRemoveVersion(versionIndex);
    removeSet(subPageID, exerciseID, versionIndex, setIndex);
  };

  const handleSetNameForChange = (index: number) => {
    setNameDataForChange({
      exerciseID,
      versionIndex: index,
    });

    if (selectedVersionIndex === index) return setSelectedVersionIndex(undefined);
    setSelectedVersionIndex(index);
  };

  const updateExercise = (newName: string) => {
    if (subPageID && nameDataForChange)
      updateExerciseName(
        subPageID,
        nameDataForChange.exerciseID,
        nameDataForChange.versionIndex,
        newName,
      );
  };

  const handleConfirmations = (index: number | string) => {
    if (confirmItems.includes(index)) return;
    setConfirmItems([...confirmItems, index]);
    clearTimeout(initialTimer);
    setTimer(
      setTimeout(() => {
        setConfirmItems([]);
      }, 2500),
    );
  };

  useEffect(() => {
    return exerciseDBListener(subPageID, exerciseID, setMainExerciseName, setVersions);
  }, [subPageID, exerciseID]);

  useEffect(() => {
    setConfirmItems([]);
    setSelectedVersionIndex(undefined);
  }, [versions]);

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      <ul>
        {versions &&
          versions.map(({ alternativeName, sets }, versionIndex) => (
            <li key={uuid4()}>
              <div className="version">
                <RemoveButtonStyled onClick={() => handleConfirmations(versionIndex)}>
                  <CloseIcon />
                </RemoveButtonStyled>
                {confirmItems.includes(versionIndex) && (
                  <ConfirmationButtonStyled onClick={() => handleRemoveVersion(versionIndex)}>
                    confirm
                  </ConfirmationButtonStyled>
                )}
                <NameStyled
                  className={versionIndex === selectedVersionIndex ? 'active' : ''}
                  onClick={() => handleSetNameForChange(versionIndex)}
                >
                  <p>{`${versionIndex + 1}.`}</p>
                  {`${alternativeName?.toUpperCase() || mainExerciseName?.toUpperCase()} `}
                </NameStyled>
              </div>

              <div className="sets">
                {sets.map(({ set }, setIndex) => (
                  <React.Fragment key={uuid4()}>
                    {confirmItems.includes(`${versionIndex}.${set}`) ? (
                      <EditDbButton
                        className="removeSet"
                        onClick={() => handleRemoveSet(versionIndex, setIndex)}
                      >
                        X
                      </EditDbButton>
                    ) : (
                      <EditDbButton onClick={() => handleConfirmations(`${versionIndex}.${set}`)}>
                        {set}
                      </EditDbButton>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </li>
          ))}
      </ul>
      {selectedVersionIndex !== undefined && (
        <AddEditNameModal
          title="Enter new name: "
          updateDbCallback={updateExercise}
          buttonText="Change name"
          className="changeVersionName"
        />
      )}
      {confirmItems.includes(`removeExercise`) ? (
        <RemoveCardButtonStyled onClick={() => handeRemoveExercise()}>
          ARE YOU SURE ?
        </RemoveCardButtonStyled>
      ) : (
        <RemoveCardButtonStyled onClick={() => handleConfirmations('removeExercise')}>
          Remove exercise ?
        </RemoveCardButtonStyled>
      )}
    </Wrapper>
  );
};

export default EditExerciseModal;
