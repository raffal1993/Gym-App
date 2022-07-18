import { NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import { ref, remove, set } from 'firebase/database';
import { pagesPaths } from 'helpers/staticVariables';
import { auth, db } from '../../firebase-config';
import { getDataFromDB } from '../../dbHelpers';

const removeFoodItem = async (subPageID: string, foodCardID: string, foodItemID: string) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/${pagesPaths.food.name}/${subPageID}/${foodCardID}/foodSet`;

  if (uid) {
    const data = await getDataFromDB(targetPath)
      .then((res) => res)
      .catch(() => {
        throw alert('Error: Cannot get data from DB');
      });

    if (data) {
      const newFoodSet = (data as NutrientsDB[]).filter((foodItem) => foodItem.id !== foodItemID);
      return set(ref(db, targetPath), newFoodSet);
    }
  }
};

const removeFoodSet = async (subPageID: string, foodCardID: string) => {
  const uid = auth.currentUser?.uid;
  const targetPath = `users/${uid}/${pagesPaths.food.name}/${subPageID}/${foodCardID}`;

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
