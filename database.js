// database.js
import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot } from "./firebase.js";

let currentUser = null; // To store the logged-in user

// 1. Watch Auth State (Check if user is logged in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
        
        // Update Welcome Text
        const welcomeText = document.querySelector(".welcomeText");
        if(welcomeText) welcomeText.innerText = "Welcome, " + user.displayName;


        //user data import
        const q= query(collection(db,"expenses"),where("uid","==",user.uid));
        onSnapshot(q,(snapshot)=>{
            let totalIncome=0;
            let totalExpense=0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                
               
                if (data.type === "income") {
                    totalIncome += Number(data.amount);
                } else if (data.type === "expense") {
                    totalExpense += Number(data.amount);
                }
            });

            // 5. Update the Screen
            const remaining = totalIncome - totalExpense;

            document.querySelector(".imoney").innerText = totalIncome;
            document.querySelector(".emoney").innerText = totalExpense;
            document.querySelector(".rmoney").innerText = remaining;
            
            console.log("Updated Dashboard!");
        });
    } else {
        // If not logged in, go back to login page
        window.location.href = "login.html";
    }
});

// 2. Income Button Logic
const incomeBtn = document.querySelector(".popsubtn");
if (incomeBtn) {
    incomeBtn.addEventListener("click", async () => {
        const amount = document.getElementById("incomeval").value;
        const desc = document.querySelector(".idestext").value;
        const date = document.querySelector(".idate").value;

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

// 3. Expense Button Logic
const expenseBtn = document.querySelector(".popsubtn2");
if (expenseBtn) {
    expenseBtn.addEventListener("click", async () => {
        const amount = document.getElementById("expenseval").value;
        const desc = document.querySelector(".edestext").value;
        const category = document.querySelector(".category").value;
        const date = document.querySelector(".edate").value;

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