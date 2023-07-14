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

let numberOne;
let numberTwo;
let operator;

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
    let displayTextTop = displayUpperScreen.map( (e) => (e)).join("");
    document.querySelector(".screen-top").innerHTML = displayTextTop;
}
let buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        displayUpperScreen.push(button.innerHTML);
        updateUpperScreen();
    });
});