// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//@ts-ignore
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm5SAJqhAkPVbDY6ruqLMm5YgRSNqmyZQ",
  authDomain: "abuad-real.firebaseapp.com",
  projectId: "abuad-real",
  storageBucket: "abuad-real.firebasestorage.app",
  messagingSenderId: "722031597141",
  appId: "1:722031597141:web:581835d6fe9be578cc66dc",
  measurementId: "G-7SYNZQSLZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});
//const analytics = getAnalytics(app);