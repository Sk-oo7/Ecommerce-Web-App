import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5kceT8KgoTLS9aSRpo-S8vZmbXD-y6BE",
  authDomain: "buy-aura-007.firebaseapp.com",
  databaseURL: "https://buy-aura-007.firebaseio.com",
  projectId: "buy-aura-007",
  storageBucket: "buy-aura-007.appspot.com",
  messagingSenderId: "849641473277",
  appId: "1:849641473277:web:4687ca9114ce82acecea94",
  measurementId: "G-78G3Y279GQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
