const newIncome = document.querySelector(".newincome");
const newExpense = document.querySelector(".newexpense");
const welcomeText = document.querySelector(".welcomeText");
const ipopup = document.querySelector(".overlay");
const closeBtn=document.querySelector(".closebtn");
const popsubtn = document.querySelector(".popsubtn");
const popsubtn2 = document.querySelector(".popsubtn2");

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

let userName = "alpesh";

let userdata = JSON.parse(localStorage.getItem("userdtl")) || [

]; 
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

 if(enteredIncome<0){
  alert("enert valid value");
 }
else{
  
    userdata.push(newUser);
    localStorage.setItem("userdtl", JSON.stringify(userdata));

    showData(); 



   }
});
popsubtn2.addEventListener("click", () => {
 
 let enteredIncome = Number(expenseVal.value);
 
 let enteredDate = edateVal.value;
 let Catagory = categorySelect.value;
 let desciText=edesciptionText.value;

 let newUser ={
   Date:enteredDate,
   Amount:enteredIncome,
   Catagory:Catagory,
   Desciption:desciText
 }

if(enteredIncome<0){
  alert("enert valid value");
 }
else{

        userdata.push(newUser);
    localStorage.setItem("userdtl", JSON.stringify(userdata));

    showData(); 

 

  
 }

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
       let amountColor = (element.Catagory === "income") ? "green" : "red";

        finaldata += `
            <tr>
                <td>${element.Date}</td>
                
                <td style="color: ${amountColor}; font-weight: bold;">
                    ${element.Amount}
                </td>
                <td>${element.Catagory}</td>
                <td>${element.Desciption}</td>
                 <td><button>edit</button></td>
            </tr>
        `;
    });

    
     expenseVal.value = "";
     incomeVal.value = ""
    ipopup.classList.remove("overlay1");
    tableAdd.innerHTML = finaldata;
}

