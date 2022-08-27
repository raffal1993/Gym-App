import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';

export const mockedSubPageID = '-testSubPageID';

export const mockedMainPage = '-testMainPage';

export const mockedSidebarItem = (number: number): SidebarListProps => {
  return {
    id: `-testSubPageID${number}`,
    name: `testSubPageName${number}`,
  };
};

export const mockedSidebarList: SidebarListProps[] = [
  mockedSidebarItem(1),
  mockedSidebarItem(2),
  mockedSidebarItem(3),
];
