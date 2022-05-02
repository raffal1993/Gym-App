import EditDbButton from 'components/Atoms/Buttons/EditDbButton/EditDbButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { removeExercise, removeVersion, removeSet } from 'firebase-cfg/database';
import { ref, onValue } from 'firebase/database';
import { auth, db } from 'firebase-cfg/firebase-config';
import { Version, WorkoutCardProps } from 'components/Organisms/Workout/WorkoutProps';
import { clearLocalStorage } from 'helpers/localStorage';
import { useDispatch } from 'react-redux';
import { setModalClose } from 'app/slices/interfaceSlice';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { Wrapper } from './EditExerciseModal.styled';
import { ConfirmationButtonStyled, NameStyled, RemoveButtonStyled } from '../Modals.styled';
import { EditExerciseModalProps, EditNameExercise } from '../ModalsProps';

let versionsTimeout: NodeJS.Timer;
let setsTimeout: NodeJS.Timer;

const EditExerciseModal: FC<EditExerciseModalProps> = ({ exerciseID, subPageID }) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>();
  const [confirmVersionsIndexes, setConfirmVersionsIndexes] = useState<number[]>([]);
  const [confirmSetsIndexes, setConfirmSetsIndexes] = useState<string[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [mainExerciseName, setMainExerciseName] = useState<string>();
  const [nameDataForChange, setNameDataForChange] = useState<EditNameExercise>();

  const dispatch = useDispatch();

  const handeRemoveExercise = () => {
    removeExercise(subPageID, exerciseID);
    clearTimeout(versionsTimeout);
    clearTimeout(setsTimeout);
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

  const handleVersionConfirmation = (index: number) => {
    if (confirmVersionsIndexes.includes(index)) return;
    setConfirmVersionsIndexes([...confirmVersionsIndexes, index]);
    clearTimeout(versionsTimeout);
    versionsTimeout = setTimeout(() => {
      setConfirmVersionsIndexes([]);
    }, 2500);
  };

  const handleSetsConfirmations = (versionIndex: number, set: string) => {
    const setPlacementInfo = `${versionIndex}.${set}`;
    if (confirmSetsIndexes.includes(setPlacementInfo)) return;

    setConfirmSetsIndexes([...confirmSetsIndexes, setPlacementInfo]);
    clearTimeout(setsTimeout);
    setsTimeout = setTimeout(() => {
      setConfirmSetsIndexes([]);
    }, 2500);
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const dbRef = ref(db, `users/${uid}/workout/${subPageID}/${exerciseID}`);

      return onValue(dbRef, (snapshot) => {
        const data = snapshot.val() as WorkoutCardProps;

        if (data) {
          setMainExerciseName(data.name);
          setVersions(data.versions);
        } else {
          setMainExerciseName(undefined);
          setVersions([]);
        }
      });
    }
  }, [subPageID, exerciseID]);

  useEffect(() => {
    clearTimeout(versionsTimeout);
    clearTimeout(setsTimeout);
    setConfirmVersionsIndexes([]);
    setConfirmSetsIndexes([]);
    setSelectedVersionIndex(undefined);
  }, [versions]);

  return (
    <Wrapper>
      <ul>
        {versions &&
          versions.map(({ alternativeName, sets }, versionIndex) => (
            <li key={uuid4()}>
              <div className="version">
                <RemoveButtonStyled onClick={() => handleVersionConfirmation(versionIndex)}>
                  <CloseIcon />
                </RemoveButtonStyled>
                {confirmVersionsIndexes.includes(versionIndex) && (
                  <ConfirmationButtonStyled onClick={() => handleRemoveVersion(versionIndex)}>
                    confirm
                  </ConfirmationButtonStyled>
                )}
                <NameStyled
                  className={versionIndex === selectedVersionIndex ? 'active' : ''}
                  onClick={() => handleSetNameForChange(versionIndex)}
                >
                  <p>{versionIndex + 1}.</p>
                  {`${alternativeName?.toUpperCase() || mainExerciseName?.toUpperCase()} `}
                </NameStyled>
              </div>
              <div className="sets">
                {sets.map(({ set }, setIndex) => {
                  return (
                    <React.Fragment key={uuid4()}>
                      {confirmSetsIndexes.includes(`${versionIndex}.${set}`) ? (
                        <EditDbButton
                          className="removeSet"
                          onClick={() => handleRemoveSet(versionIndex, setIndex)}
                        >
                          X
                        </EditDbButton>
                      ) : (
                        <EditDbButton onClick={() => handleSetsConfirmations(versionIndex, set)}>
                          {set}
                        </EditDbButton>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </li>
          ))}
      </ul>
      {selectedVersionIndex !== undefined && (
        <AddEditNameModal
          title="Enter new name: "
          typeOfAddition="changeExercise"
          buttonText="Change name"
          className="changeVersionName"
          nameDataForChange={nameDataForChange}
        />
      )}

      <EditDbButton className="removeExercise" onClick={handeRemoveExercise}>
        Remove exercise
      </EditDbButton>
    </Wrapper>
  );
};

export default EditExerciseModal;
