import { mountWithProviders } from '__tests__/utils/test-utils';
import { waitFor } from '@testing-library/react';
import React from 'react';
import EditModeButton from 'components/Commons/Buttons/EditModeButton/EditModeButton';
import { animateButton } from 'helpers/animateButton';
import { EditModeButtonStyled } from 'components/Commons/Buttons/EditModeButton/EditModeButton.styled';
import { setEditMode } from 'app/slices/interfaceSlice';
import { convertToElement } from '__tests__/helpers/convertToElement';
import { mockedReduxState } from '__tests__/mocks/mockedReduxState';
import { setupStore } from 'app/store';
import { ReactWrapper } from 'enzyme';

jest.mock('helpers/animateButton', () => ({
  animateButton: jest.fn(),
}));

const animation = jest.mocked(animateButton);

const dispatch = jest.fn();

jest.mock('app/hooks', () => ({
  ...jest.requireActual('app/hooks'),
  useAppDispatch: () => dispatch,
}));

jest.mock('components/Commons/ArrowPointer/ArrowPointer', () => {
  return {
    __esModule: true,
    default: () => <div>ArrowPointer</div>,
  };
});

const state = setupStore().getState();

describe('test EditModeButton', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('onClick on child element', () => {
    wrapper = mountWithProviders(<EditModeButton />);
    wrapper.find(EditModeButtonStyled).simulate('click');
    expect(dispatch).toHaveBeenCalledWith(setEditMode(!state.interface.isEditModeOn));
  });

  describe('button behaviour when isEditModeOn === false', () => {
    beforeEach(() => {
      wrapper = mountWithProviders(<EditModeButton />, {
        preloadedState: mockedReduxState({ interfaceState: { isEditModeOn: false } }),
      });
    });

    test('show svg icon', () => {
      const closeIcon = wrapper.find('svg');
      expect(closeIcon.exists()).toBeTruthy();
      expect(closeIcon.getDOMNode()).toHaveAttribute('data-testid', 'ConstructionIcon');
    });

    test('show animation', async () => {
      const button = wrapper.find(EditModeButtonStyled);
      expect(button.exists()).toBeTruthy();
      const ref = { current: convertToElement(button) };
      await waitFor(() => expect(animation).toBeCalledWith(ref, 'start', 'editModeButton'));
    });
  });

  describe('button behaviour when isEditModeOn === true', () => {
    beforeEach(() => {
      wrapper = mountWithProviders(<EditModeButton />, {
        preloadedState: mockedReduxState({
          interfaceState: { isEditModeOn: true },
          pagesState: { sidebarList: [{ id: '1', name: 'test1' }] },
        }),
      });
    });

    test('show svg icon', () => {
      const constructionIcon = wrapper.find('svg');
      expect(constructionIcon.exists()).toBeTruthy();
      expect(constructionIcon.getDOMNode()).toHaveAttribute('data-testid', 'CloseIcon');
    });

    test('animation is stopped', () => {
      const button = wrapper.find(EditModeButtonStyled);
      expect(button.exists()).toBeTruthy();

      const ref = { current: convertToElement(button) };

      expect(animation).toBeCalledWith(ref, 'stop', 'editModeButton');
    });
  });

  test('show ArrowPointer component', async () => {
    wrapper = mountWithProviders(<EditModeButton />, {
      preloadedState: mockedReduxState({
        interfaceState: { isEditModeOn: false },
        pagesState: { sidebarList: [] },
      }),
    });
    await waitFor(() => expect(wrapper.text()).toContain('ArrowPointer'));
  });
});
