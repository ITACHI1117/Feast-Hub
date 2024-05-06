// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA14rsxH-MNi0f4LFQZpbHr5xlFcd6pbz4",
  authDomain: "feast-hub-b49b8.firebaseapp.com",
  projectId: "feast-hub-b49b8",
  storageBucket: "feast-hub-b49b8.appspot.com",
  messagingSenderId: "537131183371",
  appId: "1:537131183371:web:beadc78b105249a116060e",
  databaseURL: "https://feast-hub-b49b8-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const reference = ref;
export { auth, app, database, storage, db, reference };
