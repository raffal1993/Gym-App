import { fireEvent, screen } from '@testing-library/react';
import { setModalClose } from 'app/slices/interfaceSlice';
import AddCustomFoodModal, {
  nutrients,
} from 'components/Molecules/Modals/AddCustomFoodModal/AddCustomFoodModal';
import { mockedCards, mockedSubPageID } from '__tests__/mocks/mockedData';
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
  const button = () => screen.getByText(/Add Food/i);
  const nutrientInputs = () => nutrients.map((nutrient) => screen.getByLabelText(nutrient));
  const nutrientLabels = () => screen.getAllByRole('spinbutton');
  const foodSetSelect = () => screen.getByText(/testFoodSet/i);

  beforeEach(() => {
    renderWithProviders(<AddCustomFoodModal cards={mockedCards} subPageID={mockedSubPageID} />);
  });

  test('elements if they are displayed', () => {
    nutrientLabels().forEach((label) => expect(label).toBeInTheDocument());
    nutrientInputs().forEach((input) => expect(input).toBeInTheDocument());
    expect(foodSetSelect()).toBeInTheDocument();
    expect(addEditNameInput()).toBeInTheDocument();
    expect(button()).toBeInTheDocument();
  });

  test('if only numbers allowed to insert in inputs', () => {
    nutrients.forEach((nutrient) =>
      fireEvent.change(screen.getByRole('spinbutton', { name: new RegExp(nutrient) }), {
        target: { value: 'some Text' },
      }),
    );

    nutrients.forEach((nutrient) =>
      expect(screen.getByRole('spinbutton', { name: new RegExp(nutrient) })).toHaveDisplayValue(''),
    );
  });

  test('errors handling', () => {
    expect(addEditNameInput()).toHaveDisplayValue('');
    fireEvent.click(button());
    expect(screen.getByText(/Name must be at least 3 chars !/)).toBeInTheDocument();

    nutrientInputs().forEach((input) => expect(input).toHaveDisplayValue(''));
    expect(foodSetSelect().getAttribute('class')).not.toMatch(/active/gi);
    fireEvent.change(addEditNameInput(), { target: { value: 'addFoodTest' } });
    expect(addEditNameInput()).toHaveDisplayValue('addFoodTest');
    fireEvent.click(button());
    expect(screen.getByText(/You must provide all nutrients !/)).toBeInTheDocument();
    expect(screen.getByText(/Pick a Food Set !/)).toBeInTheDocument();
  });

  test('adding custom food', async () => {
    nutrients.forEach((nutrient) =>
      fireEvent.change(screen.getByRole('spinbutton', { name: new RegExp(nutrient) }), {
        target: { value: '100' },
      }),
    );

    nutrients.forEach((nutrient) =>
      expect(screen.getByRole('spinbutton', { name: new RegExp(nutrient) })).toHaveValue(100),
    );

    fireEvent.click(foodSetSelect());
    expect(foodSetSelect().getAttribute('class')).toMatch(/active/gi);
    fireEvent.change(addEditNameInput(), { target: { value: 'testFoodSet2' } });
    expect(addEditNameInput()).toHaveValue('testFoodSet2');
    fireEvent.click(button());
    expect(dispatch).toHaveBeenCalledWith(setModalClose());
  });
});
