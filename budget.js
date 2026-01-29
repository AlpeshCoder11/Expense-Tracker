const budgetBtn = document.querySelector(".budgetbtn");
const overlay =document.querySelector(".overlay");
const closeBtn = document.querySelector(".closebtn");



budgetBtn.addEventListener("click",()=>{
  
   overlay.classList.add("overlay1");
})



closeBtn.addEventListener("click",()=>{
    overlay.classList.remove("overlay1")
})