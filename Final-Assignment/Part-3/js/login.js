import { userDataLS, USER_DATA, SESSION_DATA, saveLocalStorage } from "./global.js";

// DOM Declaration
const loginBtn = document.querySelector('.login-btn');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const registerLink = document.getElementById('register-link');
const modal = document.querySelector(".modal");
const registerBtn = document.querySelector('.register-btn');
const buttonCloseModal = document.getElementsByClassName("modal-close")[0];
const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');

// Login Functions
function checkLogin() {
    let isValidLogin = false;
    let isInvalidPassword = false;
    let i = 0;

    for (const user of userDataLS) {
        if (user.username == loginUsername.value) {
            if (user.password == loginPassword.value) {
                alert('Login Successful. Redirecting to dashboard..');
                isValidLogin = true;
                startSession(i, user.username);
            } else {
                if (!isInvalidPassword) {
                    alert('Incorrect Password!');
                    isInvalidPassword = true;
                }
                isValidLogin = false;
                break;
            }
        }
        i++;
    }

    if (!isValidLogin && !isInvalidPassword) {
        alert('Invalid login details provided.');
    }
}

function startSession(userIndex, userName) {
    let sessionUser = {};
    sessionUser["currentUserID"] = userIndex;
    sessionUser["currentUser"] = userName;
    saveLocalStorage(SESSION_DATA, sessionUser); // Write Session Data
    window.location.href = "./html/dashboard.html"; // Redirect to Dashboard page
}

function clearSession() {
    localStorage.removeItem(SESSION_DATA);
}

// Register Functions
function readRegisterForm() {
    let formData = {};
    formData["username"] = registerUsername.value;
    formData["password"] = registerPassword.value;
    formData["cards"] = [];
    return formData;
}

function processRegisterData(data) {
    // Validate Username , check for duplicates
    for (const user of userDataLS) {
        if (user.username == registerUsername.value) {
            alert('Username already exist.');
            return;
        }
    }

    // Confirm creation
    const question = `Confirm creation of account?`
    const confirmation = window.confirm(question);
    if (confirmation) {
        userDataLS.push(data);
        saveLocalStorage(USER_DATA, userDataLS);
        alert(`Account successfully created. Please login to continue.`);
        modal.style.display = "none";
    }

    // Clear Form
    clearRegisterForm();
}

function clearRegisterForm() {
    registerUsername.value = "";
    registerPassword.value = "";
}

// Main Function
clearSession();

// Event Listeners
loginBtn.addEventListener("click", (event) => {
    // Prevent default behavior 
    event.preventDefault();

    checkLogin();
})

registerLink.addEventListener("click", (event) => {
    // Prevent default behavior
    event.preventDefault();

    // Open Modal
    modal.style.display = "block";
})

registerBtn.addEventListener("click", (event) => {
    // Prevent default behavior
    event.preventDefault();

    // Read Form 
    let formData = readRegisterForm();

    // Process Form Data
    processRegisterData(formData);
})

// When the user clicks on <span> (x), close the modal
buttonCloseModal.addEventListener("click", function () {
    modal.style.display = "none";
    clearRegisterForm();
})

// When the user click on anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        clearRegisterForm();
    }
}