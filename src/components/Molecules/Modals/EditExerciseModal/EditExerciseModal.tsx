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

let timeout: NodeJS.Timer;

const EditExerciseModal: FC<EditExerciseModalProps> = ({ exerciseID, subPageID }) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number>();
  const [confirmItems, setConfirmItems] = useState<(number | string)[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [mainExerciseName, setMainExerciseName] = useState<string>();
  const [nameDataForChange, setNameDataForChange] = useState<EditNameExercise>();

  const dispatch = useDispatch();

  const handeRemoveExercise = () => {
    removeExercise(subPageID, exerciseID);
    clearTimeout(timeout);
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

  const handleConfirmations = (index: number | string) => {
    if (confirmItems.includes(index)) return;
    setConfirmItems([...confirmItems, index]);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setConfirmItems([]);
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
    clearTimeout(timeout);
    setConfirmItems([]);
    setSelectedVersionIndex(undefined);
  }, [versions]);

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
                  <p>{versionIndex + 1}.</p>
                  {`${alternativeName?.toUpperCase() || mainExerciseName?.toUpperCase()} `}
                </NameStyled>
              </div>
              <div className="sets">
                {sets.map(({ set }, setIndex) => {
                  return (
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
      {confirmItems.includes(`removeExercise`) ? (
        <EditDbButton className="removeExercise" onClick={() => handeRemoveExercise()}>
          ARE YOU SURE ?
        </EditDbButton>
      ) : (
        <EditDbButton
          className="removeExercise"
          onClick={() => handleConfirmations('removeExercise')}
        >
          Remove exercise
        </EditDbButton>
      )}
    </Wrapper>
  );
};

export default EditExerciseModal;