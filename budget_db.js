import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot, getDocs, doc, updateDoc, deleteDoc } from "./firebase.js";

let currentUser = null; 
let unsubscribe = null; 

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
    
        const userLbtn = document.querySelector(".userLbtn");
        const logoName = user.displayName;
        if(userLbtn) userLbtn.innerText = logoName.charAt(0);

        const monthInput = document.getElementById("monthInput");

    
        monthInput.addEventListener("change", () => {
            loadMonthData(monthInput.value);
        });

        
        const today = new Date().toISOString().slice(0,7);
        monthInput.value = today;
        loadMonthData(today);

        function loadMonthData(selectedMonth) {
            
            if (unsubscribe) {
                unsubscribe();
            }

            const q = query(
                collection(db, "expenses"),
                where("uid", "==", currentUser.uid),
                where("month", "==", selectedMonth)
            );

           
            unsubscribe = onSnapshot(q, (snapshot) => {
                let income = 0;
                let expense = 0;
                let budget = 0;

                snapshot.forEach(doc => {
                    const data = doc.data();

                    if (data.type === "income") income += Number(data.amount);
                    if (data.type === "expense") expense += Number(data.amount);
              
                    if (data.type === "budget") budget = Number(data.bamount);
                });

                document.querySelector(".imoney").innerText = income;
                document.querySelector(".bmoney").innerText = budget;
                document.querySelector(".rmoney").innerText = budget - expense;
            });
        }

    } else {
        window.location.href = "login.html";
    }
});

const updateBtn = document.querySelector(".updatebtn");
if (updateBtn) {
    updateBtn.addEventListener("click", async () => {
        const amount = document.getElementById("updateval").value;
        const selectedMonth = document.querySelector('input[type="month"]').value;

        if(!amount){
            alert("Please enter Amount");
            return;
        }

        try {
           
            const q = query(
                collection(db, "expenses"),
                where("uid", "==", currentUser.uid),
                where("month", "==", selectedMonth),
                where("type", "==", "budget")
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
             
                const docId = querySnapshot.docs[0].id; /
                const budgetRef = doc(db, "expenses", docId);
                
                await updateDoc(budgetRef, {
                    bamount: Number(amount)
                });

                if(querySnapshot.docs.length > 1) {
                    for(let i = 1; i < querySnapshot.docs.length; i++) {
                        await deleteDoc(doc(db, "expenses", querySnapshot.docs[i].id));
                    }
                }

            } else {
             
                await addDoc(collection(db, "expenses"), {
                    uid: currentUser.uid,
                    type: "budget",
                    bamount: Number(amount),
                    month: selectedMonth
                });
            }
        
             overlay.classList.remove("overlay1")
            
        } catch (error) {
            console.error("Error updating budget: ", error);
            alert("Error: " + error.message);
        }
    });
}