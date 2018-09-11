import Rebase from 're-base';
import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCafYHPgcINeDdYoi62dtOJH6rlwKos_J4",
    authDomain: "catch-of-the-day-john-moen.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-john-moen.firebaseio.com",
  });


const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };
//this is a default export
export default base;

