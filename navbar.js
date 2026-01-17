const hamburger = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobileNav");
const modebtn = document.querySelector(".modebtn");
const main =document.querySelector("body");
const navSec =document.querySelector(".nav-section")
const bText =document.querySelectorAll("p");

hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});
modebtn.addEventListener("click",()=>{
   main.classList.toggle("modeDL");
   navSec.classList.toggle("modeDL");
   bText.forEach(element => {
    element.classList.toggle("dmtext");
   });
})