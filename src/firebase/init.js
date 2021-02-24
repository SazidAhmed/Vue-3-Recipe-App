import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB5g7j4SPLK-nOp5ShHT4d8oW_-dcOQzYo",
    authDomain: "recipeapp-c65f0.firebaseapp.com",
    databaseURL: "https://recipeapp-c65f0-default-rtdb.firebaseio.com",
    projectId: "recipeapp-c65f0",
    storageBucket: "recipeapp-c65f0.appspot.com",
    messagingSenderId: "47847007482",
    appId: "1:47847007482:web:dc8bddfa9f4aa5be421543",
    measurementId: "G-HS5QH8B817"
  };
  // Initialize Firebase
  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })
  firebase.analytics();

// export firestore database
export default firebaseApp.firestore()
