import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, onValue } from 'firebase/database';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';

const sidebarListDBListener = (
  mainPage: string | undefined,
  dispatcher: (list: SidebarListProps[]) => {
    payload: SidebarListProps[] | [];
    type: string;
  },
) => {
  const uid = auth.currentUser?.uid;

  if (mainPage && uid) {
    const dbRef = ref(db, `users/${uid}/${mainPage}`);

    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (data && mainPage) {
        const newArray = [] as SidebarListProps[];

        for (const key in data) {
          if (data[key].timestamp) {
            newArray.push({
              id: key,
              name: data[key].name,
              timestamp: data[key].timestamp,
            });
          }
        }

        const sortedArray = sortedArrayByTimestamp(newArray as Required<SidebarListProps>[]);

        const sidebarListItems: SidebarListProps[] = sortedArray.map((value) => ({
          id: value.id,
          name: value.name,
        }));
        dispatcher(sidebarListItems);
      } else dispatcher([]);
    });
  }
};

export { sidebarListDBListener };
