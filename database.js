
import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot } from "./firebase.js";

let currentUser = null; 


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
    
        const welcomeText = document.querySelector(".welcomeText");
        if(welcomeText) welcomeText.innerText = "Welcome, " + user.displayName;

        const userLbtn=document.querySelector(".userLbtn");
        const logoName=user.displayName;
        userLbtn.innerText=logoName.charAt(0);

    
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

            const remaining = totalIncome - totalExpense;

            document.querySelector(".imoney").innerText = totalIncome;
            document.querySelector(".emoney").innerText = totalExpense;
            document.querySelector(".rmoney").innerText = remaining;
            
            console.log("Updated Dashboard!");
        });
    } else {
      
        window.location.href = "login.html";
    }
});


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