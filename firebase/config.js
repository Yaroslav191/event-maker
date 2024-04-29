// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU9c70lhIBvZxf2IJWRj4kO2mk90_jq_Q",
  authDomain: "event-maker-f2adb.firebaseapp.com",
  projectId: "event-maker-f2adb",
  storageBucket: "event-maker-f2adb.appspot.com",
  messagingSenderId: "485105194656",
  appId: "1:485105194656:web:ff68f383aeb87413c35bc5",
  measurementId: "G-QLTEBPDB8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
