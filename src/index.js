import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

/* firebase configuration */
const firebaseConfig = {
  apiKey: "AIzaSyDPn0NcEWsqz56jbF58k5L0tC910bX6bt8",
  authDomain: "wedding-814c1.firebaseapp.com",
  projectId: "wedding-814c1",
  storageBucket: "wedding-814c1.appspot.com",
  messagingSenderId: "895194204750",
  appId: "1:895194204750:web:a4788fced74c223c2bd11f",
  measurementId: "G-XXLXBPD2NZ"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
