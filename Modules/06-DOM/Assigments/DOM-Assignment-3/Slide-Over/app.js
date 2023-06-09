// Declaring DOM variables
let regBtn = document.querySelector('.register-button');
let clsBtn = document.querySelector('.close-button');
let slidePanel = document.querySelector('.slide-over-panel');
let wrapper = document.querySelector('.wrapper');
let backdrop = document.querySelector('.bg-backdrop');

// Event Listeners
regBtn.addEventListener('click',()=> {
    toggleSlide();
    includeBackdrop();
})

clsBtn.addEventListener('click',()=> {
    toggleSlide();
    removeBackdrop();
})

// Functions
function toggleSlide(){
    // On first run, slide-over-panel has 1 or lesser class attribute, toggle slide-out. 
    if (slidePanel.classList.length <= 1){
        slidePanel.classList.toggle('slide-out'); 
    }else{
        // Applicable on subsequent runs, where we toggle slide-out and slide-in.
        slidePanel.classList.toggle('slide-out');
        slidePanel.classList.toggle('slide-in'); 
    }    
}

function removeBackdrop(){
    wrapper.removeChild(backdrop); // Remove the backdrop child from the node
}

function includeBackdrop(){
    wrapper.insertBefore(backdrop,regBtn); // Insert the backdrop before the register-button class
}

// Execute Function for default state / initialisation.
toggleSlide();
removeBackdrop();