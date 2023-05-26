function generation(gen, gender) {

    const LABEL_MALE = "male";
    const LABEL_FEMALE = "female";
    let genderKey;
    // Array to store ancestor / descendant objects
    let arr = [
        {
            generation: -3,
            gender: "male",
            title: "great grandfather"
        },
        {
            generation: -2,
            gender: "male",
            title: "grandfather"
        },
        {
            generation: -1,
            gender: "male",
            title: "father"
        },
        {
            generation: 0,
            gender: "male",
            title: "me!"
        },
        {
            generation: 1,
            gender: "male",
            title: "son"
        },
        {
            generation: 2,
            gender: "male",
            title: "grandson"
        },
        {
            generation: 3,
            gender: "male",
            title: "great grandson"
        },
               {
            generation: -3,
            gender: "female",
            title: "great grandmother"
        },
        {
            generation: -2,
            gender: "female",
            title: "grandmother"
        },
        {
            generation: -1,
            gender: "female",
            title: "mother"
        },
        {
            generation: 0,
            gender: "female",
            title: "me!"
        },
        {
            generation: 1,
            gender: "female",
            title: "daughter"
        },
        {
            generation: 2,
            gender: "female",
            title: "granddaughter"
        },
        {
            generation: 3,
            gender: "female",
            title: "great granddaughter"
        }
    ]

    // Map gender input to actual gender string used in object
    switch(gender){
        case "m":
            genderKey = LABEL_MALE;
            break;
        case "f":
            genderKey = LABEL_FEMALE;
            break;
        default:
            genderKey = "INVALID GENDER INPUT";
            break;
    }

    // Find ancestor / descendant from stored array by input parameters
    let result = arr.find(z => z.generation === gen && z.gender === genderKey);

    // Return result
    return result.title;
}

//Test cases
console.log(generation(-3, "m") === "great grandfather");
console.log(generation(-3, "f") === "great grandmother");
console.log(generation(-2, "m") === "grandfather");
console.log(generation(-2, "f") === "grandmother");
console.log(generation(-1, "m") === "father");
console.log(generation(-1, "f") === "mother");
console.log(generation(0, "m") === "me!");
console.log(generation(0, "f") === "me!");
console.log(generation(1, "m") === "son");
console.log(generation(1, "f") === "daughter");
console.log(generation(2, "m") === "grandson");
console.log(generation(2, "f") === "granddaughter");
console.log(generation(3, "m") === "great grandson");
console.log(generation(3, "f") === "great granddaughter");