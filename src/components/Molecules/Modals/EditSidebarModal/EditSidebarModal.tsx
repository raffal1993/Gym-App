import AddToDbButton from 'components/Atoms/Buttons/AddToDbButton/AddToDbButton';
import CloseIcon from '@mui/icons-material/Close';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { removeSubPage } from 'firebase-cfg/database';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddToDbModal from '../AddToDbModal/AddToDbModal';
import { Wrapper } from './EditSidebarModal.styled';

let timeout: NodeJS.Timer;

const EditSidebarModal = () => {
  const [nameForChange, setNameForChange] = useState<SidebarListProps>();
  const [confirmIndexes, setConfirmIndexes] = useState<number[]>([]);

  const {
    pages: { mainPage, sidebarList },
  } = useAppSelector((state): RootState => state);

  const removePage = (subPageID: string) => {
    if (mainPage && subPageID) {
      removeSubPage(mainPage, subPageID);
    }
  };

  useEffect(() => {
    setNameForChange(undefined);
    clearTimeout(timeout);
    setConfirmIndexes([]);
  }, [sidebarList]);

  const handleSetNameForChange = (nameData: SidebarListProps) => {
    if (nameForChange?.id === nameData.id) return setNameForChange(undefined);
    setNameForChange(nameData);
  };

  const handleAddConfirmation = (index: number) => {
    if (confirmIndexes.includes(index)) return;
    setConfirmIndexes([...confirmIndexes, index]);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setConfirmIndexes([]);
    }, 2500);
  };

  return (
    <Wrapper>
      <ul>
        {sidebarList &&
          sidebarList.map(({ id, name }, index) => (
            <li key={uuid4()}>
              <AddToDbButton className="remove" onClick={() => handleAddConfirmation(index)}>
                <CloseIcon />
              </AddToDbButton>
              {confirmIndexes.includes(index) && (
                <AddToDbButton className="confirmation" onClick={() => removePage(id)}>
                  confirm
                </AddToDbButton>
              )}

              <span
                className={id === nameForChange?.id ? 'active' : ''}
                onClick={() => handleSetNameForChange({ name, id })}
              >
                {name}
              </span>
            </li>
          ))}
      </ul>
      {nameForChange && (
        <AddToDbModal
          title="Enter new name: "
          typeOfAddition="changeSubPage"
          buttonText="Change name"
          subPageDataForChange={nameForChange}
        />
      )}
      <AddToDbModal title="Add new page: " typeOfAddition="addSubPage" buttonText="Add page" />
    </Wrapper>
  );
};

export default EditSidebarModal;
