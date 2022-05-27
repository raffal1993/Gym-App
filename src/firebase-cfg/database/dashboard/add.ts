import { child, ref, update, push, serverTimestamp } from 'firebase/database';
import { ConvertTimestampDB } from 'components/Organisms/Food/FoodProps';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
import { auth, db } from '../../firebase-config';

const addSubPageToDB = (mainPage: string, subPageName: string) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/${mainPage}`;

    const newSubPageKey = push(child(ref(db), targetPath)).key;
    if (!newSubPageKey) return console.error('newSubPageKey is null');

    const newSubPage: Omit<ConvertTimestampDB<SidebarListProps>, 'id'> = {
      name: subPageName,
      timestamp: serverTimestamp(),
    };

    const updates = {} as {
      [key: string]: typeof newSubPage;
    };

    updates[targetPath + `/${newSubPageKey}`] = newSubPage;

    return update(ref(db), updates);
  }
};

export { addSubPageToDB };
