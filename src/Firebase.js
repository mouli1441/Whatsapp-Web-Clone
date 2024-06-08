// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



// const firebaseConfig = {
//     apiKey: "AIzaSyBN0No0aTR6HYEnucvsN9i9gM5MVn39afo",
//     authDomain: "whatsapp-clone-29211.firebaseapp.com",
//     projectId: "whatsapp-clone-29211",
//     storageBucket: "whatsapp-clone-29211.appspot.com",
//     messagingSenderId: "1076956283941",
//     appId: "1:1076956283941:web:2c8f34b1e49519e7802bcc",
//     measurementId: "G-P9KMQKRXHV"
//   };
  

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkpSacH0eJHLJV_4MfNM2v2_50gUEIkIE",
  authDomain: "chapapp-c6c72.firebaseapp.com",
  projectId: "chapapp-c6c72",
  storageBucket: "chapapp-c6c72.appspot.com",
  messagingSenderId: "207683960596",
  appId: "1:207683960596:web:ca38ed74b4a4c97b0c8c01",
  measurementId: "G-NKB4HGJ10X"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();  //for google authentication

  export {auth, provider};
  export default db;