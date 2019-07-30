import firebase from 'firebase';

// Configuration for fireBase that I created with my e-mail
// Here I just tried to follow documentation
const config = {
  apiKey: 'AIzaSyAqTu9eBJgWa7VqC0xzukSwoTmhO3RTrDE',
  authDomain: 'startupfest-d20dd.firebaseapp.com',
  databaseURL: 'https://startupfest-d20dd.firebaseio.com',
  projectId: 'startupfest-d20dd',
  storageBucket: 'startupfest-d20dd.appspot.com',
  messagingSenderId: '331068931484',
  appId: '1:331068931484:web:c24805cbe5a98fce',
};
const Firebase = firebase.initializeApp(config);

// Exporting the Firebase to be used by other clases
export default Firebase;
