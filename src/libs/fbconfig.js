import firebase from "firebase/app"
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDs_hGiV1im5i_1Y5wDMWSsc8Iz6eUmk9s",
    authDomain: "shopnow-118fe.firebaseapp.com",
    databaseURL: "https://shopnow-118fe.firebaseio.com",
    projectId: "shopnow-118fe",
    storageBucket: "shopnow-118fe.appspot.com",
    messagingSenderId: "266830093441",
    appId: "1:266830093441:web:ff168cb93963a2f00a8180",
    measurementId: "G-P011N3XK0B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const analytics = firebase.analytics();

export default firebase;