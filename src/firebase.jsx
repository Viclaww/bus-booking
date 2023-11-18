import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7xrNjiehmu1k42G_uv4Jt3OaoS_6VgI0",
  authDomain: "bus-booker.firebaseapp.com",
  projectId: "bus-booker",
  storageBucket: "bus-booker.appspot.com",
  messagingSenderId: "848694085810",
  appId: "1:848694085810:web:08db996a6d8517353c61ab",
  measurementId: "G-ZBV5H4BBCX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
