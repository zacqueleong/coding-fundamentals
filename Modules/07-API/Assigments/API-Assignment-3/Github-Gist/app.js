const userInfo = document.querySelector('#user-info')
const nameText = document.querySelector('#user-name');
const ageText = document.querySelector('#user-age');
const hobbiesList = document.querySelector('#user-hobbies');
const fetchButton = document.querySelector('#fetch-button');
const ENDPOINT = "https://api.github.com/gists/1c3f6fed6d610cab94d2f380758f75ef"
const GISTFILE = "me.json";

async function getData(){
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return JSON.parse(data.files[GISTFILE].content)
}

function displayData({ name, age, hobbies }){
    nameText.textContent = name
    ageText.textContent = age

    // Clear / initialise exisitng hobbies list
    hobbiesList.textContent = '';
    // Load all available hobbies entries
    hobbies.forEach(hobby => {
        // Construct list object
        const listObject = document.createElement("li");
        const listNode = document.createTextNode(hobby);
        listObject.appendChild(listNode);

        // Append list object to hobbiesList
        hobbiesList.appendChild(listObject);
    })
}

// Event listeners
window.addEventListener('load', async() => {
    userInfo.classList.add('hide');
})

fetchButton.addEventListener('click', async() => {
    const jsonData = await getData()
    displayData(jsonData);
    userInfo.classList.remove('hide');
})