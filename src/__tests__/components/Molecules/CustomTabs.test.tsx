import { Tab } from '@mui/material';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import CustomTabs, { CustomTabsProps } from 'components/Molecules/CustomTabs/CustomTabs';
import React from 'react';
import { renderWithProviders } from '__tests__/utils/test-utils';

const onClickTab1 = jest.fn();
const onClickTab2 = jest.fn();

const mockedTabs = [
  {
    key: 'tab1',
    name: 'testTab1',
    onClick: () => onClickTab1(),
  },
  {
    key: 'tab2',
    name: 'testTab2',
    onClick: () => onClickTab2(),
  },
];

const mockedCustomTabs = (props: CustomTabsProps = {}) => (
  <CustomTabs {...props}>
    {mockedTabs.map((tab) => (
      <Tab key={tab.key} label={tab.name} onClick={tab.onClick} />
    ))}
  </CustomTabs>
);

describe('testing CustomTabs component', () => {
  let renderNew: (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => void;
  let containerElement: HTMLElement;

  const tab1 = () =>
    screen.getByRole('tab', {
      name: /testTab1/i,
    });
  const tab2 = () =>
    screen.getByRole('tab', {
      name: /testTab2/i,
    });

  beforeEach(() => {
    const { rerender, container } = renderWithProviders(mockedCustomTabs());
    renderNew = rerender;
    containerElement = container;
    jest.clearAllMocks();
  });

  test('if elements are displayed', () => {
    expect(tab1()).toBeInTheDocument();
    expect(tab2()).toBeInTheDocument();
  });

  test('if Tab indicator is visible/invisible(if value === null => indicator === invisible)', () => {
    const spanElements = containerElement.getElementsByClassName('MuiTabs-indicator');
    expect(spanElements).toHaveLength(1);
    expect(spanElements[0]).not.toHaveStyle({ display: 'none' });

    renderNew(mockedCustomTabs({ value: null }));
    expect(spanElements[0]).toHaveStyle({ display: 'none' });
  });

  describe('check components if value is (undefined | null | number)', () => {
    test("value if it's [undefined]", () => {
      renderNew(mockedCustomTabs({ value: undefined }));
      expect(tab1()).toHaveAttribute('aria-selected', 'true');
      expect(tab2()).not.toHaveAttribute('aria-selected', 'true');
    });
    test("value if it's [null]", () => {
      renderNew(mockedCustomTabs({ value: null }));

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => expect(tab).toHaveAttribute('aria-selected', 'false'));
    });
    test("value if it's [number]", () => {
      renderNew(mockedCustomTabs({ value: 1 }));
      expect(tab1()).toHaveAttribute('aria-selected', 'false');
      expect(tab2()).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('if selected element change after click', async () => {
    renderNew(mockedCustomTabs());
    fireEvent.click(tab1());
    expect(onClickTab1).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(tab1()).toHaveAttribute('aria-selected', 'true'));
    fireEvent.click(tab2());
    expect(onClickTab2).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(tab2()).toHaveAttribute('aria-selected', 'true'));
    await waitFor(() => expect(tab1()).toHaveAttribute('aria-selected', 'false'));
  });
});
