const inputBox = document.getElementById('inputbox');
let currentNumber = "";
let previousNumber = "";
let operator = null;

// Function to update the display with the entered number
function updateDisplay(number) {
  currentNumber += number;
  inputBox.value = currentNumber;
}

// Function to clear the calculator
function clearCalculator() {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  inputBox.value = "0";
}

// Function to handle operator clicks
function handleOperator(op) {
  if (operator === null) {
    previousNumber = currentNumber;
    currentNumber = "";
  } else {
    calculate();
  }
  operator = op;
}

// Function to perform calculations based on the chosen operator
function calculate() {
  let result = 0;
  const prevNum = parseFloat(previousNumber);
  const currentNum = parseFloat(currentNumber);
  switch (operator) {
    case "+":
      result = prevNum + currentNum;
      break;
    case "-":
      result = prevNum - currentNum;
      break;
    case "*":
      result = prevNum * currentNum;
      break;
    case "/":
      if (currentNum === 0) {
        alert("Error: Cannot divide by zero!");
        return;  // Exit the function if division by zero
      }
      result = prevNum / currentNum;
      break;
    default:
      return;  // Do nothing if no valid operator
  }
  previousNumber = "";
  currentNumber = result.toString();
  inputBox.value = currentNumber;
  operator = null;
}

// Add click event listeners to all buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (value === "AC") {
      clearCalculator();
    } else if (value === "DEL") {
      currentNumber = currentNumber.slice(0, -1);  // Remove last digit
      inputBox.value = currentNumber;
    } else if (value === "=") {
      calculate();
    } else if (isNaN(value)) {
      handleOperator(value);
    } else {
      updateDisplay(value);
    }
  });
});
