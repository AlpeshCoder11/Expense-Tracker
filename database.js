import { auth, db, collection, addDoc, onAuthStateChanged, query, where, onSnapshot } from "./firebase.js";

let currentUser = null; 
let myChart = null; 

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
    
        const welcomeText = document.querySelector(".welcomeText");
        if(welcomeText) welcomeText.innerText = "Welcome, " + user.displayName;

        const userLbtn = document.querySelector(".userLbtn");
        const logoName = user.displayName;
        if(userLbtn) userLbtn.innerText = logoName.charAt(0);
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');
        


        startDateInput.addEventListener('change', () => {
        endDateInput.min = startDateInput.value;
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
            endDateInput.value = startDateInput.value;
        }});



    const updateDashboard = (start, end) => {
        let q = query(collection(db,"expenses"), where("uid","==",user.uid));
        if (start && end) {
                
                q = query(
                    collection(db, "expenses"),
                    where("uid", "==", user.uid),
                    where("date", ">=", start),
                    where("date", "<=", end)
                );
            }
        
        onSnapshot(q, (snapshot) => {
            let totalIncome = 0;
            let totalExpense = 0;
            
          
            let categoryTotals = {
                "food": 0,
                "bills": 0,
                "education": 0,
                "entertainment": 0,
                "other": 0
            };

            snapshot.forEach((doc) => {
                const data = doc.data();
                const amount = Number(data.amount);
               
                if (data.type === "income") {
                    totalIncome += amount;
                } else if (data.type === "expense") {
                    totalExpense += amount;
                    
                    
                    
                    const cat = data.category ? data.category.toLowerCase() : "other";
                    
                    if (categoryTotals[cat] !== undefined) {
                        categoryTotals[cat] += amount;
                    } else {
                        
                        categoryTotals["other"] += amount;
                    }
                }
            });

            const remaining = totalIncome - totalExpense;

       
            document.querySelector(".imoney").innerText = totalIncome;
            document.querySelector(".emoney").innerText = totalExpense;
            document.querySelector(".rmoney").innerText = remaining;
            
            console.log("Updated Dashboard with Category Data!");
        
           
            const ctx = document.getElementById('myChart');

            if (ctx) {
               
                if (myChart) {
                    myChart.destroy();
                }

               
                const chartLabels = Object.keys(categoryTotals); 
                const chartValues = Object.values(categoryTotals); 

                myChart = new Chart(ctx, {
                    type: 'doughnut', 
                    data: {
                        labels: chartLabels, 
                        datasets: [{
                            label: 'Expense by Category (₹)',
                            data: chartValues, 
                            backgroundColor: [
                                '#FF6384', 
                                '#36A2EB', 
                                '#FFCE56', 
                                '#4BC0C0', 
                                '#9966FF'  
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right', 
                            },
                            title: {
                                display: true,
                                text: 'Where is my money going?'
                            }
                        }
                    }
                });
            }
        
           

        });}
        const handleDateChange = () => {
            const start = startDateInput.value;
            const end = endDateInput.value;
            
          
            endDateInput.min = start;
            if (end && end < start) endDateInput.value = start;

            if (start && end) {
                updateDashboard(start, end);
            }
        };
        startDateInput.addEventListener('change', handleDateChange);
        endDateInput.addEventListener('change', handleDateChange);


        updateDashboard();
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