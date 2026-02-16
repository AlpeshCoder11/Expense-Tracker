import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const hamburger = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobileNav");
const modebtn = document.querySelector(".modebtn");
const dateDM =document.querySelector(".date-range-container")
const main =document.querySelector("body");
const navSec =document.querySelector(".nav-section")

const bText =document.querySelectorAll("p");

hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});

  modebtn.addEventListener("click", () => {

    document.body.classList.toggle("modeDL");

    // Save preference
    if(document.body.classList.contains("modeDL")){
        localStorage.setItem("theme","dark");
        modebtn.innerText = "Light";
    }else{
        localStorage.setItem("theme","light");
        modebtn.innerText = "Dark";
    }
});

// Load saved theme
window.addEventListener("load", () => {
    const theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("modeDL");
        modebtn.innerText = "Light";
    }
});

const userBtn = document.querySelector('.userLbtn');
const logoutDropdown = document.getElementById('logoutDropdown');
const logoutBtn = document.getElementById('logoutBtn');

// Toggle dropdown when clicking the 'A' button
userBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the window click listener from firing
    logoutDropdown.classList.toggle('active');
});


window.addEventListener('click', () => {
    if (logoutDropdown.classList.contains('active')) {
        logoutDropdown.classList.remove('active');
    }
});




logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("User signed out");
        window.location.href = "login.html"; 
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
});