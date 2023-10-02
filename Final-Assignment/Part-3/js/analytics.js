import { CURRENCY, monthNames, currentYear, currentMonth, arrCategory, userDataLS, sessionDataLS, getTotalExpense } from './global.js';

// DOM Declaration
const selectCardFilter = document.getElementById('analytics-filter-card');
const selectMonthGraphFilter = document.getElementById('analytics-filter-month');
const analyticsGraph1 = document.getElementById('analytics-1');
const analyticsGraph2 = document.getElementById('analytics-2');
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

// Variable Declaration
let userCards = userDataLS[sessionDataLS.currentUserID].cards;
let selectedCardIndex = 0;
let selectedMonthIndex = 0;
let myChartObj1;
let myChartObj2;

// Load Analytics
function loadAnalytics() {
    loadAnalyticsFilter();
}

// Form Function - to Populate Card dropdown filter
function loadAnalyticsFilter() {
    // Load Card options
    selectCardFilter.options[0] = new Option(`Select Card`);
    selectCardFilter.options[0].selected = true;
    selectCardFilter.options[0].disabled = true;
    selectCardFilter.options[0].hidden = true;

    // Populate the card dropdown based on all cards added.
    let i = 1;
    userCards.forEach((card) => {
        selectCardFilter.options[i] = new Option(`${card.cardName} | ${card.cardNumber}`);
        i++;
    })
}

// Event Listener
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
});

selectCardFilter.addEventListener("change", () => {
    // Get Selected Card Index. (Minus 1 from (Select Card) to get the actual card index in the array)
    selectedCardIndex = selectCardFilter.selectedIndex - 1;

    // Load Graph - Expenses By Category
    loadGraph1(selectedCardIndex);

    // Load Graph - Expenses By Month
    loadGraph2(selectedCardIndex);
});

selectMonthGraphFilter.addEventListener("change", () => {
    // Get Selected Month Index.
    selectedMonthIndex = selectMonthGraphFilter.selectedIndex + 1;

    // Reload graph with selected month index
    loadGraph1(selectedCardIndex, selectedMonthIndex);
})

// Function to accumulate expenses by category
function getExpensesByCategory(arr, month) {
    // Initialize an object to store accumulated expenses by category
    const accumulatedExpenses = {};

    // Loop through category array 
    arrCategory.forEach(category => {
        // Filter expenses that match the current category and month (Note: Graph will only show data of current year)
        const matchingExpenses = arr.filter(expense => expense.expenseCat === category && expense.expenseMonth === month && expense.expenseYear === currentYear);

        // For expenses that match the category, accumulate the expense amount using reduce method
        const totalAmount = matchingExpenses.reduce((accumulator, expense) => {
            return accumulator + expense.expenseAmount;
        }, 0);

        // Store the accumulated total in the result object
        accumulatedExpenses[category] = totalAmount;
    });

    // Return the final complete accumulated expenses
    return accumulatedExpenses;
}

// Function to accumulate expenses by month
function getExpensesByMonth(arr) {
    // Initialize an array to store accumulated expenses by month
    const accumulatedExpense = [];

    // Accumulate expense by month
    for (let i = 1; i < monthNames.length + 1; i++) {
        let result = getTotalExpense(arr, i);
        //Append result to array
        accumulatedExpense.push(result);
    }
    return accumulatedExpense;
}

// Render Graph
function loadGraph1(cardIdx, mth) {
    let cardExpenses;

    // If month parameter is passed in, calculate accordingly , else default current month
    if (mth != undefined) {
        // Get Expenses Sum by Category based on selected card index.
        cardExpenses = getExpensesByCategory(userCards[cardIdx].expenses, mth);
    } else {
        // Populate Month Dropdown
        let i = 0;
        monthNames.forEach((month) => {
            selectMonthGraphFilter.options[i] = new Option(`${month} ${currentYear}`);
            i++;
        });

        // Default selection to current month
        selectMonthGraphFilter.options[currentMonth - 1].selected = true;

        // Get Expenses Sum by Category based on selected card index.
        cardExpenses = getExpensesByCategory(userCards[cardIdx].expenses, currentMonth);
    }

    // Separate object property (Expense Category) into another array.
    const propertyArray = Object.keys(cardExpenses);
    // Separate object value (Expense Amount) into another array.
    const valueArray = Object.values(cardExpenses);

    // Display analytics graph
    analyticsGraph1.style.display = "block";

    // Point canvas element based on parameter passed in.
    const ctx1 = document.getElementById("myChart1");

    // Destroy any chart if exist so we can redraw.
    if (myChartObj1) {
        myChartObj1.destroy();
    }

    // Define chart and its parameters
    myChartObj1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: propertyArray,
            datasets: [{
                label: `Expenses by Category (${CURRENCY})`,
                data: valueArray,
                borderWidth: 1
            }]
        },
        options: {
            backgroundColor: "rgba(132, 139, 200, 0.18)",
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Include dynamic Currency variable defined.
                        callback: function (value, index, ticks) {
                            return `${CURRENCY}` + value;
                        }
                    }
                }
            }
        }
    });
}

function loadGraph2(cardIdx) {
    // Get Expenses Sum by Month based on selected card index.
    const result = getExpensesByMonth(userCards[cardIdx].expenses);

    // Display analytics graph
    analyticsGraph2.style.display = "block";

    // Point canvas element based on parameter passed in.
    const ctx2 = document.getElementById("myChart2");

    // Destroy any chart if exist so we can redraw.
    if (myChartObj2) {
        myChartObj2.destroy();
    }

    // Define chart and its parameters
    myChartObj2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: monthNames,
            datasets: [{
                label: `Expenses by Month (${CURRENCY})`,
                data: result,
                borderWidth: 1
            }]
        },
        options: {
            backgroundColor: "rgba(132, 139, 200, 0.18)",
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Include dynamic Currency variable defined.
                        callback: function (value, index, ticks) {
                            return `${CURRENCY}` + value;
                        }
                    }
                }
            }
        }
    });
}

// Main Function
loadAnalytics();