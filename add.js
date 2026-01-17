const newIncome = document.querySelector(".newincome");
const newExpense = document.querySelector(".newexpense");
const welcomeText = document.querySelector(".welcomeText");
const ipopup = document.querySelector(".overlay");
const closeBtn=document.querySelector(".closebtn");
const popsubtn = document.querySelector(".popsubtn");
const iMoney = document.querySelector(".imoney");
let incomeVal=document.querySelector("#incomeval");

let totalIncome=0;
let userName = "alpesh"
 

welcomeText.innerText="Welecome, "+userName;

let expenseVal;
newIncome.addEventListener("click",()=>{
  ipopup.classList.add("overlay1");
});
newExpense.addEventListener("click",()=>{
    expenseVal= prompt("enter expense");
});
closeBtn.addEventListener("click",()=>{
  ipopup.classList.remove("overlay1");
});
popsubtn.addEventListener("click", () => {
 
 let enteredIncome = Number(incomeVal.value);



   totalIncome += enteredIncome;

  iMoney.innerText = "\u20B9"+totalIncome;
  incomeVal.value = "";

  ipopup.classList.remove("overlay1");
});


