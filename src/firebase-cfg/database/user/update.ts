import { auth, db } from 'firebase-cfg/firebase-config';
import { ref, set } from 'firebase/database';

const updateEmailToDB = (newEmail: string) => {
  const uid = auth.currentUser?.uid;

  const targetPath = `users/${uid}/email`;

  if (uid) return set(ref(db, targetPath), newEmail);
};

export { updateEmailToDB };
