import { child, ref, get } from 'firebase/database';
import { db } from './firebase-config';

export const getDataFromDB = async (path: string) => {
  return new Promise((res, rej) => {
    get(child(ref(db), path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return res(snapshot.val());
        }
        console.error(`Snapshot doesn't exist`);
        return rej();
      })
      .catch((error) => {
        console.error(error);
        return rej(error);
      });
  });
};
