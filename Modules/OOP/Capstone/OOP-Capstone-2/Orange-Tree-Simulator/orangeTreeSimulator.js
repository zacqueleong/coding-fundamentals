class OrangeTree {
    constructor(age = 0, height = 0, oranges = []) {
        this.age = age;
        this.height = height;
        this.oranges = oranges;
        let _dead;
        let _maxAge;

        this.getDead = () => _dead;
        this.setDead = (bool) => {
            _dead = bool
        };

        this.getMaxAge = () => _maxAge;
        this.setMaxAge = (age) => {
            if (age >= 0) {
                _maxAge = age;
            }
        }
    }

    ageMe() {
        // Age tree by one year, but only if less than Max Age.
        if (this.age <= this.getMaxAge()) {
            this.age++;
        }

        // When age greater than maximum age, the tree dies.
        if (this.age > this.getMaxAge()) {
            this.setDead(true);
        }

        // Increase height, but only for the first 10 years.
        if (this.age <= 10) {
            this.height++;
        }

        // Produce orange, but only if tree age greater than 3 years old.
        if (this.age > 3) {
            // Randomize the loop produce rate of the orange, each loop iteration = 1 orange.
            let randomProduce = Math.floor(Math.random() * 10);
            for (let i = 0; i <= randomProduce; i++) {
                // Randomize the diameter/size of the orange produce.
                let randomSize = Math.floor(Math.random() * 100);

                // Declare a new orange object with the radomize orange size and push to oranges array.
                const orange = new Orange(randomSize);
                this.oranges.push(orange);
            }
        }
    }

    hasAnyOranges() {
        if (this.oranges.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    pickAnOrange() {
        // Generate a random index from Oranges array.
        const randomIndex = Math.floor(Math.random() * this.oranges.length);

        // Select the random orange.
        const randomItem = this.oranges[randomIndex];

        // Remove the orange from the tree.
        this.oranges.splice(randomIndex, 1);

        return randomItem;
    }
}

class Orange {
    constructor(diameter) {
        this.diameter = diameter;
    }
}

// Driver code - DO NOT MODIFY

// Initialize new Orange tree object
const tree = new OrangeTree();

//Set the Orange tree object private properties.
tree.setDead(false);
tree.setMaxAge(20);

// While tree has no oranges, age the tree by one year
while (!tree.hasAnyOranges()) {
    tree.ageMe();
}

// Initialize a variable to keep track of the total oranges picked from the tree
let totalOranges = null;

// While the tree is not dead
while (!tree.getDead()) {
    // Initialize empty basket
    const basket = [];

    // While tree has oranges, pick and place an orange into the basket
    while (tree.hasAnyOranges()) {
        basket.push(tree.pickAnOrange());
    }

    // Increment the total oranges picked by the number of oranges picked this harvest
    totalOranges += basket.length;

    // Calculate the average diameter for this harvest
    let averageDiameter = basket.reduce((sum, orange) => {
        return sum + orange.diameter;
    }, 0);

    // Output tree information (like what year it is, height of a tree, average diameter)
    console.log(`Year ${tree.age} Report`);
    console.log(
        `Harvest: ${basket.length} oranges with an average diameter of ${averageDiameter} cm`
    );
    console.log(`Tree height: ${tree.height}`);

    // Age the tree by one year
    tree.ageMe();
}

// Finally, the tree has died. Output the total number of oranges picked
console.log(
    `At last, the tree has died. It produced a total of ${totalOranges} oranges.`
);
// Driver code - DO NOT MODIFY