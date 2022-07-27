// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:process.env.REACT_API_KEY,
//   authDomain:process.env.REACT_AUTH_DOMAIN,
//   projectId:process.env.REACT_PROJECT_ID,
//   storageBucket:process.env.REACT_STORAGE_BUCKET,
//   messagingSenderId:process.env.REACT_MESSAGING_SENDER_ID,
//   appId:process.env.REACT_APP_ID,
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADjTbPh21ssgGhdT8XaGe6qJJisKcF5qg",
  authDomain: "food-ordering-2cb06.firebaseapp.com",
  projectId: "food-ordering-2cb06",
  storageBucket: "food-ordering-2cb06.appspot.com",
  messagingSenderId: "83429754913",
  appId: "1:83429754913:web:bffd90857f3ebe80ecbb60",
  measurementId: "G-F2CYQF2CC4"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);