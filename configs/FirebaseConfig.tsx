import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAm5SAJqhAkPVbDY6ruqLMm5YgRSNqmyZQ",
  authDomain: "abuad-real.firebaseapp.com",
  projectId: "abuad-real",
  storageBucket: "abuad-real.appspot.com",
  messagingSenderId: "722031597141",
  appId: "1:722031597141:web:581835d6fe9be578cc66dc",
  measurementId: "G-7SYNZQSLZ4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase handles persistence on React Native

export { auth };
