import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBspce5D6BC8Eeptt4lopxcQ46RyJre3Fs',
  authDomain: 'tuduist-2a54a.firebaseapp.com',
  databaseURL: 'https://tuduist-2a54a.firebaseio.com',
  projectId: 'tuduist-2a54a',
  storageBucket: 'tuduist-2a54a.appspot.com',
  messagingSenderId: '556071016689',
  appId: '1:556071016689:web:127ee0e03f851ceb7bf150',
});

export { firebaseConfig as firebase };
