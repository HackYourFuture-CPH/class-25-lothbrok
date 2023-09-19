import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVggofWM5oDyECNAGALX3s8bY0MLcFFF0",
  authDomain: "project-management-c03e4.firebaseapp.com",
  projectId: "project-management-c03e4",
  storageBucket: "project-management-c03e4.appspot.com",
  messagingSenderId: "43686032912",
  appId: "1:43686032912:web:67c0afb8dcf4769c72bc95",
  measurementId: "G-HME19MGFGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
