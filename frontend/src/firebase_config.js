import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyBVggofWM5oDyECNAGALX3s8bY0MLcFFF0",
  authDomain: "project-management-c03e4.firebaseapp.com",
  projectId: "project-management-c03e4",
  storageBucket: "project-management-c03e4.appspot.com",
  messagingSenderId: "43686032912",
  appId: "1:43686032912:web:67c0afb8dcf4769c72bc95",
  measurementId: "G-HME19MGFGP",
=======
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
>>>>>>> f0bdc65a94e44a0d792ec9ed203e0ba3e1e04d22
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
