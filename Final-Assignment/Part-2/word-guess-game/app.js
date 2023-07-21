const guessForm = document.querySelector(".guess-form");
const guessInput = document.querySelector("#guess-input");
const containerWordEl = document.querySelector("#container-word");
const result = document.querySelector(".result");
const wordMask = "_";

let isMatch = false;
let isWin = false;
let isGameOver = false;
let guessArray = [];
let guessLetters = [];
let tries;
let wordMaskCount;
let playerGuess;

function newGame(){

    // Initialize variables
    isMatch = false;
    isWin = false;
    isGameOver = false;
    guessArray = [];
    guessLetters = [];
    tries = 5;
    wordMaskCount = 0;
    containerWordEl.textContent = "";
    result.textContent = "";
    playerGuess = "";

    // Get random word from wordArray array
    let wordArray = ["apple","bear","candy","banana","durian","mango"];
    let word = getRandomItem(wordArray);

    // Convert the word into lowercase 
    let guessWord = word.toLowerCase();

    // Split the word into letters and store into guessLetters array
    guessLetters = guessWord.split("");

    // Setup game stage by first populating guessArray with "_" according to current guessWord.
    for(let i = 0; i < guessWord.length; i++){   
        guessArray.push(wordMask);
    }
    
    // Load the game stage into page.
    loadWord();
}

function getRandomItem(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function loadWord(){
    // Only execute if not gameOver state
    if (!isGameOver){
        containerWordEl.textContent = "";
        
        // Load from guessArray into page.
        for(let i = 0; i < guessArray.length; i++){  
            containerWordEl.textContent += guessArray[i];
            // Space after the mask, except for last letter.
            if(i != guessArray.length-1){
                containerWordEl.textContent += " ";
            }
        }

        // Check word mask
        checkWordMask();
    }
}

function checkWordMask(){
    wordMaskCount = 0;
    // Count word mask
    for(let i = 0; i < guessArray.length; i++){  
        if(guessArray[i] == wordMask){
            wordMaskCount += 1
        }
    }

    // If no more word mask, means player has won, prompt message accordingly.
    if (wordMaskCount == 0){
        isWin = true;
        displayResult();
    }
}

function checkGuess(){
    playerGuess = guessInput.value.toLowerCase();
    
    isMatch = false;
    // Compare playerGuess with guessLetters
    for(let i = 0; i < guessLetters.length; i++){    
        // If playerGuess match, update guessArray
        if(guessLetters[i] === playerGuess){
            guessArray[i] = playerGuess
            isMatch = true;
        }
    }
    
    // Display Result Message
    displayResult();
    
    // Reload everything.
    loadWord();
}

function displayResult(){
    let message = "";

    if(tries > 0 && isMatch) {
        message = `Yup '${playerGuess}' is one of the letters!`;
        if(isWin){
            message = `You have correctly guessed the word!`;
        }
    } else {
        tries--;
        if (tries > 0){
            message = `The letter '${playerGuess}' entered is incorrect, you have ${tries} tries left.`;
        } else {
            isGameOver = true;
            message = `You have ran out of tries, please click button below to start a new game.`
        }
    }
    
    result.textContent = message;
}

// Execute
newGame();

// Prevent form refresh
guessForm.addEventListener('submit', (e) => e.preventDefault()); 