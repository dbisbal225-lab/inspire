import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7q8X5OKzCvcK38M65kr1mYHHlLzC8uyM",
  authDomain: "inspire-e3923.firebaseapp.com",
  projectId: "inspire-e3923",
  storageBucket: "inspire-e3923.firebasestorage.app",
  messagingSenderId: "166231759202",
  appId: "1:166231759202:web:c6f77564a112f59d28b43b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

