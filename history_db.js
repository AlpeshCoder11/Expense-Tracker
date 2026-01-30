
import { auth, db, collection,addDoc, onAuthStateChanged, query, where, onSnapshot, doc, deleteDoc } 
from "./firebase.js";


let currentUser = null; 
const tableBody = document.querySelector("tbody");
const monthInput = document.getElementById("monthFilter");
const sortInput = document.querySelector(".sortby");
const resetBtn = document.querySelector(".resetfilters");

let allExpenses = []; 


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Loading History for:", user.displayName);
        loadHistory(user);
        const welcomeText = document.querySelector(".welcomeText");
        if(welcomeText) welcomeText.innerText = "Welcome, " + user.displayName;

        const userLbtn=document.querySelector(".userLbtn");
        const logoName=user.displayName;
        userLbtn.innerText=logoName.charAt(0);
    } else {
        window.location.href = "login.html";
    }
});


function loadHistory(user) {
    const q = query(collection(db, "expenses"), where("uid", "==", user.uid));

onSnapshot(q, (snapshot) => {
        allExpenses = []; 

        snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            
           
            if (data.type === "budget") {
                return; 
            }
          

            allExpenses.push({
                id: docSnapshot.id,
                ...data
            });
        });
    
        filterAndRender(); 
    });
}


function filterAndRender() {
    let filteredData = [...allExpenses]; 

   
    const selectedMonth = monthInput.value; 
    if (selectedMonth) {
        filteredData = filteredData.filter(item => {
            
            return item.date.startsWith(selectedMonth);
        });
    }

   
    const sortValue = sortInput.value;

    if (sortValue === "amount low to high") {
        filteredData.sort((a, b) => a.amount - b.amount);
    } else if (sortValue === "amount high to low") {
        filteredData.sort((a, b) => b.amount - a.amount);
    } else if (sortValue === "date") {
       
        filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

  
    renderTable(filteredData);
}


function renderTable(dataList) {
    tableBody.innerHTML = "";

    if (dataList.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5' style='text-align:center;'>No transactions found.</td></tr>";
        return;
    }

    dataList.forEach((data) => {
        const color = data.type === "income" ? "green" : "red";
        const displayCategory = data.type === "income" ? "Income" : (data.category || "General");

        const row = `
            <tr>
                <td class="datecolor">${data.date}</td>
                <td style="color: ${color}; font-weight: bold;">
                    ${data.type === 'income' ? '+' : '-'} ₹${data.amount}
                </td>
                <td>${displayCategory}</td>
                <td>${data.description || "-"}</td>
                <td>
                    <button class="deletbtn" data-id="${data.id}">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    attachDeleteListeners();
}


function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".deletbtn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const docId = e.target.getAttribute("data-id");
            if(confirm("Delete this?")) {
                await deleteDoc(doc(db, "expenses", docId));
            }
        });
    });
}


monthInput.addEventListener("change", () => {
    filterAndRender();
});


sortInput.addEventListener("change", () => {
    filterAndRender();
});


resetBtn.addEventListener("click", () => {
    monthInput.value = "";     
    sortInput.value = "sort";  
    filterAndRender();         
});
// 2. Income Button Logic
const incomeBtn = document.querySelector(".popsubtn");
if (incomeBtn) {
    incomeBtn.addEventListener("click", async () => {
        const amount = document.getElementById("incomeval").value;
        const desc = document.querySelector(".idestext").value;
        const date = document.querySelector(".idate").value;
        const month = date.slice(0, 7);

        if(!amount || !date){
            alert("Please enter Amount and Date");
            return;
        }

        try {
            await addDoc(collection(db, "expenses"), {
                uid: currentUser.uid,
                type: "income",
                amount: Number(amount),
                description: desc,
                category:"income",
                date: date,
                month: month, 
                createdAt: new Date()
            });
            alert("Income Added!");
            location.reload(); 
        } catch (error) {
            console.error("Error adding income: ", error);
            alert("Error: " + error.message);
        }
    });
}
const expenseBtn = document.querySelector(".popsubtn2");
if (expenseBtn) {
    expenseBtn.addEventListener("click", async () => {
        const amount = document.getElementById("expenseval").value;
        const desc = document.querySelector(".edestext").value;
        const category = document.querySelector(".category").value;
        const date = document.querySelector(".edate").value;
        const month = date.slice(0, 7);
        if(!amount || !date){
            alert("Please enter Amount and Date");
            return;
        }

        try {
            await addDoc(collection(db, "expenses"), {
                uid: currentUser.uid,
                type: "expense",
                amount: Number(amount),
                description: desc,
                category: category,
                date: date,
                month: month, 
                createdAt: new Date()
            });
            alert("Expense Added!");
            location.reload(); 
        } catch (error) {
            console.error("Error adding expense: ", error);
            alert("Error: " + error.message);
        }
    });

}

