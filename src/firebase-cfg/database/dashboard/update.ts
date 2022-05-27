import { ref, set } from 'firebase/database';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const updateSubPageName = async (
  mainPage: string,
  currentSubPageData: SidebarListProps,
  newSubPageName: string,
) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/${mainPage}`;
  if (uid) {
    const data = (await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err)) as { [key: string]: SidebarListProps };

    const changedPages = {} as { [key: string]: SidebarListProps };

    if (data) {
      for (const key in data) {
        if (key === currentSubPageData.id)
          changedPages[key] = { ...data[key], name: newSubPageName };
        else changedPages[key] = data[key];
      }
    }

    return set(ref(db, targetPath), changedPages);
  }
};

export { updateSubPageName };
