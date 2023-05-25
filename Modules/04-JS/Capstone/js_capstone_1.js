function missingLetter(str) {
    let output = processString(str);
    return output;
}

function processString(str) {

    // Variable Initialization
    let currCode;
    let prevCode;
    let difference;
    let missCode;
    let missChar;

    // Loop through the string passed in.
    for (let i = 0; i < str.length; i++) {

        // Convert current string index to ASCII.
        let currCode = str.charCodeAt(i);

        // Comparison Logic (Not applicable for first string index)
        if (i > 0) {
            // Compute Difference between ASCII values.
            difference = currCode - prevCode;

            // If difference value above 1, means there is missing character, probe further.
            if (difference > 1) {
                // Get the missing character's ASCII code.
                missCode = currCode - 1;

                // Convert missing character's ASCII code into character.
                missChar = String.fromCharCode(missCode);
            }
        }

        // When done processing for current character, move current currCode to store as prevCode, go to next.
        prevCode = currCode;
    }
    return missChar;
}

//Test cases
console.log(missingLetter("abce") === "d");
console.log(missingLetter("abcdefghjklmno") === "i");
console.log(missingLetter("stvwx") === "u");
console.log(missingLetter("bcdf") === "e");
console.log(missingLetter("abcdefghijklmnopqrstuvwxyz") === undefined);
