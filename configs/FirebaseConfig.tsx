import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// ✅ Just getAuth without any persistence config
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
