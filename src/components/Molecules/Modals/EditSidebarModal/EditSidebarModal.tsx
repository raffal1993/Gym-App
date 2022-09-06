import CloseIcon from '@mui/icons-material/Close';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { FC, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { useAppSelector } from 'app/hooks';
import { MAX_SIDEBAR_ELEMENTS } from 'utils/staticVariables/maxElements';
import { removeSubPage } from 'firebase-cfg/database/dashboard/remove';
import { addSubPageToDB } from 'firebase-cfg/database/dashboard/add';
import { updateSubPageName } from 'firebase-cfg/database/dashboard/update';
import AddEditNameModal from '../AddEditNameModal/AddEditNameModal';
import { Wrapper } from './EditSidebarModal.styled';
import { ConfirmationButtonStyled, NameStyled, RemoveButtonStyled } from '../Modals.styled';
import { EditSidebarModalProps } from '../ModalsTypes';

const initialTimer = setTimeout(() => {});

const EditSidebarModal: FC<EditSidebarModalProps> = ({ setIndexSidebarPage }) => {
  const [nameForChange, setNameForChange] = useState<SidebarListProps>();
  const [confirmIndexes, setConfirmIndexes] = useState<number[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>(initialTimer);

  const {
    pages: { subPageID, mainPage, sidebarList },
  } = useAppSelector((state) => state);

  const removePage = (pageID: string) => {
    if (mainPage && pageID) {
      removeSubPage(mainPage, pageID);

      if (sidebarList.length > 1) {
        const sidebarListAfterRemove = sidebarList.filter((page) => page.id !== pageID);

        let activeSubPageIndex = sidebarListAfterRemove.findIndex(({ id }) => id === subPageID);

        activeSubPageIndex = activeSubPageIndex === -1 ? 0 : activeSubPageIndex;

        setIndexSidebarPage(activeSubPageIndex);
      }
    }
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
  }, [sidebarList]);

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  const handleSetNameForChange = (nameData: SidebarListProps) => {
    if (nameForChange?.id === nameData.id) return setNameForChange(undefined);
    setNameForChange(nameData);
  };

  const handleAddConfirmation = (index: number) => {
    if (confirmIndexes.includes(index)) return;
    setConfirmIndexes([...confirmIndexes, index]);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setConfirmIndexes([]);
      }, 2500),
    );
  };

  return (
    <Wrapper>
      <ul>
        {sidebarList.map(({ id, name }, index) => (
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
      {sidebarList.length < MAX_SIDEBAR_ELEMENTS && (
        <AddEditNameModal
          title="Add new page: "
          updateDbCallback={addSubPage}
          buttonText="Add page"
        />
      )}
    </Wrapper>
  );
};

export default EditSidebarModal;
