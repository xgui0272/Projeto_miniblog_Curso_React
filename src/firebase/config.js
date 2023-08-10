import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';;


const firebaseConfig = {
  apiKey: "AIzaSyBC6kg6RvymRtD_zMwH9aimaWBZRlyqmOY",
  authDomain: "miniblog-87d37.firebaseapp.com",
  projectId: "miniblog-87d37",
  storageBucket: "miniblog-87d37.appspot.com",
  messagingSenderId: "622923594096",
  appId: "1:622923594096:web:ea74afd545798f409ff7b5"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};