class Calculator {
    constructor(input){
        this.input = input;
        this.result = 0;
    }
    
    add(number){
        this.result = number + this.input;
        console.log(`${this.input} + ${number} = ${this.result}`);
        this.input = this.result;
        return this;
    }

    subtract(number){
        this.result = this.input - number;
        console.log(`${this.input} - ${number} = ${this.result}`)
        this.input = this.result;
        return this;
    }

    multiply(number){
        this.result = this.input * number;
        console.log(`${this.input} ✖️ ${number} = ${this.result}`)
        this.input = this.result;
        return this;
    }

    divide(number){
        this.result = this.input / number;
        console.log(`${this.input} ÷ ${number} = ${this.result}`)
        this.input = this.result;
        return this;
    }

    value(){
        console.log(`The current value is ${this.input}.`)
    }
}

const calculator = new Calculator(0);

calculator.add(5).subtract(2).multiply(5).divide(3);

calculator.value();