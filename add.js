const newIncome = document.querySelector(".newincome");
const newExpense = document.querySelector(".newexpense");
const welcomeText = document.querySelector(".welcomeText");
const ipopup = document.querySelector(".overlay");
const closeBtn=document.querySelector(".closebtn");
const popsubtn = document.querySelector(".popsubtn");
const popsubtn2 = document.querySelector(".popsubtn2");
const iMoney = document.querySelector(".imoney");
const eMoney =document.querySelector(".emoney");
const rMoney =document.querySelector(".rmoney");
const incomePop =document.querySelector(".textp");
const expensePop =document.querySelector(".textp2");
let incomeVal=document.querySelector("#incomeval");
let expenseVal=document.querySelector("#expenseval");
let totalIncome=0;
let totalExpense=0;
let totalRemaining=0;
let userName = "alpesh"
 

welcomeText.innerText="Welecome, "+userName;


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
popsubtn.addEventListener("click", () => {

 let enteredIncome = Number(incomeVal.value);
 if(enteredIncome<0){
  alert("enert valid value");
 }
else{

   totalIncome += enteredIncome;
   totalRemaining=totalIncome-totalExpense;

  iMoney.innerText = "\u20B9"+totalIncome;
  incomeVal.value = "";
  rMoney.innerText="\u20B9"+totalRemaining;
  ipopup.classList.remove("overlay1");}
});
popsubtn2.addEventListener("click", () => {
 
 let enteredIncome = Number(expenseVal.value);
if(enteredIncome<0){
  alert("enert valid value");
 }
else{


  totalExpense += enteredIncome;
  totalRemaining=totalIncome-totalExpense;
  eMoney.innerText = "\u20B9"+totalExpense;
  expenseVal.value = "";
  rMoney.innerText="\u20B9"+totalRemaining;
  ipopup.classList.remove("overlay1");}
});


