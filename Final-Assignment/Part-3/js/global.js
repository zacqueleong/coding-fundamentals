// Local Storage Name Setup
export const USER_DATA = "cardtrackr-data";
export const SESSION_DATA = "cardtrackr-session";
export let userDataLS = getLocalStorage(USER_DATA);
export let sessionDataLS = getLocalStorage(SESSION_DATA);

// Globally used Variables
export const CURRENCY = "RM";
export const arrCategory = ["Online", "Grocery", "Petrol", "Dining", "Retail", "Travel", "Bills & Utilities", "Education", "Health Care", "Others"];
export const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];
const currentDate = new Date();
export const currentMonth = currentDate.getMonth() + 1;
export const currentYear = currentDate.getFullYear();

// Functions used more than once in various files.
export function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data === null) {
        data = [];
    }
    return data
}

// Function to get total Expense
export function getTotalExpense(arr, month) {
    const total = arr.reduce((accumulator, item) => {

        // When the month parameter is specified, accumulate by month
        if (month != undefined) {
            if (item.expenseMonth === month) {
                return accumulator + item.expenseAmount;
            }
        } else {
            return accumulator + item.expenseAmount;
        }

        return accumulator
    }, 0);
    return total;
}