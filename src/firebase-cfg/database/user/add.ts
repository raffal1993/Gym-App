import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { child, push, ref, serverTimestamp, update } from 'firebase/database';
import { pagesPaths } from 'utils/staticVariables/pages';
import { db } from '../../firebase-config';
import { ConvertTimestampDB } from '../dbTypes';

const settingsSubPageNames = ['Account Info', 'Change Password', 'Delete Account'];

const addSettingsSubPages = (uid: string, subPageName: string) => {
  const targetPath = `users/${uid}/${pagesPaths.settings.name}`;

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
};

const addNewUserToDB = (email: string, uid: string) => {
  const targetPath = `users`;

  interface NewUser {
    email: string;
    timestamp: object;
  }

  const newUser: NewUser = {
    email,
    timestamp: serverTimestamp(),
  };

  const updates = {} as {
    [key: string]: typeof newUser;
  };

  updates[targetPath + `/${uid}`] = newUser;

  update(ref(db), updates);
  settingsSubPageNames.forEach((page) => addSettingsSubPages(uid, page));
};

export { addNewUserToDB };
