import { ref, update } from 'firebase/database';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const updateFoodSetName = async (subPageID: string, foodCardID: string, newName: string) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/food/${subPageID}/${foodCardID}/name`;

  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res as string)
      .catch((err) => err);

    if (data) {
      const updates = {} as {
        [key: string]: string;
      };

      updates[targetPath] = newName;

      return update(ref(db), updates);
    }
  }
};

export { updateFoodSetName };
