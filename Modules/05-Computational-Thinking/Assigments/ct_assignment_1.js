function possibleBonus(positionA, positionB) {

    const diceMaxValue = 6;

    // When negative input 
    if (positionA < 0 || positionB < 0) {
        // console.log(`FALSE: Only positive integer inputs allowed.`);
        outcome = false;
    } else {
        // When positive input
        // Evaluate the possibilities
        let tilesDistance = positionB - positionA;
        if (tilesDistance > 0 && tilesDistance <= diceMaxValue) {
            // console.log(`TRUE: Scenario is possible to earn bonus`);
            outcome = true;
        } else {
            // console.log(`FALSE: Scenario is not possible to earn bonus`);
            outcome = false;
        }
    }

    return outcome;
}

// Test cases
// Case 1: When position A and B < 6, TRUE
console.log(`Case 1: ${possibleBonus(3, 7)}`);
// Case 2: When position A and B tiles distance is beyond 6 tiles, FALSE
console.log(`Case 2: ${possibleBonus(1, 9)}`);
// Case 3: When position A is ahead of B, FALSE
console.log(`Case 3: ${possibleBonus(5, 3)}`);
// Case 4: When position A and B same tile, FALSE
console.log(`Case 4: ${possibleBonus(1, 1)}`);
// Case 5: When position A negative integer input, FALSE
console.log(`Case 5: ${possibleBonus(-1, 1)}`);
// Case 6: When position B negative integer input, FALSE
console.log(`Case 6: ${possibleBonus(1, -1)}`);
// Case 7: When both position negative integer input, FALSE
console.log(`Case 7: ${possibleBonus(-1, -1)}`);