import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot, getDocs, doc, updateDoc, deleteDoc } from "./firebase.js";

let currentUser = null; 
let unsubscribe = null; 
let myChart = null;
// Overlay ko yahan define kar lo taaki neeche use kar sako
const overlay = document.querySelector(".overlay"); 

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
    
        const userLbtn = document.querySelector(".userLbtn");
        const logoName = user.displayName;
        if(userLbtn) userLbtn.innerText = logoName.charAt(0);

        const monthInput = document.getElementById("monthInput");

        // Month change hone par naya data load karo
        monthInput.addEventListener("change", () => {
            loadMonthData(monthInput.value);
        });

        // Default: Current Month
        const today = new Date().toISOString().slice(0,7);
        monthInput.value = today;
        loadMonthData(today);

        function loadMonthData(selectedMonth) {
            
            // Purana listener band karo (Memory Leak fix)
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
                    // Budget field ka naam 'bamount' hai
                    if (data.type === "budget") budget = Number(data.bamount);
                });

                // HTML Text Update
                document.querySelector(".imoney").innerText = income;
                document.querySelector(".bmoney").innerText = budget;
                document.querySelector(".rmoney").innerText = budget - expense;
                
                // --- CHART UPDATE START ---
                const ctx = document.getElementById('myChart');

                if (myChart) {
                    myChart.destroy();
                }
                let remaining = budget-expense;
                if(budget-expense<0){
                    remaining=0;
                }

                myChart = new Chart(ctx, {
                    type: 'doughnut', 
                    data: {
                        labels: [ 'Expense', 'Remaining'],
                        datasets: [{
                            label: 'Amount (₹)',
                            // FIX: Yahan sahi variable names use karo (income, expense, budget)
                            data: [ expense, remaining], 
                            backgroundColor: [
                              
                                'rgba(255, 99, 132, 0.6)', 
                                'rgba(54, 162, 235, 0.6)'  
                            ],
                            borderColor: [
                               
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom' },
                            title: { display: true, text: 'Budget Overview' }
                        }
                    }
                });
                // --- CHART UPDATE END ---
            });
        }

    } else {
        window.location.href = "login.html";
    }
});

// --- BUDGET UPDATE LOGIC ---
const updateBtn = document.querySelector(".updatebtn");
if (updateBtn) {
    updateBtn.addEventListener("click", async () => {
        const amount = document.getElementById("updateval").value;
        // Month input se value uthao, taaki sahi month ka budget update ho
        const selectedMonth = document.getElementById("monthInput").value; 

        if(!amount){
            alert("Please enter Amount");
            return;
        }

        try {
            // Check karo agar is month ka budget pehle se hai
            const q = query(
                collection(db, "expenses"),
                where("uid", "==", currentUser.uid),
                where("month", "==", selectedMonth),
                where("type", "==", "budget")
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Update Existing Budget
                const docId = querySnapshot.docs[0].id; 
                const budgetRef = doc(db, "expenses", docId);
                
                await updateDoc(budgetRef, {
                    bamount: Number(amount)
                });

                // Delete Duplicates (Safety Code)
                if(querySnapshot.docs.length > 1) {
                    for(let i = 1; i < querySnapshot.docs.length; i++) {
                        await deleteDoc(doc(db, "expenses", querySnapshot.docs[i].id));
                    }
                }

            } else {
                // Create New Budget
                await addDoc(collection(db, "expenses"), {
                    uid: currentUser.uid,
                    type: "budget",
                    bamount: Number(amount),
                    month: selectedMonth // Month zaroor save karna
                });
            }
        
            if(overlay) overlay.classList.remove("overlay1"); // Safe Close
            
        } catch (error) {
            console.error("Error updating budget: ", error);
            alert("Error: " + error.message);
        }
    });
}