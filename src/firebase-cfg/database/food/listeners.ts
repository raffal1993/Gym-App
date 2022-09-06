import { FoodCardDB, NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, onValue } from 'firebase/database';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';
import { pagesPaths } from 'utils/staticVariables/pages';

const foodCardsDBListener = (
  subPageID: string | undefined,
  dispatcher: (foodCards: FoodCardDB[]) => {
    payload: FoodCardDB[] | [];
    type: string;
  },
) => {
  const uid = auth.currentUser?.uid;

  const dbRef = ref(db, `users/${uid}/${pagesPaths.food.name}/${subPageID}`);

  return onValue(dbRef, (snapshot) => {
    if (uid && subPageID) {
      const data = snapshot.val();

      if (data) {
        const newArr = [] as FoodCardDB[];
        for (const key in data) {
          if (typeof data[key] === 'object') {
            const { foodSet }: { foodSet: NutrientsDB[] } = data[key];
            const sortedFoodSet = foodSet === undefined ? [] : sortedArrayByTimestamp(foodSet);

            newArr.push({
              foodCardID: key,
              timestamp: data[key].timestamp,
              name: data[key].name,
              foodSet: sortedFoodSet,
            });
          }
        }

        const sortedFoodCards = sortedArrayByTimestamp(newArr);
        dispatcher(sortedFoodCards);
      } else dispatcher([]);
    }
  });
};

export { foodCardsDBListener };
