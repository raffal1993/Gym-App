import BasicModal from '@mui/material/Modal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setModalClose } from 'app/slices/interfaceSlice';
import { cloneElement } from 'react';
import { ModalContentStyled } from './Modal.styled';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalContent } = useAppSelector((state) => state.interface);

  const handleCloseModal = () => {
    dispatch(setModalClose());
  };

  return (
    <BasicModal
      BackdropProps={{ componentsProps: { root: { 'data-testid': 'backdrop' } } }}
      sx={{ minHeight: '650px', minWidth: '300px' }}
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentStyled>
        {modalContent && cloneElement(modalContent)}
        <div onClick={handleCloseModal} className="close">
          <ArrowBackIosNewIcon />
        </div>
      </ModalContentStyled>
    </BasicModal>
  );
};

export default Modal;
