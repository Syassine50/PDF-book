import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCN_dNNnbPtTmMM6wNf-I4HPBbaQXwwXIc",
    authDomain: "pdf-book-3de1b.firebaseapp.com",
    databaseURL: "https://pdf-book-3de1b-default-rtdb.firebaseio.com",
    projectId: "pdf-book-3de1b",
    storageBucket: "pdf-book-3de1b.appspot.com",
    messagingSenderId: "843370896244",
    appId: "1:843370896244:web:4e6eb3fbeb54142b726a21",
    measurementId: "G-XVDF95Q0H7"};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Get the initialized Firebase app instance
const app = firebase.app();

// Initialize Firebase Realtime Database
const database = getDatabase(app);

export { database, firebase };
