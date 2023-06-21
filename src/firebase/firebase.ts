
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiqG-ITetxPCF8xRHW8-IZqiiBphXn-q0",
    authDomain: "learnkorean-d1f54.firebaseapp.com",
    projectId: "learnkorean-d1f54",
    storageBucket: "learnkorean-d1f54.appspot.com",
    messagingSenderId: "929578862416",
    appId: "1:929578862416:web:bb645b0ecb23e7d44a8e55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

