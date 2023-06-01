

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, setPersistence } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyAiEJY4CadiWKOATZ-lkAwbf80kJoqjWEk",
    authDomain: "chefcitoosapp.firebaseapp.com",
    projectId: "chefcitoosapp",
    storageBucket: "chefcitoosapp.appspot.com",
    messagingSenderId: "677489851372",
    appId: "1:677489851372:web:f288d56e0ebcf0ec2c1ec9"
  };

  const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig)

  const firestore = getFirestore(app)
  const storage = getStorage(app)
  const auth = getAuth(app);

  export {auth,app,firestore,storage}