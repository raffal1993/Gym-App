import BasicModal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import { RootState } from 'app/store';
import { cloneElement } from 'react';
import { ModalContentStyled } from './Modal.styled';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalContent } = useAppSelector((state: RootState) => state.interface);

  const handleCloseModal = () => {
    dispatch(setModalClose());
  };

  return (
    <BasicModal
      sx={{ minHeight: '650px', minWidth: '300px' }}
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentStyled>{modalContent && cloneElement(modalContent)}</ModalContentStyled>
    </BasicModal>
  );
};

export default Modal;
