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

