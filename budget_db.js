
import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot } from "./firebase.js";

let currentUser = null; 


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
    
       
        const userLbtn=document.querySelector(".userLbtn");
        const logoName=user.displayName;
        userLbtn.innerText=logoName.charAt(0);

    
        const q= query(collection(db,"expenses"),where("uid","==",user.uid));
        onSnapshot(q,(snapshot)=>{
            let totalIncome=0;
            let totalExpense=0;
            let totalBudget=0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                
               
                if (data.type === "income") {
                    totalIncome += Number(data.amount);
                } else if (data.type === "expense") {
                    totalExpense += Number(data.amount);
                } else if(data.type==="budget"){
                    totalBudget+=(data.bamount)
                }
            });

            const remaining = totalBudget - totalExpense;


            document.querySelector(".imoney").innerText = totalIncome;
            document.querySelector(".bmoney").innerText = totalBudget;
            document.querySelector(".rmoney").innerText = remaining;
            
            console.log("Updated Dashboard!");
        });
    } else {
      
        window.location.href = "login.html";
    }
});


const updateBtn = document.querySelector(".updatebtn")
if (updateBtn) {
    updateBtn.addEventListener("click", async () => {
        const amount = document.getElementById("updateval").value;
    
        if(!amount){
            alert("Please enter Amount ");
            return;
        }

        try {
            await addDoc(collection(db, "expenses"), {
                uid: currentUser.uid,
                type:"budget",
                bamount: Number(amount) 
            });
           
            location.reload(); 
        } catch (error) {
            console.error("Error adding income: ", error);
            alert("Error: " + error.message);
        }
    });
}
