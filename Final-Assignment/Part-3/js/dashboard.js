import { CURRENCY, currentMonth, userDataLS, sessionDataLS,  } from "./global.js";

// DOM Declaration
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

menuBtn.addEventListener('click', ()=> {
    sideMenu.style.display = "block";
});

closeBtn.addEventListener('click', ()=> {
    sideMenu.style.display = "none";
});

// Variable Declaration
let userCards = userDataLS[sessionDataLS.currentUserID].cards;

function loadDashboard() {
    const info1Element = document.querySelector("#info-1 h1");
    info1Element.textContent = getTotalCards(userCards);
    const info2Element = document.querySelector("#info-2 h1");
    info2Element.textContent = `${CURRENCY} ${getCreditLimitAvailable(userCards)}`;
    const info3Element = document.querySelector("#info-3 h1");
    info3Element.textContent = `${CURRENCY} ${getTotalCreditLimit(userCards)}`;
    const info4Element = document.querySelector("#info-4 h1");
    info4Element.textContent = getTotalExpensesAdded(userCards, currentMonth);
    const info5Element = document.querySelector("#info-5 h1");
    info5Element.textContent = `${CURRENCY} ${getTotalExpenses(userCards, currentMonth)}`;
    const info6Element = document.querySelector("#info-6 h1");
    info6Element.textContent = `${CURRENCY} ${getTotalExpenses(userCards)}`;
    const info7Element = document.querySelector("#info-7 h1");
    info7Element.textContent = `${getCreditRatio(userCards)}%`;
}

function getTotalCards(arr) {
    return arr.length;
}

function getCreditLimitAvailable(arr) {
    const totalCL = getTotalCreditLimit(arr);
    const totalSpend = getTotalExpenses(arr, currentMonth);
    const total = totalCL - totalSpend
    return total;
}

function getTotalCreditLimit(arr) {
    const total = arr.reduce((accumulator, item) => {
        return accumulator + item.cardLimit;
    }, 0);
    return total;
}

function getTotalExpensesAdded(arr, month) {
    let total = 0;
    arr.forEach((card) => {
        card.expenses.forEach((expenses) => {
            if (month != undefined) {
                if (expenses.expenseMonth === month) {
                    total++
                }
            } else {
                total += card.expenses.length
            }
        })
    });
    return total;
}

function getTotalExpenses(arr, month) {
    let total = 0;
    arr.forEach((card) => {
        card.expenses.forEach((expenses) => {
            if (month != undefined) {
                if (expenses.expenseMonth === month) {
                    total += expenses.expenseAmount;
                }
            } else {
                total += expenses.expenseAmount;
            }
        })
    });
    return total;
}

function getCreditRatio(arr) {
    const totalCLAvailable = getCreditLimitAvailable(arr);
    const totalSpend = getTotalExpenses(arr, currentMonth);
    const ratio = totalSpend * 100 / totalCLAvailable;
    const decimalPlaces = 2;
    // Special handling when there is no card added.
    if(isNaN(ratio.toFixed(decimalPlaces))){
        return 0.00;
    }
    return ratio.toFixed(decimalPlaces);
}

// Main Function
loadDashboard();