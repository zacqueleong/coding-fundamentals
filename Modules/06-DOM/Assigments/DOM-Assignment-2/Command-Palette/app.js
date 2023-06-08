// Declaring DOM variables
let cmdPalette = document.querySelector('.palette');

// Event listeners
document.addEventListener('keydown',(event) => {
    let key = event.key;
    console.log(`Key pressed: ${key}`);

    // When CMD + K/k is pressed (For Mac users)
    if(event.metaKey && (key == "K" || key == "k")){
        togglePalette();
        return
    };

    // When CTRL + K/k is pressed (For Window users)
    if(event.ctrlKey && (key == "K" || key == "k")){
        togglePalette();
        return
    };

});

// Function - to automatically 'Toggle' classname to targetted element class attribute.
function togglePalette(){
    cmdPalette.classList.toggle('fade-out'); 
    cmdPalette.classList.toggle('fade-in'); 
}