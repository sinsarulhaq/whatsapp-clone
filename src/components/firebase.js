import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKRJ0kMkmxVouXr_-XQD7a7BTenfMYWcQ",
    authDomain: "whatsapp-clone-201d8.firebaseapp.com",
    projectId: "whatsapp-clone-201d8",
    storageBucket: "whatsapp-clone-201d8.appspot.com",
    messagingSenderId: "339071672430",
    appId: "1:339071672430:web:f561db25f5d88184fb867f",
    measurementId: "G-T07FMS70VD"
  };

  const app = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = app.firestore()
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  export { auth, googleProvider };
  export default db;