import { FoodCardDB, NutrientsDB } from 'components/Organisms/Food/FoodTypes';
import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, onValue } from 'firebase/database';
import { sortedArrayByTimestamp } from 'helpers/sortArrayByTimestamp';

const foodCardsDBListener = (
  subPageID: string | undefined,
  setStateCallback: (value: React.SetStateAction<FoodCardDB[]>) => void,
  foodCardID?: string,
) => {
  const uid = auth.currentUser?.uid;

  const dbRef = ref(db, `users/${uid}/food/${subPageID}`);

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

        if (foodCardID) {
          const card = newArr.filter((card) => card.foodCardID === foodCardID);
          if (card) setStateCallback(card);
          return;
        }

        const sortedFoodCards = sortedArrayByTimestamp(newArr);
        setStateCallback(sortedFoodCards);
      }
    }
  });
};

export { foodCardsDBListener };
