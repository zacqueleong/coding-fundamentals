// Array Sum Function
function sum(numbersArray){
    // your code

    // Variable Initialization
    let totalSum = 0;

    for(let i =0; i < numbersArray.length; i++){
        totalSum = numbersArray[i] + totalSum;
    }

    return totalSum;
}

// Test cases
console.log(sum([1, 2, 3, 4]) === 10);
console.log(sum([-3, 5, 19, -6]) === 15);