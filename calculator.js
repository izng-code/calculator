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
        if (resultExists === true) {
            displayUpperScreen.length = 0;
            displayUpperScreen.push(allNumbers[0]);
            displayUpperScreen.push(operator.innerHTML);
            allNumbers.splice(0, allNumbers.length);
            allOperators.splice(0, allOperators.length);
            numberEntered = false;
            resultExists = false;
            updateUpperScreen();
        }        
    });
});

let allNumbers = [];
let allOperators = [];
let resultExists = false;
document.querySelector(".equalbutton").addEventListener("click", () => {
    if (numberEntered === true) {
        let temp = "";
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
