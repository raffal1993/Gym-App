import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBV1a56HT-DkAZORhWRgcxwkSrpP16PsA',
  authDomain: 'gym-app-89ccd.firebaseapp.com',
  projectId: 'gym-app-89ccd',
  storageBucket: 'gym-app-89ccd.appspot.com',
  messagingSenderId: '933348038402',
  appId: '1:933348038402:web:eab6a7ef8ac3d4dbd4541b',
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
auth.languageCode = 'en';

export { auth, provider };
