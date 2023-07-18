function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(numberOne,numberTwo,operator) {
    switch (operator) {
        case "+": return add(numberOne, numberTwo);
        case "-": return subtract(numberOne, numberTwo);
        case "*": return multiply(numberOne, numberTwo);
        case "÷": return divide(numberOne, numberTwo);
    }   
}

let displayUpperScreen = [];
// evaluates the array and updates screen accordingly
function updateUpperScreen() {
    displayTextTop = displayUpperScreen.map((e) => (e)).join("");
    document.querySelector(".screen-top").innerHTML = displayTextTop;
}
let numberEntered = false;
let buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayUpperScreen.push(button.innerHTML);
        updateUpperScreen();
        numberEntered = true;
    });
});
let operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (numberEntered === true) {
            displayUpperScreen.push(operator.innerHTML);
            updateUpperScreen();
            numberEntered = false;
        }
        // handles case for when a result exists by emptying arrays
        if (resultExists === true) {
            displayUpperScreen.length = 0;
            displayUpperScreen.push(allNumbers[0]);
            displayUpperScreen.push(operator.innerHTML);
            allNumbers.splice(0, allNumbers.length);
            allOperators.splice(0, allOperators.length);
            numberEntered = false;
            resultExists = false;
            document.querySelector(".screen-bottom").innerHTML = "";
            updateUpperScreen();
        }        
    });
});

let allNumbers = [];
let allOperators = [];
let resultExists = false;
document.querySelector(".equalbutton").addEventListener("click", () => {
    if (numberEntered === true) {
        if ((displayUpperScreen.map((e) => (e)).join("")).includes("÷0")) {
            document.querySelector(".screen-bottom").innerHTML = "When we try to divide by zero, things stop making sense"
            displayUpperScreen.length = 0;
            updateUpperScreen();
            numberEntered = false;
            return;
        }
        let temp = "";
        // evaluates the upperScreen Array and sorts numbers and operators in separate Arrays
        for (let i = 0; i < displayUpperScreen.length; i++) {
            if (displayUpperScreen[i] != "+" &&  displayUpperScreen[i] != "-" && displayUpperScreen[i] != "*" && displayUpperScreen[i] != "÷") {
                temp += displayUpperScreen[i];
            }
            else {
                allOperators.push(displayUpperScreen[i]);
                allNumbers.push(parseInt(temp)); 
                temp = "";
            }
        }
        allNumbers.push(parseInt(temp)); 
        // handles order of operation by operating them first and only leaving + and - operators
        function createSumArray() {
            if (allOperators.includes("*")) {
                let index = allOperators.indexOf("*");
                let result = operate(allNumbers[index], allNumbers[index + 1], "*")
                allNumbers[index] = result;
                allNumbers.splice(index + 1, 1);
                allOperators.splice(index, 1)
                createSumArray();
            }
            else if (allOperators.includes("÷")) {
                let index = allOperators.indexOf("÷");
                let result = operate(allNumbers[index], allNumbers[index + 1], "÷")
                allNumbers[index] = result;
                allNumbers.splice(index + 1, 1);
                allOperators.splice(index, 1);
                createSumArray();
            }
        }
        createSumArray();
        function computeSum() {
            if (allNumbers.length > 1) {
                allNumbers[0] = operate(allNumbers[0],allNumbers[allNumbers.length - 1],allOperators[allOperators.length - 1]);
                allNumbers.pop();
                allOperators.pop();
                computeSum();
            }
        }
        computeSum();
        document.querySelector(".screen-top").innerHTML += "=";
        document.querySelector(".screen-bottom").innerHTML = allNumbers[0];
        resultExists = true;    
    }
})
document.querySelector(".clearbutton").addEventListener("click", () => {
    allNumbers.length = 0;
    allOperators.length = 0;
    displayUpperScreen.length = 0;
    document.querySelector(".screen-top").innerHTML = "";
    document.querySelector(".screen-bottom").innerHTML = "";
    resultExists = false;
    numberEntered = false;
})