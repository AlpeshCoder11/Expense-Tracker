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
let dateVal = document.querySelector(".date");
let desciptionText = document.querySelector(".destext");
let totalIncome=0;
let totalExpense=0;
let totalRemaining=0;
let userName = "alpesh";

let userdata = JSON.parse(localStorage.getItem("userdtl")) || [

]; 

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
 let enteredDate = dateVal.value;
 let Catagory="income";

 let newUser ={
   Date:enteredDate,
   Amount:enteredIncome,
   Catagory:Catagory
 }

 if(enteredIncome<0){
  alert("enert valid value");
 }
else{
  
    userdata.push(newUser);
    localStorage.setItem("userdtl", JSON.stringify(userdata));

    showData(); 

  //  totalIncome += enteredIncome;
  //  totalRemaining=totalIncome-totalExpense;

  // iMoney.innerText = "\u20B9"+totalIncome;
  incomeVal.value = "";
  // rMoney.innerText="\u20B9"+totalRemaining;
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


function showData() {
    let finaldata = `    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Catagory</th>
                <th>Description</th>
                <th></th>
                
            </tr>
        </thead>`;
    
   
    userdata.forEach((element) => {
        finaldata += `
            <tr>
                
                <td>${element.Date}</td>
                <td>${element.Amount}</td>
                <td>${element.Catagory}</td>
                <td>${element.Desciption}</td>
            </tr>
        `;
    });

  
    

    tableAdd.innerHTML = finaldata;
}

