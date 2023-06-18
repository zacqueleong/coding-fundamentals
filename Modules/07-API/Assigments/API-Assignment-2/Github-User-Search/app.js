// DOM Variable declarations
const profile = document.querySelector('#profile');
const profileAvatar = document.querySelector('#profile-avatar');
const profileName = document.querySelector('#profile-name');
const profileBio = document.querySelector('#profile-bio');
const profileJoined = document.querySelector('#profile-joined');
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const ENDPOINT = 'https://api.github.com/users/'
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Fetch user profile details from API
async function getUser(searchInput) {
    try{
        const response = await fetch(`${ENDPOINT}${searchInput}`);
        const data = response.json();   
        readPromise(data);
    } catch (error) {
        console.log(error);
    }
}

// Read/Process promise data
function readPromise(data){
    const p = Promise.resolve(data);

    p.then(value => { 
        // When username entered found
        if (value.name != null){            
            // Assign promise object value directly to HTML content/attribute
            profileAvatar.src = value.avatar_url;
            profileName.textContent = value.name;
            profileBio.textContent = value.bio;
            profileJoined.textContent =`Joined at: ${processDate(value.created_at)}`;

            // Display the element
            profile.classList.remove('hide');
            profile.classList.add('show');
        } else{
            // When username entered not found
            profile.classList.remove('show');
            profile.classList.add('hide');
            alert('Invalid github user, please try again.');
        }
    }).catch(err => {
        console.log(err);
    });
}

function processDate(createdDate){
    // Convert to Date object
    let date1 = new Date(createdDate);
    let createdDay = date1.getDate();
    let createdMonth = month[date1.getMonth()];
    let createdYear = date1.getFullYear();
    return `${createdDay} ${createdMonth} ${createdYear}`; 
}

// Event listeners
searchButton.addEventListener('click',async (e) => {
    const searchInput = searchForm.querySelector('input').value;
    getUser(searchInput);
});