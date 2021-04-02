import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyBJzWAt46QvzUreRGNuE4W7s7R5okX_ibU",
authDomain: "react-firebase-c-74bce.firebaseapp.com",
projectId: "react-firebase-c-74bce",
storageBucket: "react-firebase-c-74bce.appspot.com",
messagingSenderId: "740616065686",
appId: "1:740616065686:web:908519ac927b9052abe8b7",
measurementId: "G-DLJG69HBTQ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();