let inputMain = document.querySelector('.values');
let inputReserve = document.querySelector('.reserve');
let op;
let currNumber;
let result = null;
let mathOpCount = 0;
let makeCalc = false;
let makeCalcPer = false;
let baseNumber = 0;

function press(item) {
  console.log(makeCalc);
  if (inputMain.textContent == '0') {
    if (item == '.') {
      inputMain.textContent = '0.';
      return;
    }
    inputMain.textContent = '';
  }
  if (mathOpCount == 0) {
    if (!inputMain.textContent.includes('.')) {
      inputMain.textContent += item;
    } else {
      if (item !== '.') {
        inputMain.textContent += item;
      }
    }
  } else {
    inputMain.textContent = '';
    if (op !== '=') {
      makeCalc = true;
      baseNumber = 0;
    }
    if (item == '.') {
      inputMain.textContent = '0.';
      mathOpCount = 0;
      return
    }
    inputMain.textContent += item;
    mathOpCount = 0;
    return;
  }
}

// buttons operators
function pressOperator(operador) {
  // set operator, missing number
  if (inputMain.textContent == "0" && result == null) {
    if (operador == '1/x') {
      inputReserve.textContent = '1/(0)'
      inputMain.textContent = 'Infinity';
    } else if (operador == 'x²') {
      inputReserve.textContent = 'sqr(0)'
    } else if (operador == 'rx') {
      inputReserve.textContent = `√(0)`
    } else if (operador == '%') {
      inputReserve.textContent = `0`
    } else {
      inputReserve.textContent = `0 ${operador}`;
    }
    return;
  }

  // switch case
  switch (operador) {
    case '%':
      percentage();
      break;
    case '1/x':
      for1();
      break;
    case 'x²':
      pow();
      break;
    case 'rx':
      sqrt();
      break;
    case '/':
      if (!makeCalc) {
        upNumber(operador);
      } else {
        calculate()
      }
      break;
    case '*':
      if (!makeCalc) {
        upNumber(operador);
      } else {
        calculate()
      }
      break;
    case '-':
      if (!makeCalc) {
        upNumber(operador);
      } else {
        calculate();
      }
      break;
    case '+':
      if (!makeCalc) {
        upNumber(operador);
      } else {
        calculate();
      }
      break;
    case '=':
      if (!makeCalc && baseNumber == 0) {
        upNumber(operador);
      } else {
        resolve();
      }
      break;
  }
}


// function calc simple sum, sub, multiplication and division
function calculate() {
  console.log('basenumber' + baseNumber);
  console.log('currNumber' + currNumber);
  if (!makeCalcPer) {
    if (baseNumber == 0) {
      baseNumber = parseFloat(inputMain.textContent);
    }
    result = eval(inputReserve.textContent + inputMain.textContent);
    inputReserve.textContent = `${result} ${op}`
    inputMain.textContent = `${result}`;
    makeCalc = false;
    mathOpCount = 1;
  } else {
    result = eval(inputReserve.textContent);
    inputReserve.textContent = `${result} ${op}`
    inputMain.textContent = `${result}`;
    makeCalc = false;
    mathOpCount = 1;
    makeCalcPer = false;
  }
}

// Function for operator =
const resolve = () => {
  if (baseNumber > 0) {
    result = eval(`${result}${op}${baseNumber}`);
    inputReserve.textContent = `${result} ${op} ${baseNumber} =`
    inputMain.textContent = `${result}`;
    makeCalc = false;
    mathOpCount = 1;
  } else {
    if (baseNumber == 0) {
      baseNumber = parseFloat(inputMain.textContent);
    }
    result = eval(inputReserve.textContent + inputMain.textContent);
    inputReserve.textContent = `${currNumber} ${op} ${baseNumber} =`
    inputMain.textContent = `${result}`;
    makeCalc = false;
    mathOpCount = 1;
  }
}

// reserve numbers
function upNumber(operador) {
  if (!makeCalc) {
    console.log(operador)
    op = operador;
    currNumber = inputMain.textContent;
    inputReserve.textContent = `${inputMain.textContent} ${operador}`
    mathOpCount = 1;
  }
}


function sqrt() {
  currNumber = inputMain.textContent;
  result = Math.sqrt(parseFloat(inputMain.textContent));
  inputReserve.textContent = `√(${currNumber})`;
  inputMain.textContent = result;
  mathOpCount = 1;
}

function pow() {
  currNumber = inputMain.textContent;
  result = Math.pow(parseFloat(inputMain.textContent), 2);
  inputReserve.textContent = `sqr(${currNumber})`;
  inputMain.textContent = result;
  mathOpCount = 1;
}

function for1() {
  currNumber = inputMain.textContent;
  inputReserve.textContent = `1/(${currNumber})`
  inputMain.textContent = 1 / currNumber;
  mathOpCount = 1;
}

function invert() {
  currNumber = parseFloat(inputMain.textContent);
  if (currNumber >= 0) {
    currNumber = -Math.abs(parseFloat(inputMain.textContent));
    console.log(currNumber);
    inputMain.textContent = currNumber;
  } else {
    currNumber = Math.abs(parseFloat(inputMain.textContent));
    console.log(currNumber);
    inputMain.textContent = currNumber;
  }
}

function eraseLast() {
  currNumber = inputMain.textContent;
  currNumber = currNumber.slice(0, -1);
  inputMain.textContent = currNumber;
}

function eraseCe() {
  inputMain.textContent = '0';
}

function erase() {
  inputMain.textContent = '0'
  inputReserve.textContent = '';
  op = null;
  mathOpCount = 0;
  baseNumber = 0;
  makeCalc = false;
}

function percentage() {
  if (op === '+' || op === "-") {
    lastNumber = currNumber;
    currNumber = parseFloat(inputMain.textContent);
    currNumber = (lastNumber / 100) * currNumber;
    inputReserve.textContent = `${lastNumber} ${op} ${currNumber}`
    inputMain.textContent = currNumber;
    makeCalcPer = true;
  } else if (op === '*' || op === '/') {
    lastNumber = currNumber;
    currNumber = parseFloat(inputMain.textContent);
    currNumber = (currNumber / 100);
    inputReserve.textContent = `${lastNumber} ${op} ${currNumber}`
    inputMain.textContent = currNumber;
    makeCalcPer = true;
  }
}
