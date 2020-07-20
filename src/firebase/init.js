import firebase from 'firebase';
// import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtWSoHWAXOnbkLyMoU9mqrFBEoq5fkJpk',
  authDomain: 'pilotcity-blog-d6aec.firebaseapp.com',
  databaseURL: 'https://pilotcity-blog-d6aec.firebaseio.com',
  projectId: 'pilotcity-blog-d6aec',
  storageBucket: 'pilotcity-blog-d6aec.appspot.com',
  messagingSenderId: '469484724643',
  appId: '1:469484724643:web:0b70b05e36131a949afa16',
  measurementId: 'G-C3D9R1RYC7',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();
