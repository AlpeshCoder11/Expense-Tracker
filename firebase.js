

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc,getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBG_7hN3Thk1QQ_rf3gjc1oghvD49lCYEU",
    authDomain: "expensetracker-4eed5.firebaseapp.com",
    projectId: "expensetracker-4eed5",
    storageBucket: "expensetracker-4eed5.firebasestorage.app",
    messagingSenderId: "112506687919",
    appId: "1:112506687919:web:9d0a8ddd703c6870af9f5a"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();



async function loginGoogle() {
    console.log("Button Clicked. Attempting Popup...");
    try {
        const result = await signInWithPopup(auth, provider);

        
        console.log("SUCCESS! User:", result.user.displayName);
        alert("Login Success! Welcome " + result.user.displayName);
        window.location.href = "index.html";

    } catch (error) {
       
        console.error("Login Error:", error);
        alert("Error: " + error.message);
    }
}


async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = "login.html"; 
    } catch (error) {
        console.error("Logout Failed", error);
    }
}

window.loginGoogle = loginGoogle;
window.logoutUser = logoutUser;


export { auth, db, onAuthStateChanged, collection, addDoc, query, where, onSnapshot ,getDocs , doc, updateDoc, deleteDoc};
