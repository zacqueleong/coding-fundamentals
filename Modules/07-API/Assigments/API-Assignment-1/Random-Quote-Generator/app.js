// Variable declarations
let quote = document.querySelector('#quote');
let author = document.querySelector('#author');
let generateButton = document.querySelector('#generate-button');
let quoteAuthorSymbol = '-';
const ENDPOINT = 'https://api.quotable.io/random';

// Fetch quotes from API.
async function getQuote(){
    try{
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        quote.textContent = data.content;
        author.textContent = `${quoteAuthorSymbol} ${data.author}`
    } catch(error){
        console.log(error);
    }
}

// Event listeners
generateButton.addEventListener('click',getQuote);