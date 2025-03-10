
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5V7hBwY196T-IaJrqxrnHYaiUKGb3M08",
    authDomain: "proyecto1-ae1ee.firebaseapp.com",
    projectId: "proyecto1-ae1ee",
    storageBucket: "proyecto1-ae1ee.firebasestorage.app",
    messagingSenderId: "365433370384",
    appId: "1:365433370384:web:c9e1eca3b1da8417841795",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export {db}
