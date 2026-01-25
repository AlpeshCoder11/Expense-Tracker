
import { auth, db, collection, onAuthStateChanged, query, where, onSnapshot, doc, deleteDoc } 
from "./firebase.js";

const tableBody = document.querySelector("tbody");
const monthInput = document.getElementById("monthFilter");
const sortInput = document.querySelector(".sortby");
const resetBtn = document.querySelector(".resetfilters");

let allExpenses = []; 


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Loading History for:", user.displayName);
        loadHistory(user);
    } else {
        window.location.href = "login.html";
    }
});


function loadHistory(user) {
    const q = query(collection(db, "expenses"), where("uid", "==", user.uid));

    onSnapshot(q, (snapshot) => {
        allExpenses = []; 

        snapshot.forEach((docSnapshot) => {
           
            allExpenses.push({
                id: docSnapshot.id,
                ...docSnapshot.data()
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
                <td>${data.date}</td>
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