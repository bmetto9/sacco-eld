// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKMUA2ZOclWiMvow4sYUCig2Oy2s6PvdM",
  authDomain: "eldoret-express.firebaseapp.com",
  projectId: "eldoret-express",
  storageBucket: "eldoret-express.appspot.com",
  messagingSenderId: "304935117398",
  appId: "1:304935117398:web:27e3d03504a77dbfc691f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app