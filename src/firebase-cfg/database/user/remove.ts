import { getDataFromDB } from 'firebase-cfg/dbHelpers';
import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, remove } from 'firebase/database';

const removeUserFromDB = async () => {
  const user = auth.currentUser;

  if (user) {
    const targetPath = `users/${user.uid}`;

    const data = await getDataFromDB(targetPath)
      .then((res) => Promise.resolve(res))
      .catch((err) => {
        console.warn(err);
        return Promise.reject(err);
      });

    if (data) {
      await remove(ref(db, targetPath))
        .then(() => user.delete().catch((err) => console.warn(`Error deleting user : ${err}`)))
        .catch((err) => console.warn(`Error deleting userDb : ${err}`));
    }
  }
};

export { removeUserFromDB };
