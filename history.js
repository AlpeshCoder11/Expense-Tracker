const newIncome = document.querySelector(".newincome");
const newExpense = document.querySelector(".newexpense");
const ipopup = document.querySelector(".overlay");
const incomePop =document.querySelector(".textp");
const expensePop =document.querySelector(".textp2")

const closeBtn=document.querySelector(".closebtn");



let edateVal = document.querySelector(".edate");
let idateVal = document.querySelector(".idate");







const today = new Date().toISOString().split("T")[0];



idateVal.setAttribute("max", today);
edateVal.setAttribute("max", today);






newIncome.addEventListener("click",()=>{
  ipopup.classList.add("overlay1");
  expensePop.classList.add("overlay");
  incomePop.classList.remove("overlay");

});
newExpense.addEventListener("click",()=>{
    ipopup.classList.add("overlay1");
    incomePop.classList.add("overlay");
    expensePop.classList.remove("overlay");
});
closeBtn.addEventListener("click",()=>{
  ipopup.classList.remove("overlay1");
});