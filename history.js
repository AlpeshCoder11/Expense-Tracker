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
const editBtn = document.querySelector(".editbtn");
const monthFilter = document.querySelector("#monthFilter");
const selectedMonth =   monthFilter.value;
const resetFilters =document.querySelector(".resetfilters");
let incomeVal =document.querySelector("#incomeval");
let expenseVal =document.querySelector("#expenseval");
let edateVal = document.querySelector(".edate");
let idateVal = document.querySelector(".idate");

let edesciptionText = document.querySelector(".edestext");
let idesciptionText = document.querySelector(".idestext");

let categorySelect = document.querySelector(".category");
let sortSelect = document.querySelector(".sortby");



let userdata = JSON.parse(localStorage.getItem("userdtl")) || [

]; 



const today = new Date().toISOString().split("T")[0];



idateVal.setAttribute("max", today);
edateVal.setAttribute("max", today);


showData(getFilteredData());
welcomeText.innerText="Welcome";


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
    id: Date.now(),  
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

    showData(getFilteredData()); 

ipopup.classList.remove("overlay1");


   }
});
popsubtn2.addEventListener("click", () => {
 
 let enteredIncome = Number(expenseVal.value);
 
 let enteredDate = edateVal.value;
 let Catagory = categorySelect.value;
 let desciText=edesciptionText.value;

 let newUser ={
    id: Date.now(),  
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

    showData(getFilteredData()); 

 ipopup.classList.remove("overlay1");


  
 }

});
resetFilters.addEventListener("click",()=>{
    monthFilter.value="";
    sortSelect.value="sort";
    showData();

})
monthFilter.addEventListener("change",()=>{
showData(getFilteredData());

});

sortSelect.addEventListener("change",()=>{
  
    
            let sortedData=[...getFilteredData()];
    if(sortSelect.value=="amount low to high"){
     sortedData.sort((a, b) => a.Amount - b.Amount);
     showData(sortedData);
    }
    else if(sortSelect.value=="amount high to low"){
     sortedData.sort((a, b) => b.Amount - a.Amount);
     showData(sortedData);
    }
    else{
      sortedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
     showData(sortedData);
    }
        
    
})


function showData(data = userdata) {
    let finaldata = ` <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Catagory</th>
                <th>Description</th>
                <th></th>
                
            </tr>
        </thead>`;
    
   
    data.forEach((element , index) => {
       let amountColor = (element.Catagory === "income") ? "green" : "red";

        finaldata += `
            <tr>
                <td>${element.Date}</td>
                
                <td style="color: ${amountColor}; font-weight: bold;">
                    ${element.Amount}
                </td>
                <td>${element.Catagory}</td>
                <td>${element.Desciption}</td>
                 <td><button onclick="deleteRow(${element.id})" class="deletbtn">delet</button></td>
            </tr>
        `;
    });
finaldata += `</table>`;
    
     expenseVal.value = "";
     incomeVal.value = ""

    tableAdd.innerHTML = finaldata;
}



window.deleteRow = function(id) {
  userdata = userdata.filter(item => item.id !== id);
  localStorage.setItem("userdtl", JSON.stringify(userdata));
  showData(getFilteredData());
};

function getFilteredData() {
  const month = monthFilter.value;
  return month ? userdata.filter(item => item.Date.startsWith(month)) : userdata;
}
