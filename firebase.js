
  // Import the functions you need from the SDKs you need
// firebase.js
// FIXED: All versions are now 10.8.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// ... Keep the rest of your code the same (const firebaseConfig = ...)
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBG_7hN3Thk1QQ_rf3gjc1oghvD49lCYEU",
    authDomain: "expensetracker-4eed5.firebaseapp.com",
    projectId: "expensetracker-4eed5",
    storageBucket: "expensetracker-4eed5.firebasestorage.app",
    messagingSenderId: "112506687919",
    appId: "1:112506687919:web:9d0a8ddd703c6870af9f5a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// 3. Login Function (We call this when user clicks "Login")

async function loginGoogle() {
    console.log("Button Clicked. Attempting Popup...");
    try {
        const result = await signInWithPopup(auth, provider);

        // If we get here, IT WORKED!
        console.log("SUCCESS! User:", result.user.displayName);
        alert("Login Success! Welcome " + result.user.displayName);
        window.location.href = "index.html";

    } catch (error) {
        // If we get here, it actually failed.
        console.error("Login Error:", error);
        alert("Error: " + error.message);
    }
}

// 4. Logout Function
async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = "login.html"; // Send them back to login
    } catch (error) {
        console.error("Logout Failed", error);
    }
}

// 5. Make these functions available to your HTML buttons
window.loginGoogle = loginGoogle;
window.logoutUser = logoutUser;

// 6. Export tools for other files
export { auth, db, onAuthStateChanged, collection, addDoc, query, where, onSnapshot, deleteDoc, doc };