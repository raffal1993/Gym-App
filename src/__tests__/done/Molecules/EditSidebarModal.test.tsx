import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import EditSidebarModal from 'components/Molecules/Modals/EditSidebarModal/EditSidebarModal';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';
import { mockedReduxState } from '../../mocks/mockedReduxState';
import { mockedMainPage, mockedSidebarList, mockedSubPageID } from '../../mocks/mockedSidebarData';

const removeSubPage = jest.fn();

jest.mock('firebase-cfg/database/dashboard/remove', () => ({
  removeSubPage: () => removeSubPage(),
}));

const addSubPageToDB = jest.fn();

jest.mock('firebase-cfg/database/dashboard/add', () => ({
  addSubPageToDB: () => addSubPageToDB(),
}));

const updateSubPageName = jest.fn();

jest.mock('firebase-cfg/database/dashboard/update', () => ({
  updateSubPageName: () => updateSubPageName(),
}));

const setIndexSidebarPage = jest.fn();

describe('testing EditSidebarModal component', () => {
  const subPageNames = (amount: number = mockedSidebarList.length) => {
    const array = [];
    for (let i = 1; i <= amount; i++) {
      array.push(screen.getByText(new RegExp(`TESTSUBPAGENAME${i}`, 'i')));
    }
    return array;
  };

  const addNewPageInput = () => screen.getByText(/Add new page:/i).nextSibling!;
  const changeNameInput = () => screen.getByText(/Enter new name:/i).nextSibling!;

  const addNewPageButton = () => screen.getByRole('button', { name: /add page/i });
  const changeNameButton = () => screen.getByRole('button', { name: /change name/i });

  const removeSubPageButtons = () => screen.getAllByTestId(/CloseIcon/i);
  beforeEach(() => {
    renderWithProviders(<EditSidebarModal setIndexSidebarPage={setIndexSidebarPage} />, {
      preloadedState: mockedReduxState({
        pagesState: {
          subPageID: mockedSubPageID,
          mainPage: mockedMainPage,
          sidebarList: mockedSidebarList,
        },
      }),
    });
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(removeSubPageButtons()).toHaveLength(3);
    subPageNames().forEach((subPageName) => expect(subPageName).toBeInTheDocument());
    expect(screen.getByText(/Add new page:/i)).toBeInTheDocument();
    expect(addNewPageInput()).toBeInTheDocument();
    expect(addNewPageButton()).toBeInTheDocument();
  });

  describe('change SubPage name', () => {
    test('if form elemets showed up after click on subpage name', () => {
      fireEvent.click(subPageNames()[0]);
      expect(screen.getByText(/Enter new name:/i)).toBeInTheDocument();
      expect(changeNameInput()).toBeInTheDocument();
      expect(changeNameButton()).toBeInTheDocument();
    });

    test('if form elemets fade out after click on "active" element', () => {
      fireEvent.click(subPageNames()[0]);
      expect(subPageNames()[0].getAttribute('class')).toMatch(/active/gi);
      fireEvent.click(subPageNames()[0]);
      expect(subPageNames()[0].getAttribute('class')).not.toMatch(/active/gi);
      expect(screen.queryByText(/Enter new name:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Enter new name:/i)?.nextSibling).not.toBeDefined();
      expect(screen.queryByRole('button', { name: /change name/i })).not.toBeInTheDocument();
    });

    test('"active" element if it toggle properly', () => {
      subPageNames().forEach((subPageName) =>
        expect(subPageName.getAttribute('class')).not.toMatch(/active/gi),
      );
      fireEvent.click(subPageNames()[0]);
      expect(subPageNames()[0].getAttribute('class')).toMatch(/active/gi);
      expect(subPageNames()[2].getAttribute('class')).not.toMatch(/active/gi);
      fireEvent.click(subPageNames()[2]);
      expect(subPageNames()[0].getAttribute('class')).not.toMatch(/active/gi);
      expect(subPageNames()[2].getAttribute('class')).toMatch(/active/gi);
    });
  });

  describe('confirmation feature', () => {
    jest.useFakeTimers();

    test('if "confirm" button show up after click remove subpage button', () => {
      fireEvent.click(removeSubPageButtons()[0]);
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    test('timeout clear after 2.5 sec (if all confirmations fade out)', async () => {
      fireEvent.click(removeSubPageButtons()[0]);
      jest.advanceTimersByTime(2400);
      await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /confirm/i }), {
        timeout: 2500,
      });
    });
  });

  test('if remove subpage is called', () => {
    fireEvent.click(removeSubPageButtons()[0]);
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(removeSubPage).toHaveBeenCalled();
  });

  test('if update subpage name is called', () => {
    fireEvent.click(subPageNames()[0]);
    fireEvent.change(changeNameInput(), { target: { value: 'newName' } });
    fireEvent.click(changeNameButton());
    expect(updateSubPageName).toHaveBeenCalled();
  });

  test('if add subpage is called', () => {
    fireEvent.change(addNewPageInput(), { target: { value: 'newSubPage' } });
    fireEvent.click(addNewPageButton());
    expect(addSubPageToDB).toHaveBeenCalled();
  });
});
