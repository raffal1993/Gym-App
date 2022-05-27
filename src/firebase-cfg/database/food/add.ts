import {
  ConvertTimestampDB,
  FoodCardDB,
  NutrientsDB,
  NutrientsTypes,
} from 'components/Organisms/Food/FoodTypes';
import { getDataFromDB } from 'firebase-cfg/dbHelpers';
import { child, ref, push, serverTimestamp, update } from 'firebase/database';
import { auth, db } from '../../firebase-config';

const addFoodSetToDB = (subPageID: string, name: string) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/food/${subPageID}`;

    const newFoodSetKey = push(child(ref(db), targetPath)).key;
    if (!newFoodSetKey) return console.error('newFoodSet is null');

    const newFoodSet: Omit<ConvertTimestampDB<FoodCardDB>, 'foodCardID' | 'foodSet'> = {
      name,
      timestamp: serverTimestamp(),
    };

    const updates = {} as {
      [key: string]: typeof newFoodSet;
    };

    updates[targetPath + `/${newFoodSetKey}`] = newFoodSet;

    return update(ref(db), updates);
  }
};

const addFoodToDB = async (
  subPageID: string,
  name: string,
  foodCardID: string,
  nutrients: NutrientsTypes,
) => {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const targetPath = `users/${uid}/food/${subPageID}/${foodCardID}`;

    const data = await getDataFromDB(targetPath)
      .then((res) => res as Partial<FoodCardDB>)
      .catch((err) => console.log(err));

    if (data) {
      let pathToNewFood: string;

      if (data.foodSet === undefined) {
        pathToNewFood = `${targetPath}/foodSet/0`;
      } else {
        pathToNewFood = `${targetPath}/foodSet/${(data.foodSet as NutrientsDB[]).length}`;
      }

      const newCustomFoodKey = push(child(ref(db), pathToNewFood)).key;
      if (!newCustomFoodKey) return console.error('newCustomFoodKey is null');

      const finalNutrients = {} as NutrientsTypes;

      for (const key in nutrients) {
        Object.assign(finalNutrients, {
          [key]: nutrients[key as keyof NutrientsTypes] + `${key !== 'kcal' ? 'g' : ''}`,
        });
      }

      const newCustomFood: ConvertTimestampDB<NutrientsDB> = {
        name,
        timestamp: serverTimestamp(),
        id: newCustomFoodKey,
        ...finalNutrients,
      };

      const updates = {} as {
        [key: string]: typeof newCustomFood;
      };

      updates[pathToNewFood] = newCustomFood;

      return update(ref(db), updates);
    }
  }
};

export { addFoodSetToDB, addFoodToDB };
