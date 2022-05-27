import { ref, remove } from 'firebase/database';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const removeSubPage = async (mainPage: string, subPageID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/${mainPage}/${subPageID}`;
  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err);

    if (data) {
      return remove(ref(db, targetPath));
    }
  }
};

export { removeSubPage };
