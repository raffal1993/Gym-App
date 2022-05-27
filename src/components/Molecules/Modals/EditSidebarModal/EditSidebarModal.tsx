import CloseIcon from '@mui/icons-material/Close';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { removeSubPage } from 'firebase-cfg/database/dashboard/remove';
import { addSubPageToDB } from 'firebase-cfg/database/dashboard/add';
import { updateSubPageName } from 'firebase-cfg/database/dashboard/update';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { Wrapper } from './EditSidebarModal.styled';
import { ConfirmationButtonStyled, NameStyled, RemoveButtonStyled } from '../Modals.styled';

let timeout: NodeJS.Timer;

const EditSidebarModal = () => {
  const [nameForChange, setNameForChange] = useState<SidebarListProps>();
  const [confirmIndexes, setConfirmIndexes] = useState<number[]>([]);

  const {
    pages: { mainPage, sidebarList },
  } = useAppSelector((state): RootState => state);

  const removePage = (pageID: string) => {
    if (mainPage && pageID) removeSubPage(mainPage, pageID);
  };

  const addSubPage = (newName: string) => {
    if (mainPage) addSubPageToDB(mainPage, newName);
  };

  const updateSubPage = (newName: string) => {
    if (mainPage && nameForChange) updateSubPageName(mainPage, nameForChange, newName);
  };

  useEffect(() => {
    setNameForChange(undefined);
    setConfirmIndexes([]);
    return () => clearTimeout(timeout);
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
              <RemoveButtonStyled onClick={() => handleAddConfirmation(index)}>
                <CloseIcon />
              </RemoveButtonStyled>
              {confirmIndexes.includes(index) && (
                <ConfirmationButtonStyled onClick={() => removePage(id)}>
                  confirm
                </ConfirmationButtonStyled>
              )}

              <NameStyled
                className={id === nameForChange?.id ? 'active' : ''}
                onClick={() => handleSetNameForChange({ name, id })}
              >
                {name.toUpperCase()}
              </NameStyled>
            </li>
          ))}
      </ul>
      {nameForChange && (
        <AddEditNameModal
          title="Enter new name: "
          updateDbCallback={updateSubPage}
          buttonText="Change name"
        />
      )}
      <AddEditNameModal
        title="Add new page: "
        updateDbCallback={addSubPage}
        buttonText="Add page"
      />
    </Wrapper>
  );
};

export default EditSidebarModal;
