const hamburger = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobileNav");

hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});