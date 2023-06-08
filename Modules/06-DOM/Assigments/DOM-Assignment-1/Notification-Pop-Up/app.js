// Declaring DOM variables
let addBtn = document.querySelector('.add__button');
let closeBtn = document.querySelector('.cta__button');
let notificationCard = document.querySelector('.notification');

// Event listeners
addBtn.addEventListener('click',()=>{
    showCard();
});

closeBtn.addEventListener('click',()=>{
    closeCard();
});

// Functions - to append/remove class name to targetted element class attribute.
function showCard(){ 
    notificationCard.classList.add("show");
}

function closeCard(){
    notificationCard.classList.remove("show");
}