import { fireEvent, screen } from '@testing-library/react';
import { setSidebarList } from 'app/slices/pagesSlice';
import { setupStore } from 'app/store';
import AddFood from 'components/Molecules/AddFood/AddFood';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedCards, mockedSidebarList, mockedSubPageID } from '../../mocks/mockedData';

jest.mock('components/Molecules/Modals/AddCustomFoodModal/AddCustomFoodModal', () => {
  return () => <div>mockedAddCustomFoodModal</div>;
});

const mockedSetModalOpen = jest.fn();

jest.mock('app/slices/interfaceSlice', () => ({
  __esModule: true,
  ...jest.requireActual('app/slices/interfaceSlice'),
  setModalOpen: () => mockedSetModalOpen,
}));

jest.mock('firebase-cfg/database/food/add', () => ({
  addFoodSetToDB: jest.fn(),
}));

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

const store = setupStore(
  mockedReduxState({
    pagesState: { subPageID: mockedSubPageID, sidebarList: mockedSidebarList },
    interfaceState: { isSidebarItemSelected: true },
  }),
);

describe('testing AddFood component', () => {
  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;

  const addFoodSetButton = () => screen.getByRole('button', { name: /Add Food Set/i });
  const addCustomFoodButton = () => screen.getByRole('button', { name: /Add Custom Food/i });

  beforeEach(() => {
    const { rerender } = renderWithProviders(<AddFood cards={mockedCards} />, {
      store,
    });

    renderNew = rerender;
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(addFoodSetButton()).toBeInTheDocument();
    expect(addCustomFoodButton()).toBeInTheDocument();
  });

  test('if modals open after click button', () => {
    fireEvent.click(addFoodSetButton());
    expect(dispatch).toHaveBeenCalledWith(mockedSetModalOpen);
    jest.resetAllMocks();
    fireEvent.click(addCustomFoodButton());
    expect(dispatch).toHaveBeenCalledWith(mockedSetModalOpen);
  });

  test('if buttons are disabled', () => {
    renderNew(<AddFood cards={[]} />);
    store.dispatch(setSidebarList([]));
    expect(addFoodSetButton()).toBeDisabled();
    expect(addCustomFoodButton()).toBeDisabled();
  });
});
