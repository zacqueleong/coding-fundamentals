function factorial(anyNumber){  
    // your code

    // Variable Initialization
    let result = 0;

    if (anyNumber === 0 || anyNumber === 1){ // Handling of special cases if number passed in was 0 OR 1, factorial will always be 1.
        result = 1;
    } else {
        result = anyNumber;
        while(anyNumber > 1){
            anyNumber--; //decrement by 1 on each iteration, when <= 1 , it will exit while loop.
            result = result * anyNumber; //accumulate the result.
        }
    }
    
    return result;
}

//Test cases
console.log(factorial(5) === 120);
console.log(factorial(4) === 24);
console.log(factorial(1) === 1);