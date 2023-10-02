import { userDataLS, sessionDataLS, USER_DATA, saveLocalStorage } from './global.js';
import bankCardsJSON from '../json/bankcards.json' assert { type: 'json' };

// DOM Declaration
const cardForm = document.querySelector('.card-form');
const selectBankList = document.getElementById('bank-name');
const selectCardList = document.getElementById('card-name');
const inputCardNumber = document.getElementById('card-number');
const inputCardLimit = document.getElementById('card-limit');
const modal = document.querySelector(".modal");
const buttonOpenModal = document.getElementById("add-card-popup-btn");
const buttonCloseModal = document.getElementsByClassName("modal-close")[0];
const validationToggle = document.getElementById('validation-toggle');

const cardsContainer = document.getElementById("cards-container");
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

// Variable Declaration
const bankCards = bankCardsJSON;
let userData = userDataLS;
let userCards = userDataLS[sessionDataLS.currentUserID].cards;
let selectedBank = "";
let editIndex = 0;
let formSubmissionMode = "";

// Form Function - (BEFORE FORM SUBMISSION) - to filter unique bank name values
function filterUniqueBank(arr, property) {
    const seen = new Set();
    return arr.reduce((uniqueArray, item) => {
        const value = item[property];
        // For property value that is not in Set, means it is unique and new, add to Set and push to uniqueArray
        if (!seen.has(value)) {
            seen.add(value);
            uniqueArray.push(item.bankName);
        }
        // Finally, return uniqueArray, it will return an array with unique bank name values.
        return uniqueArray;
    }, []);
}

// Form Function - (BEFORE FORM SUBMISSION) - to populate card dropdown based on selected bank.
function populateCardList(selectedBank) {
    const filteredCards = bankCards.filter((item) => item.bankName == selectedBank);

    // Load card array based on selected bank.
    selectCardList.options.length = 0;

    // Set dropdown top option label and its attributes
    selectCardList.options[0] = new Option('Select Card');
    selectCardList.options[0].disabled = true;
    selectCardList.options[0].hidden = true;

    let i = 1;
    filteredCards.forEach((card) => {
        selectCardList.options[i] = new Option(card.cardName);
        i++;
    });
}

// Form Function - (BEFORE FORM SUBMISSION) - to load/ initialize card form
function loadCardForm(mode, idx) {
    // Set dropdown top option label and its attributes.
    selectBankList.options[0] = new Option('Select Bank');
    selectBankList.options[0].selected = true;
    selectBankList.options[0].disabled = true;
    selectBankList.options[0].hidden = true;

    // Load arrBanks Array.
    const arrBanks = filterUniqueBank(bankCards, "bankName");
    let i = 1;
    arrBanks.forEach((bank) => {
        selectBankList.options[i] = new Option(bank);
        i++;
    });

    // Set dropdown top option label and its attributes.
    selectCardList.options[0] = new Option('Select Card');
    selectCardList.options[0].selected = true;
    selectCardList.options[0].disabled = true;
    selectCardList.options[0].hidden = true;

    // Set disabled for select element until bank is selected.
    selectCardList.setAttribute("disabled", true);

    // Store mode into formSubmissionMode to be evaluated later during submission.
    formSubmissionMode = mode;

    // Perform separate logic when different mode is passed in.
    switch (mode) {
        case "Add":
            document.querySelector(".modal-title").textContent = "Add Card";
            // Initialize Form Inputs.
            inputCardNumber.value = "";
            validationToggle.checked = false;
            inputCardLimit.value = "";
            break;
        case "Edit":
            editIndex = idx;
            document.querySelector(".modal-title").textContent = "Edit Card";

            // Populate form with user Bank name.
            for (let i = 1; i < selectBankList.options.length; i++) {
                if (selectBankList.options[i].value === userCards[idx].bankName) {
                    selectBankList.options[i].selected = true;
                    break; // Exit the loop after setting the selected option.
                }
            }

            // Toggle disable for select element because a bank is selected.
            selectCardList.removeAttribute("disabled");

            // Get Selected Bank.
            selectedBank = selectBankList.options[selectBankList.selectedIndex].value;

            // Populate all the available card from the selected bank.
            populateCardList(selectedBank);

            // Populate form with user Card name.
            for (let i = 1; i < selectCardList.options.length; i++) {
                if (selectCardList.options[i].value === userCards[idx].cardName) {
                    selectCardList.options[i].selected = true;
                    break; // Exit the loop after setting the selected option.
                }
            }
            // Initialize Form Inputs.
            inputCardNumber.value = userCards[idx].cardNumber;
            validationToggle.checked = false;
            inputCardLimit.value = userCards[idx].cardLimit;
            break;
    }
}

// Form Function - (AFTER FORM SUBMISSION) -  to Read Submitted Form Data / Form Card Object
function readCardForm() {
    let formData = {};
    formData["bankName"] = document.getElementById('bank-name').value;
    formData["cardName"] = document.getElementById('card-name').value;
    formData["cardNumber"] = document.getElementById('card-number').value;
    formData["cardLimit"] = parseInt(document.getElementById('card-limit').value);
    formData["expenses"] = [];
    return formData;
}

// Form Function - (AFTER FORM SUBMISSION) - to Validate Form Data
function processCardData(mode, data, idx) {
    // Validate Card , prompt error if user did not select a card.
    if (data.cardName === "Select Card") {
        alert("Please select a card");
        return;
    }

    // Validate Credit Card Number
    const validateCardResult = validateCardNumber(data.cardNumber);
    if (!validateCardResult.success) {
        alert(validateCardResult.message);
        return;
    }

    // Perform different logic depending on mode.
    switch (mode) {
        case "Add":
            // Append New Record to localStorage array
            userData[sessionDataLS.currentUserID].cards.push(data);
            break;
        case "Edit":
            // Overwrite values directly at current Array.
            userData[sessionDataLS.currentUserID].cards[idx].bankName = data.bankName;
            userData[sessionDataLS.currentUserID].cards[idx].cardName = data.cardName;
            userData[sessionDataLS.currentUserID].cards[idx].cardNumber = data.cardNumber;
            userData[sessionDataLS.currentUserID].cards[idx].cardLimit = data.cardLimit;
            break;
    }

    // Store Record to localStorage
    saveLocalStorage(USER_DATA, userData);

    // Close Popup
    modal.style.display = "none";

    // Reload
    renderPage();
}

// Form Function - (AFTER FORM SUBMISSION) - to Validate Card Number
function validateCardNumber(cardnumber) {
    // Define Error messages
    const ccErrors = [];
    ccErrors[0] = "No card number provided";
    ccErrors[1] = "Credit card number provided is invalid";

    // Define response format
    const response = (success, message = null, type = null) => ({
        success,
        message,
        type
    });

    // Ensure that the user has provided a credit card number
    if (cardnumber.length == 0) {
        return response(false, ccErrors[0]);
    }

    // If Validation switch is Toggled, validate the format of the credit card using luhn's algorithm
    if (validationToggle.checked) {
        if (!checkCardFormat(cardnumber)) {
            return response(false, ccErrors[1]);
        }
    }

    // The credit card is in the required format.
    return response(true, null);
}

// Form Function - (AFTER FORM SUBMISSION) - to Validate Card Number - Card Format
function checkCardFormat(cardnumber) {
    // Check 1: Check if the cardnumber contains only numeric value and is between 13 to 19 digits.
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(cardnumber)) {
        return false;
    }

    // Check 2: Check for credit card number validity using Luhn's Algorithm
    let checksum = 0;
    let arrChecksum = [];
    let weight = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = cardnumber.length - 1; i >= 0; i--) {

        // Initialize variable
        let result = 0;
        let digit = Number(cardnumber.charAt(i));

        // Multiply digit by weightage of 1 or 2 on alternative basis.
        result = digit * weight;

        // If the result after multiplication is in two digits, we add the first digit with the second digit of the number as result.
        if (result > 9) {
            let firstDigit = Number(result.toString().charAt(0));
            let secondDigit = Number(result.toString().charAt(1));
            let addResult = firstDigit + secondDigit;
            result = addResult;
        }

        // Store the product/result in the checksum array.
        arrChecksum.push(result);

        // Switch the weight value (alternate between 1 or 2 on each digits)
        if (weight == 1) {
            weight = 2;
        } else {
            weight = 1;
        }
    }

    // Sum up whole array elements to get final checksum value
    checksum = arrChecksum.reduce((a, b) => a + b);

    // Check checksum if it is divisible by 10 or not, if divisiable, card is valid (true), else is not valid (false).
    if (checksum % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

// Event Listeners
// Page Function - To load all card elements from array and save.
function loadCards() {
    // Clear all existing child data
    while (cardsContainer.hasChildNodes()) {
        cardsContainer.firstChild.remove();
    }

    // Only Load Item from Array if not empty.
    if (userCards.length > 0) {
        userCards.forEach(loadCard);

        // Add Event Listener for Each Edit Card Button
        const editCardButtons = document.querySelectorAll(".btn-edit");
        editCardButtons.forEach(function (button, index) {
            button.addEventListener("click", function () {
                loadCardForm("Edit", index);
                modal.style.display = "block";
            });
        })

        // Add Event Listener for Each Delete Card Button
        const deleteCardButtons = document.querySelectorAll(".btn-delete");
        deleteCardButtons.forEach(function (button, index) {
            button.addEventListener("click", function () {
                const question = 'Are you sure you want to delete this card?';
                const confirmation = window.confirm(question);
                if (confirmation) {
                    // Pass the row index (or any other identifier) to the event handler
                    deleteCard(index);

                    // Reload everything.
                    renderPage();
                }
            });
        })
    }
}

// Page Function - To load each individual card details.
function loadCard(data, index) {
    // Card  
    let elCard = document.createElement('div');
    elCard.setAttribute("class", `card`);
    elCard.setAttribute("id", `card-${index}`);
    cardsContainer.appendChild(elCard);

    // Card Info
    let elCardInfo = document.createElement('div');
    elCardInfo.setAttribute("class", `card-info`);
    elCardInfo.setAttribute("id", `card-item-${index}`);
    elCard.appendChild(elCardInfo);

    // Card Info - Bank Name
    let elBankName = document.createElement('div');
    elBankName.setAttribute("class", `card-bank`);
    elBankName.textContent = `${data.bankName}`;
    elCardInfo.appendChild(elBankName);

    // Card Info - Card Name
    let elCardName = document.createElement('div');
    elCardName.setAttribute("class", `card-name`);
    elCardName.textContent = `${data.cardName}`;
    elCardInfo.appendChild(elCardName);

    // Card Info - Card Number
    let elCardNumber = document.createElement('div');
    elCardNumber.setAttribute("class", `card-number`);
    elCardNumber.textContent = `${data.cardNumber}`;
    elCardInfo.appendChild(elCardNumber);

    // Card Action
    let elCardAction = document.createElement('div');
    elCardAction.setAttribute("class", `card-action`);
    elCard.appendChild(elCardAction);

    // Card Action - Edit Button
    let elBtnEdit = document.createElement('button');
    elBtnEdit.setAttribute("class", `btn-edit`);
    elBtnEdit.setAttribute("id", `btn-edit-item-${index}`);
    elBtnEdit.textContent = "Edit";
    elCardAction.appendChild(elBtnEdit);

    // Card Action - Delete Button
    let elBtnDelete = document.createElement('button');
    elBtnDelete.setAttribute("class", `btn-delete`);
    elBtnDelete.setAttribute("id", `btn-delete-item-${index}`);
    elBtnDelete.textContent = "Delete";
    elCardAction.appendChild(elBtnDelete);
}

// Page Function - To delete individual card.
function deleteCard(idx) {
    userData[sessionDataLS.currentUserID].cards.splice(idx, 1);
    saveLocalStorage(USER_DATA, userData);
}

// Event Listeners
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
});

selectBankList.addEventListener("change", () => {

    // Toggle disable for select element because a bank is selected.
    selectCardList.removeAttribute("disabled");

    // Get Selected Bank.
    selectedBank = selectBankList.options[selectBankList.selectedIndex].value;

    // Populate all the available card from the selected bank.
    populateCardList(selectedBank);
});

cardForm.addEventListener("submit", (event) => {
    // Prevent default behavior of including submitted form data at address bar after submission
    event.preventDefault();

    // Read Form 
    let formData = readCardForm();

    // Process Form Data
    processCardData(formSubmissionMode, formData, editIndex);
})

// Open Modal ("Add Card") button is pressed
buttonOpenModal.addEventListener("click", function () {
    loadCardForm("Add");
    modal.style.display = "block";
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

// Initial Function
function renderPage() {
    loadCards();
}

// Call the Initial Function
renderPage();