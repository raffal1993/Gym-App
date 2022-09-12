import { setSidebarList, setSubPageID } from 'app/slices/pagesSlice';
import { type Store } from 'app/store';
import { setFoodCards } from 'app/slices/foodSlice';
import { setEditMode } from 'app/slices/interfaceSlice';

let previousMainPage: string;

const handleOnMainPageChange = (appState: Store) => {
  const { pages } = appState.getState();
  const currentMainPage = pages.mainPage;

  if (previousMainPage !== currentMainPage) {
    previousMainPage = currentMainPage;
    appState.dispatch(setFoodCards(null));
    appState.dispatch(setSubPageID(''));
    appState.dispatch(setSidebarList([]));
    appState.dispatch(setEditMode(false));
  }
};

export { handleOnMainPageChange };
