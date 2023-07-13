// 1. Reverse A String Using Loops
function reverse(str){
    let newWord = "";
    let scanArr = str.length
    for(let i = 0; i <= str.length; i++){
        newWord += str.charAt(scanArr);
        scanArr -= 1;
    }
    return newWord;
}

// 2. Same Back And Forth
function sameBackAndForth(str){
    let stringLength = str.length;

    // Check length if it is divisible by 2
    let mod = stringLength % 2;

    // If divisible by 2, modulus = 0
    if(mod === 0){
        // Split the text by half
        let halfIndex = stringLength / 2;
        let firstHalf = str.slice(0,halfIndex);
        let secondHalf = str.slice(halfIndex);

        // Reverse (2nd half text)
        let reverseSecondHalf = reverse(secondHalf);

        // Compare 1st half vs 2nd half text
        if (firstHalf === reverseSecondHalf){
            // If same return true
            return true;
        }else {
            // If not same return false
            return false;
        }
    }else {
        return false;
    }
}

function reverse(str){
    let newWord = "";
    let scanArr = str.length
    for(let i = 0; i <= str.length; i++){
        newWord += str.charAt(scanArr);
        scanArr -= 1;
    }
    return newWord;
}

// 3. Given an integer, return an integer tha is the reverse ordering of numbers.
function reverseInt(number){
    // Convert number to String
    let numString = number.toString();

    // Split the String into Array
    let numArr = numString.split("");

    // Reverse the Array
    numArr.reverse();

    // Join the array back to String
    numString = numArr.join("");

    // Convert String to Float ( strips out leading zeroes )
    let numFloat = parseFloat(numString);

    // Retrieve back the sign by multiplying with Math.sign will return (positive: 1 , negative: -1, number is zero: 0)
    let output = numFloat * Math.sign(number);

    return output;
}

// 4. Find the sum of all items in an array, using loops.
function sumArr(arr){
    let arrLength = arr.length;
    let item2 = 0;
    for(let i = 0; i < arr.length; i++){
        let item = arr[i];
        item2 += item;
    }
    return item2
}

// 5. Angry Grandma - Return new sentence, every word is in uppercase with 2 '!!' exclamation marks following each word.
function deafGrandma(str){
    //Split text to array
    let strArr = str.split(' ');

    // Loop and process array items
    let resultArr = [];
    let resultItem;
    for(let i = 0; i < strArr.length; i++){
        resultItem = `${strArr[i].toUpperCase()}!!`
        resultArr.push(resultItem);
    }
    let output = resultArr.join(" ");
    return output;
}

// 6. What Is Missing - Find missing alphabetical letter with a string
function whatIsMissing(str){
    // Variable declaration
    let currCharCode
    let prevCharCode
    let output

    // Convert to Lowercase to ensure consistency during comparison
    let lowerCase = str.toLowerCase();

    // For Loop to Process String 
    for(let i = 0; i < lowerCase.length ; i++){
        // Get Current Character Unicode
        currCharCode = lowerCase.charCodeAt(i) 

        // Logic to execute to compare Current vs Previous character unicode for missing letter
        if (i > 0){
            // Subtract Current Character Code with Previous Character Code
            let codeDiff = currCharCode - prevCharCode

            // If the difference is greater than 1, it means there is a missing letter
            if (codeDiff > 1){
                // Get Missing Character Code
                let missCharCode = currCharCode - 1
                // Convert Missing Character Code to Letter
                let missLetter = String.fromCharCode(missCharCode);
                // Return missing letter as output
                output = missLetter;
                return output;
            }
        }

        // Once done processing, store Current Character Code as Previous Character Code
        prevCharCode = currCharCode;
    }

    // Return
    return output;
}

// 7. Swap on Setence - With 3 Arguments (Sentence, Word to Find, Word to Replace)
function swap(sentence,strFind,strReplace){

    // Capitalize the first letter of replace word
    let firstLetter = strReplace.charAt(0).toUpperCase();
    let remainingLetter = strReplace.slice(1);
    let strReplaceCap = firstLetter + remainingLetter;

    // Convert Sentence string to array
    let sentenceArr = sentence.split(' ');

    // Use Array Method indexOf() to find word is in which index
    let strFindIndex = sentenceArr.indexOf(strFind);

    // Use Array Method splice() to remove find word from array and add replace word
    sentenceArr.splice(strFindIndex,1,strReplaceCap);

    // Join array and Return
    let output = sentenceArr.join(' ');

    return output
}

// Function Execution with Parameters
let result1; 
result1 = reverse('abcde');
console.log(`1: ${result1}`);
result1 = reverse('hello');
console.log(`1: ${result1}`);
result1 = reverse('Greetings from The Hacker Collective');
console.log(`1: ${result1}`);

let result2;
result2 = sameBackAndForth("abba");
console.log(`2: "abba", ${result2}`);
result2 = sameBackAndForth("abcdef");
console.log(`2: "abcdef", ${result2}`);

let result3;
result3 = reverseInt(15);
console.log(`3: ${result3}`);
result3 = reverseInt(981);
console.log(`3: ${result3}`);
result3 = reverseInt(500);
console.log(`3: ${result3}`);
result3 = reverseInt(-15);
console.log(`3: ${result3}`);
result3 = reverseInt(-9);
console.log(`3: ${result3}`);

let result4;
result4 = sumArr([1,2,3,4,5]);
console.log(`4: ${result4}`);
result4 = sumArr([1000,2000,44,55,22]);
console.log(`4: ${result4}`);
result4 = sumArr([123,456,789]);
console.log(`4: ${result4}`);

let result5;
result5 = deafGrandma("I have a bad feeling about this");
console.log(`5: ${result5}`);

let result6;
result6 = whatIsMissing("abcdefghijklmnopqrstuvwxyz");
console.log(`6: ${result6}`);
result6 = whatIsMissing("bcdf");
console.log(`6: ${result6}`);
result6 = whatIsMissing("abcdefghjklmno");
console.log(`6: ${result6}`);

let result7;
result7 = swap("His name is Tom", "Tom", "john");
console.log(`7: ${result7}`);
result7 = swap("Let us get back to more Coding", "Coding", "algorithms")
console.log(`7: ${result7}`);
result7 = swap("This has a spellngi error", "spellngi", "spelling")
console.log(`7: ${result7}`);