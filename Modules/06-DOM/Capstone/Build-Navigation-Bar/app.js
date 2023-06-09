// Select the header element
let navBar = document.querySelector('.header');

// Event listener: Mouse move                
// When user hovers around the top area, show the header   
window.addEventListener("mousemove", function (e) {
    if (e.clientY < 120) {
        showNav();
    }
});

// Event listener: Scroll                
window.addEventListener("scroll", function (e) {
    // Restore header when user scroll back to the very top.
    if (window.scrollY === 0) {
        showNav();
    } else {
        // When user scroll after a certain height, hide the header, else show the header
        if (window.scrollY > 5) {
            hideNav();
        } else {
            showNav();
        }
    }
});

// Functions
function hideNav() {
    navBar.classList.add('hide');
}

function showNav() {
    navBar.classList.remove('hide');
}
