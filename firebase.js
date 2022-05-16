import 'firebase/firestore';
import 'firebase/auth';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBDiSe8bpnxoPVUvGFVAKHUWCYfmU_kVgE",
    authDomain: "bookscollection-d9099.firebaseapp.com",
    projectId: "bookscollection-d9099",
    storageBucket: "bookscollection-d9099.appspot.com",
    messagingSenderId: "833535421686",
    appId: "1:833535421686:web:4b2c2c55a78dbd6c9b90d7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();

  const db = firebaseApp.firestore();

  export { auth, db }; 