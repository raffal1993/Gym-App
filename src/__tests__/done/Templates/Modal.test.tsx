import { cleanup, fireEvent, screen } from '@testing-library/react';
import { setModalClose } from 'app/slices/interfaceSlice';
import { setupStore } from 'app/store';
import Modal from 'components/Templates/Modal/Modal';
import React from 'react';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';
import { renderWithProviders } from '../../utils/test-utils';

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

const mockedModalContent = () => <div>ModalContent</div>;

const initialState = {
  interfaceState: { isModalOpen: true, modalContent: mockedModalContent() },
};

const store = setupStore(mockedReduxState(initialState));

const rerender = () => {
  cleanup();
  renderWithProviders(<Modal />, { store });
};

describe('testing Modal component', () => {
  const closeModalButton = () => screen.getByTestId(/ArrowBackIosNewIcon/i);
  const backdrop = () => screen.getByTestId(/backdrop/i);

  beforeEach(() => {
    renderWithProviders(<Modal />, { store });
  });

  test('elements displayed on initial render', async () => {
    expect(screen.getByText(/ModalContent/i)).toBeInTheDocument();
    expect(closeModalButton()).toBeInTheDocument();
    expect(backdrop()).toBeInTheDocument();
  });

  test('close modal by backdrop click', () => {
    fireEvent.click(backdrop());
    expect(dispatch).toHaveBeenCalledWith(setModalClose());
  });
  test('close modal by closeModalButton click', () => {
    fireEvent.click(closeModalButton());
    expect(dispatch).toHaveBeenCalledWith(setModalClose());
  });
  test('modal closed', () => {
    expect(screen.getByText(/ModalContent/i)).toBeInTheDocument();
    store.dispatch(setModalClose());
    rerender();
    expect(screen.queryByText(/ModalContent/i)).not.toBeInTheDocument();
  });
});
