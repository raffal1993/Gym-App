import { mountWithProviders } from '__tests__/utils/test-utils';
import React from 'react';
import EditModeButton from 'components/Atoms/Buttons/EditModeButton/EditModeButton';
import { animateButton } from 'helpers/animateButton';
import { EditModeButtonStyled } from 'components/Atoms/Buttons/EditModeButton/EditModeButton.styled';
import { setupStore } from 'app/store';
import { setEditMode } from 'app/slices/interfaceSlice';
import { convertToElement } from '__tests__/helpers/convertToElement';

jest.mock('helpers/animateButton', () => ({
  animateButton: jest.fn(),
}));

const animation = jest.mocked(animateButton);

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

describe('test EditModeButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('onClick on child element', () => {
    const wrapper = mountWithProviders(<EditModeButton />);
    wrapper.find(EditModeButtonStyled).simulate('click');
    expect(dispatch).toHaveBeenCalledWith(
      setEditMode(!setupStore().getState().interface.isEditModeOn),
    );
  });

  describe('check button icon and animations for toggle editMode on/off', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('isEditModeOn === true', async () => {
      const wrapper = mountWithProviders(<EditModeButton />, {
        store: setupStore({
          interface: { ...setupStore().getState().interface, isEditModeOn: false },
        }),
      });

      const closeIcon = wrapper.find('svg');
      expect(closeIcon.exists()).toBeTruthy();
      expect(closeIcon.getDOMNode()).toHaveAttribute('data-testid', 'ConstructionIcon');

      const button = wrapper.find(EditModeButtonStyled);
      expect(button.exists()).toBeTruthy();

      const ref = { current: convertToElement(button) };

      expect(animation).toBeCalledWith(ref, 'start', 'editModeButton');
    });

    test('isEditModeOn === false', () => {
      const wrapper = mountWithProviders(<EditModeButton />, {
        store: setupStore({
          interface: { ...setupStore().getState().interface, isEditModeOn: true },
          pages: { ...setupStore().getState().pages, sidebarList: [{ id: '1', name: 'test1' }] },
        }),
      });
      const constructionIcon = wrapper.find('svg');
      expect(constructionIcon.exists()).toBeTruthy();
      expect(constructionIcon.getDOMNode()).toHaveAttribute('data-testid', 'CloseIcon');

      const button = wrapper.find(EditModeButtonStyled);
      expect(button.exists()).toBeTruthy();

      const ref = { current: convertToElement(button) };

      expect(animation).toBeCalledWith(ref, 'stop', 'editModeButton');
    });
  });
});
