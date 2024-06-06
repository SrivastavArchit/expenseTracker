// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore,doc,setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDZMhY9C4HjD1MeysKno1no2PmDGLxfONo",
  authDomain: "expense-app-c3871.firebaseapp.com",
  projectId: "expense-app-c3871",
  storageBucket: "expense-app-c3871.appspot.com",
  messagingSenderId: "227112374695",
  appId: "1:227112374695:web:59b5170231bde874a26682",
  measurementId: "G-LK37BVM2WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db,auth,provider ,doc,setDoc};