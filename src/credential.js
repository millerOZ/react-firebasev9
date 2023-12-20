// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWafmo3yFWvBhMi2Xj-dy7HmnDCTSojgE",
  authDomain: "tutorial-react-firebasev-a8978.firebaseapp.com",
  projectId: "tutorial-react-firebasev-a8978",
  storageBucket: "tutorial-react-firebasev-a8978.appspot.com",
  messagingSenderId: "80500547832",
  appId: "1:80500547832:web:2756fee07ce7225f18db0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const db = getFirestore(app);
export default app

