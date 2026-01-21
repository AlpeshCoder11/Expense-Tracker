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
const tableAdd =document.querySelector(".tablecontainer");
let incomeVal =document.querySelector("#incomeval");
let expenseVal =document.querySelector("#expenseval");
let edateVal = document.querySelector(".edate");
let idateVal = document.querySelector(".idate");



let edesciptionText = document.querySelector(".edestext");
let idesciptionText = document.querySelector(".idestext");
let categorySelect = document.querySelector(".category");
let totalIncome=0;
let totalExpense=0;
let totalRemaining=0;
let userName = "alpesh";

const today = new Date().toISOString().split("T")[0];



idateVal.setAttribute("max", today);
edateVal.setAttribute("max", today);

let userdata = JSON.parse(localStorage.getItem("userdtl")) || []; 
showData();

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
 let enteredDate = idateVal.value;
 let Catagory="income";
 let desciText=idesciptionText.value;

 let newUser ={
   Date:enteredDate,
   Amount:enteredIncome,
   Catagory:Catagory,
   Desciption:desciText
 }
date.setAttribute("max",today);
 if (!enteredDate || !desciText || enteredIncome <= 0) {
  alert("Please fill all fields correctly");
  return;
}

else{
  
    userdata.push(newUser);
    localStorage.setItem("userdtl", JSON.stringify(userdata));

    showData(); 

}
});
popsubtn2.addEventListener("click", () => {
 
 let enteredExpense = Number(expenseVal.value);
 
 let enteredDate = edateVal.value;
 let Catagory = categorySelect.value;
 let desciText=edesciptionText.value;

 let newUser ={
   Date:enteredDate,
   Amount:enteredExpense,
   Catagory:Catagory,
   Desciption:desciText
 }
date.setAttribute("max",today);
if (!enteredDate || !desciText || enteredExpense <= 0) {
  alert("Please fill all fields correctly");
  return;
}

else{

        userdata.push(newUser);
    localStorage.setItem("userdtl", JSON.stringify(userdata));

    showData(); 
    
}
});


function showData() {
 
  totalIncome = 0;
  totalExpense = 0;

   userdata.forEach((element) => {
        // Ensure we handle numbers correctly
        let amount = Number(element.Amount);
        
        if (element.Catagory === "income") {
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }
    });
  totalRemaining=totalIncome-totalExpense;
  iMoney.innerText = "\u20B9"+totalIncome;
  incomeVal.value = "";
  eMoney.innerText = "\u20B9"+totalExpense;
  expenseVal.value = "";
  rMoney.innerText="\u20B9"+totalRemaining;
  
  ipopup.classList.remove("overlay1");
}

