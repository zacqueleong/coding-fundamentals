function perimeter(mode, numericValue) {    
    // Branchless programming by usage of ternary operator
    return mode === "s" 
        ? 4 * numericValue
        : mode === "c"
        ? 6.28 * numericValue
        : 0
}

// Test cases
console.log((perimeter("s", 7)) === 28);
console.log((perimeter("c", 4)) === 25.12);
console.log((perimeter("c", 9)) === 56.52);