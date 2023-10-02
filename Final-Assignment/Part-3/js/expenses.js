import { CURRENCY, monthNames, currentYear, currentMonth, arrCategory, userDataLS, sessionDataLS, USER_DATA, saveLocalStorage, getTotalExpense } from './global.js';

// DOM Declaration
const addExpenseForm = document.getElementById('add-expense-form');
const editExpenseForm = document.getElementById('edit-expense-form');
const selectCategoryList = document.getElementById('expense-category');
const filterExpenseForm = document.getElementById('filter-expense-form');
const selectCardFilter = document.getElementById('expense-filter-card');
const selectYearFilter = document.getElementById('expense-filter-year');
const selectMonthFilter = document.getElementById('expense-filter-month');
const showallLink = document.getElementById('showall-link');
const modal = document.querySelector(".modal"); 
const buttonCloseModal = document.getElementsByClassName("modal-close")[0]; 
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

// Variable Declaration
const defaultRowLimit = 3;
const messageNoCard = "Please select a card from section above to show expenses.";
const messageNoExpense = "No expense record found, please add from section below.";
const expensesTableHeader = ["Date", "Category", "Description", "Amount", "Action"];
const expensesTableMap = {
    "date": "expenseDate",
    "category": "expenseCat",
    "description": "expenseDesc",
    "amount": "expenseAmount"
};
let userData = userDataLS;
let userCards = userDataLS[sessionDataLS.currentUserID].cards;
let currentCardIndex;
let currentRowLimit;
let currentExpenseIndex;
let selectedCardIndex = 0;

// Function to initialize and clear the table container
function clearTableContainer(containerId) {
    const tableContainer = document.getElementById(containerId);
    tableContainer.innerHTML = '';
}

// Function to generate table based on parameters passed in
function generateTable(data, headers, containerId, propertyMap, limit) {
    const tableContainer = document.getElementById(containerId);

    // Create a table element
    const table = document.createElement("table");
    table.id = `${containerId}-table`;

    // Create a table header row
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();

    // Populate the table header row with headers
    headers.forEach((headerText) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Create a table body
    const tableBody = document.createElement("tbody");

    // Populate the table body with data
    data.forEach((item, index = 0) => {
        const row = tableBody.insertRow();
        if (limit == 0 || index < limit) {
            headers.forEach((header) => {
                const cell = row.insertCell();
                const propertyName = propertyMap[header.toLowerCase()] || header.toLowerCase();
                cell.textContent = item[propertyName];

                // Special handling 
                // When header is Action
                if (header === "Action") {
                    cell.innerHTML = `
                    <button class="btn-edit-expenses">Edit</button>
                    <button class="btn-delete-expenses">Delete</button>
                    `
                }
                // When loading Credit Limit / Expense Amount
                if (propertyName === "expenseAmount" || propertyName === "cardLimit") {
                    cell.textContent = `${CURRENCY} ${item[propertyName]}`
                }
            });
        }
        index++
    });

    // Append the table to the container
    table.appendChild(tableBody);
    tableContainer.appendChild(table);
}

// Form Function - (BEFORE FORM  SUBMISSION) - to Load Expense Filter module
function loadExpenseFilter() {
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

    // Load Year options
    selectYearFilter.options[0] = new Option(`Select Year`);
    selectYearFilter.options[0].selected = true;
    selectYearFilter.options[0].disabled = true;
    selectYearFilter.options[0].hidden = true;

    // Populate the year dropdown from current year until startYear.
    const startYear = 1970;
    for (let i = currentYear; i >= startYear; i--) {
        let option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        selectYearFilter.appendChild(option);
    }

    // Load Month options
    selectMonthFilter.options[0] = new Option(`Select Month`);
    selectMonthFilter.options[0].selected = true;
    selectMonthFilter.options[0].disabled = true;
    selectMonthFilter.options[0].hidden = true;

    // Populate the month dropdown in name, from January until December.
    let j = 1;
    monthNames.forEach((month) => {
        selectMonthFilter.options[j] = new Option(month);
        j++;
    });
}

// Page Function - to Populate Card Info 
function populateCardInfo(idx) {
    document.getElementById('cardinfo-name-value').textContent = userCards[idx].cardName;
    document.getElementById('cardinfo-number-value').textContent = userCards[idx].cardNumber;
    document.getElementById('cardinfo-bank-value').textContent = userCards[idx].bankName;
    document.getElementById('cardinfo-limit-value').textContent = `${CURRENCY} ${userCards[idx].cardLimit}`;
    document.getElementById('cardinfo-tspend-value').textContent = `${CURRENCY} ${getTotalExpense(userCards[idx].expenses, currentMonth)}`;
}

// Form Function - (AFTER FORM  SUBMISSION) - to Filter Expenses by Year and Month
function filterExpensesByYearAndMonth(arr, expenseYear, expenseMonth) {
    return arr.filter(expense =>
        expense.expenseYear === expenseYear && expense.expenseMonth === expenseMonth
    );
}

// Form Function - (BEFORE FORM SUBMISSION) - to load/ initialize expense form
function loadExpenseForm() {
    // Set dropdown top option label and its attributes
    selectCategoryList.options[0] = new Option('Select Category');
    selectCategoryList.options[0].selected = true;
    selectCategoryList.options[0].disabled = true;
    selectCategoryList.options[0].hidden = true;

    // Load arrCategory Array

    let i = 1;
    arrCategory.forEach((category) => {
        selectCategoryList.options[i] = new Option(category);
        i++;
    });

    // Initialize Form Inputs
    document.getElementById('expense-date').value = "";
    document.getElementById('expense-name').value = "";
    document.getElementById('expense-amount').value = "";
}

// Form Function - (AFTER FORM SUBMISSION) -  to Read Submitted Form Data / Form Card Object
function readExpenseForm() {
    let formData = {};

    formData["expenseDate"] = document.getElementById('expense-date').value;

    // Get the Year / Month / Day of the date
    const expenseDate = new Date(formData.expenseDate);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1; // Months start from 0 , so we add 1
    const expenseDay = expenseDate.getDate();

    formData["expenseYear"] = expenseYear;
    formData["expenseMonth"] = expenseMonth;
    formData["expenseDay"] = expenseDay;

    formData["expenseCat"] = document.getElementById('expense-category').value;
    formData["expenseDesc"] = document.getElementById('expense-name').value;
    formData["expenseAmount"] = parseInt(document.getElementById('expense-amount').value);

    return formData;
}

// Form Function - (BEFORE FORM SUBMISSION) - to load/ initialize expense form
function clearEditExpenseForm() {
    document.getElementById('edit-expense-date').value = "";
    document.getElementById('edit-expense-category').value = "";
    document.getElementById('edit-expense-name').value = "";
    document.getElementById('edit-expense-amount').value = "";
}

// Form Function - (BEFORE FORM SUBMISSION) - to load/ initialize expense form
function loadEditExpenseForm(arr) {
    document.getElementById('edit-expense-date').value = arr.expenseDate;

    // Fill category dropdown list with options
    const editExpenseCategoryList = document.getElementById('edit-expense-category');
    let i = 0;
    arrCategory.forEach((category) => {
        editExpenseCategoryList.options[i] = new Option(category);
        i++;
    });
    // Default value for category dropdown with selected expense category.
    for (let i = 1; i < editExpenseCategoryList.options.length; i++) {
        if (editExpenseCategoryList.options[i].value === arr.expenseCat) {
            editExpenseCategoryList.options[i].selected = true;
            break; // Exit the loop after setting the selected option.
        }
    }

    document.getElementById('edit-expense-name').value = arr.expenseDesc;
    document.getElementById('edit-expense-amount').value = arr.expenseAmount;
}

// Form Function - (AFTER FORM SUBMISSION) -  to Read Submitted Form Data / Form Card Object
function readEditExpenseForm() {
    let formData = {};

    formData["expenseDate"] = document.getElementById('edit-expense-date').value;

    // Get the Year / Month / Day of the date
    const expenseDate = new Date(formData.expenseDate);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1; // Months start from 0 , so we add 1
    const expenseDay = expenseDate.getDate();

    formData["expenseYear"] = expenseYear;
    formData["expenseMonth"] = expenseMonth;
    formData["expenseDay"] = expenseDay;

    formData["expenseCat"] = document.getElementById('edit-expense-category').value;
    formData["expenseDesc"] = document.getElementById('edit-expense-name').value;
    formData["expenseAmount"] = parseInt(document.getElementById('edit-expense-amount').value);

    return formData;
}

// Form Function - (AFTER FORM SUBMISSION) - to Validate Form Data
function processExpenseData(data, mode) {

    // Validate Form Data
    if (data.expenseDate === "") {
        alert("Please select a Date.");
        return;
    }

    if (data.expenseCat === "Select Category") {
        alert("Please select a Category.");
        return;
    }

    if (data.expenseDesc.trim() === "") {
        alert("Please fill in expense Description.");
        return;
    }

    let checkAmount = parseInt(data.expenseAmount);
    if (isNaN(checkAmount) || checkAmount <= 0) {
        alert("Expense Amount must be greater than 0.");
        return;
    }

    switch (mode) {
        case "Add":
            // Append Record to localStorage array
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses.push(data);
            break;
        case "Edit":
            // Overwrite values directly at current Array.
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseDate = data.expenseDate;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseYear = data.expenseYear;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseMonth = data.expenseMonth;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseDay = data.expenseDay;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseCat = data.expenseCat;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseName = data.expenseDes;
            userData[sessionDataLS.currentUserID].cards[currentCardIndex].expenses[currentExpenseIndex].expenseAmount = data.expenseAmount;
            break;
    }

    // Store Record to localStorage
    saveLocalStorage(USER_DATA, userData);
}

// Page Function - to Load all expenses of a given card.
function loadExpense(idx, rowLimit) {
    // Clear Table Container / Initialize
    clearTableContainer("cardinfo-expenses");

    // Only Load Item from Array if not empty.
    if (userCards[idx].expenses.length > 0) {
        sortExpenseDate(userCards[idx].expenses);
        generateTable(userCards[idx].expenses, expensesTableHeader, "cardinfo-expenses", expensesTableMap, rowLimit);
    } else {
        document.getElementById("cardinfo-expenses").textContent = messageNoExpense;
    }

    // Clear Edit Expense Form
    clearEditExpenseForm();

    // Add Event Listener for Each Edit Expense Button
    const editButtons = document.querySelectorAll("#cardinfo-expenses-table .btn-edit-expenses");
    editButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            // Store index clicked as current expense index
            currentExpenseIndex = index;

            // Prepare Edit Expense Form based on current expense index
            loadEditExpenseForm(userCards[currentCardIndex].expenses[currentExpenseIndex]);

            // Open Modal Form
            modal.style.display = "block";
        })
    })

    // Add Event Listener for Each Delete Expense Button
    const deleteButtons = document.querySelectorAll("#cardinfo-expenses-table .btn-delete-expenses");
    deleteButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            const question = 'Are you sure you want to delete this expense?';
            const confirmation = window.confirm(question);
            if (confirmation) {
                // Pass the row index (or any other identifier) to the event handler
                deleteExpense(idx, index);

                // Reload everything.
                renderPage();
            }
        });
    });
}

// To sort expense date by Descending Order (Latest First)
function sortExpenseDate(arr) {
    arr.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));
}

// To delete selected expense function.
function deleteExpense(cardIndex, rowIndex) {
    userData[sessionDataLS.currentUserID].cards[cardIndex].expenses.splice(rowIndex, 1);
    saveLocalStorage(USER_DATA, userData);
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

    // Set current card index as selected card index.
    currentCardIndex = selectedCardIndex;

    // Reset/Default Year and Month Filter value
    selectYearFilter.options[0].selected = true;
    selectMonthFilter.options[0].selected = true;

    // Populate all the card info with selected card index.
    populateCardInfo(currentCardIndex);

    // Set default row limit as current row limit
    currentRowLimit = defaultRowLimit;

    // Refresh Expenses Table with selected card index.
    loadExpense(currentCardIndex, currentRowLimit);
});

addExpenseForm.addEventListener("submit", (event) => {
    // Prevent default behavior of including submitted form data at address bar after submission
    event.preventDefault();

    if (currentCardIndex != undefined) {
        // Read Form
        let formData = readExpenseForm();

        // Process Form Data 
        processExpenseData(formData, "Add");
    } else {
        alert("Please select a card before adding expenses.")
    }

    // Reload Form
    loadExpenseForm();

    // Reload 
    renderPage();
})

editExpenseForm.addEventListener("submit", (event) => {
    // Prevent default behavior of including submitted form data at address bar after submission
    event.preventDefault();

    // Read Form
    let formData = readEditExpenseForm();

    // Process Form Data
    processExpenseData(formData, "Edit");

    // Close Popup
    modal.style.display = "none";

    // Reload
    renderPage();
})

// When the user clicks on <span> (x), close the modal
buttonCloseModal.addEventListener("click", function () {
    modal.style.display = "none";
})

// When the user click on anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

filterExpenseForm.addEventListener("submit", (event) => {
    // Prevent default behavior of including submitted form data at address bar after submission
    event.preventDefault();

    // Only proceed if a card is selected.
    if (currentCardIndex != undefined) {
        const selectedYear = parseInt(document.getElementById('expense-filter-year').value);
        const selectedMonth = monthNames.indexOf(document.getElementById('expense-filter-month').value) + 1;
        const filteredExpense = filterExpensesByYearAndMonth(userCards[currentCardIndex].expenses, selectedYear, selectedMonth);

        if (filteredExpense.length > 0) {
            // Accumulate and populate Total Spend (this Month)
            document.getElementById('cardinfo-tspend-value').textContent = `${CURRENCY} ${getTotalExpense(userCards[currentCardIndex].expenses, selectedMonth)}`;
            clearTableContainer("cardinfo-expenses");

            // Show all rows for all the filtered expenses
            currentRowLimit = 0;
            generateTable(filteredExpense, expensesTableHeader, "cardinfo-expenses", expensesTableMap, currentRowLimit);
        } else {
            // Populate 0 for Total Spend
            document.getElementById('cardinfo-tspend-value').textContent = `${CURRENCY} ${0}`;
            clearTableContainer("cardinfo-expenses");
            document.getElementById("cardinfo-expenses").textContent = messageNoExpense;
            alert('No records found based on filter criteria!');
        }
    } else {
        alert('Please select a card.');
    }
})

showallLink.addEventListener('click', (event) => {
    if (currentCardIndex != undefined) {

        // Show all rows, there will be no limit.
        currentRowLimit = 0;

        // Refresh Expenses Table with selected card index.
        loadExpense(currentCardIndex, currentRowLimit);
    }
})

// Initial Function
function renderPage() {
    loadExpenseFilter();
    loadExpenseForm();
    if (currentCardIndex != undefined) {
        populateCardInfo(currentCardIndex);
        loadExpense(currentCardIndex, currentRowLimit);
    } else {
        document.getElementById("cardinfo-expenses").textContent = messageNoCard;
    }
}

// Call the Initial Function
renderPage();