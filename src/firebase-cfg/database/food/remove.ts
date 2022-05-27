import { NutrientsDB } from 'components/Organisms/Food/FoodProps';
import { ref, remove, set } from 'firebase/database';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const removeFoodItem = async (subPageID: string, foodCardID: string, foodItemID: string) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/food/${subPageID}/${foodCardID}/foodSet`;

  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => console.log(err));

    if (data) {
      const newFoodSet = (data as NutrientsDB[]).filter((foodItem) => foodItem.id !== foodItemID);
      return set(ref(db, targetPath), newFoodSet);
    }
  }
};

const removeFoodSet = async (subPageID: string, foodCardID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/food/${subPageID}/${foodCardID}`;

  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res)
      .catch((err) => err);

    if (data) {
      return remove(ref(db, targetPath));
    }
  }
};

export { removeFoodItem, removeFoodSet };
