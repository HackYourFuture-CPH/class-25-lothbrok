import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: "project-management-c03e4",
  storageBucket: "project-management-c03e4.appspot.com",
  messagingSenderId: "43686032912",
  appId: "1:43686032912:web:67c0afb8dcf4769c72bc95",
  measurementId: "G-HME19MGFGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
