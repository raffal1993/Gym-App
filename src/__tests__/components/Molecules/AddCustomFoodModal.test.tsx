import { fireEvent, screen } from '@testing-library/react';
import { setModalClose } from 'app/slices/interfaceSlice';
import AddCustomFoodModal, {
  nutrients,
} from 'components/Molecules/Modals/AddCustomFoodModal/AddCustomFoodModal';
import { mockedFoodCards } from '__tests__/mocks/mockedFoodData';
import { mockedSubPageID } from '__tests__/mocks/mockedSidebarData';
import { renderWithProviders } from '__tests__/utils/test-utils';

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

jest.mock('firebase-cfg/database/food/add', () => ({
  addFoodToDB: jest.fn(),
}));

describe('testing AddCustomFoodModal component', () => {
  const addEditNameInput = () => screen.getByTestId(/addEditNameInput/i);

  const nutrientInput = (nutrientName: 'weight' | 'kcal' | 'fat' | 'carbs' | 'protein' | 'fiber') =>
    screen.getByRole('spinbutton', { name: new RegExp(nutrientName, 'i') });

  const foodSetSelect = (name: string) => screen.getByText(new RegExp(name, 'i'));
  const button = () => screen.getByText(/Add Food/i);

  beforeEach(() => {
    renderWithProviders(<AddCustomFoodModal cards={mockedFoodCards} subPageID={mockedSubPageID} />);
  });

  test('elements if they are displayed', () => {
    expect(screen.getByText(/New Food/i)).toBeInTheDocument();
    expect(screen.getByText(/Nutrients in 100g:/i)).toBeInTheDocument();
    nutrients.forEach((nutrient) => expect(nutrientInput(nutrient)).toBeInTheDocument());
    expect(screen.getByText(/Choose Food Set to put custom food:/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter Food name:/i)).toBeInTheDocument();
    mockedFoodCards.forEach(({ name }) => expect(foodSetSelect(name)).toBeInTheDocument());
    expect(addEditNameInput()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
  });

  test('if only numbers allowed to insert in inputs', () => {
    nutrients.forEach((nutrient) =>
      fireEvent.change(nutrientInput(nutrient), { target: { value: 'some Text' } }),
    );

    nutrients.forEach((nutrient) => expect(nutrientInput(nutrient)).toHaveDisplayValue(''));
  });

  describe('errors handling', () => {
    test('empty input', () => {
      expect(addEditNameInput()).toHaveDisplayValue('');
      fireEvent.click(button());
      expect(screen.getByText(/Name must be at least 3 chars !/)).toBeInTheDocument();
    });

    test('empty nutrients inputs', () => {
      nutrients.forEach((nutrient) => expect(nutrientInput(nutrient)).toHaveDisplayValue(''));
      fireEvent.change(addEditNameInput(), { target: { value: 'addFoodTest' } });
      expect(addEditNameInput()).toHaveDisplayValue('addFoodTest');
      fireEvent.click(button());
      expect(screen.getByText(/You must provide all nutrients !/)).toBeInTheDocument();
    });

    test('not selected any food Set', () => {
      fireEvent.change(addEditNameInput(), { target: { value: 'addFoodTest' } });
      expect(addEditNameInput()).toHaveDisplayValue('addFoodTest');
      mockedFoodCards.forEach(({ name }) =>
        expect(foodSetSelect(name).getAttribute('class')).not.toMatch(/active/gi),
      );
      fireEvent.click(button());
      expect(screen.getByText(/Pick a Food Set !/)).toBeInTheDocument();
    });
  });

  test('adding custom food', async () => {
    nutrients.forEach((nutrient) =>
      fireEvent.change(nutrientInput(nutrient), { target: { value: '100' } }),
    );

    nutrients.forEach((nutrient) => expect(nutrientInput(nutrient)).toHaveValue(100));

    fireEvent.click(foodSetSelect(mockedFoodCards[0].name));
    expect(foodSetSelect(mockedFoodCards[0].name).getAttribute('class')).toMatch(/active/gi);
    fireEvent.change(addEditNameInput(), { target: { value: 'testFoodSet2' } });
    expect(addEditNameInput()).toHaveValue('testFoodSet2');
    fireEvent.click(button());
    expect(dispatch).toHaveBeenCalledWith(setModalClose());
  });
});
