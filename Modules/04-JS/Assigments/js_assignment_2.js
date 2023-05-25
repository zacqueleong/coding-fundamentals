function calculateAge(strDate) {
    // your code
    
    // Get Current Year.
    let date = new Date();
    let currentYear = date.getFullYear();
    console.log(`Current Year: ${currentYear}`);

    // Get Input Year.

    // Split the input date to array elements, using parameters as specified.
    const limit = 3;
    let arrDate = strDate.split(/[/,-]+/,limit); // Regex Expression "/[/,-]+/" is used, to split by / AND - symbols, and split 3 times only.

    // Store split values from array into variables for clarity.
    let day = arrDate[0]; //Day
    let month = arrDate[1]; //Month
    let year = arrDate[2]; //Year

    // Convert year variable from string to integer.
    let inputYear = parseInt(year);
    console.log(`Input Year: ${inputYear}`);

    // Compute Age.
    let age = currentYear - inputYear;
    console.log(`Age: ${age}`);

    return age;
}

// Test cases
console.log(calculateAge("20/07/2002") === 21)
console.log(calculateAge("1/1/1979") === 44)