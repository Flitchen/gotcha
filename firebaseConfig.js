// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMsOFsyzPuy5UZ56ksR1oT9_bkhb-GvXQ",
  authDomain: "gotcha-8acfa.firebaseapp.com",
  databaseURL: "https://gotcha-8acfa-default-rtdb.firebaseio.com",
  projectId: "gotcha-8acfa",
  storageBucket: "gotcha-8acfa.appspot.com",
  messagingSenderId: "350961121599",
  appId: "1:350961121599:web:4d39aa664ccac2bb45fb8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const roomsRef = collection(db, "rooms");
