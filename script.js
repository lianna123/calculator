document.getElementById("text").innerHTML = "0";
let equation = document.getElementById("text").innerHTML;
let x = 0;
const stack = [], postfix = [];
let pointer = 0, digits = 0;

function move(equation) {
  document.getElementById("text").innerHTML = equation.slice(-11);
}

function pemdas() {
  for (let i = 0; i < equation.length; i++) {
    if (digits - 1 > 0) {
      digits--;
      continue;
    }
    if (equation.charAt(i) == "(") {
      stack.push(equation.charAt(i));
    } else if (equation.charAt(i) == "+" || equation.charAt(i) == "-") {
      if (stack[stack.length - 1] == "(" || stack.length == 0) {
        stack.push(equation.charAt(i));
      } else {
        for (let j = 0; j < equation.length; j++) {
          if (equation.charAt(j) != "(") {
            let temp = stack[stack.length - 1];
            stack.pop();
            postfix.push(temp);
          }
          break;
        }
        stack.push(equation.charAt(i));
      }
    } else if (equation.charAt(i) == "×" || equation.charAt(i) == "÷") {
      let condition = stack[stack.length - 1] == "(" || stack[stack.length 
- 1] == "+";
      condition = condition || stack[stack.length - 1] == "-";
      if (condition || stack.length == 0) {
        stack.push(equation.charAt(i));
      } else {
        for (let j = 0; j < equation.length; j++) {
          if (equation.charAt(j) != "(" || equation.charAt(j) != "+" || 
equation.charAt(j) != "-") {
            let temp = stack[stack.length - 1];
            stack.pop();
            postfix.push(temp);
          }
          break;
        }
        stack.push(equation.charAt(i));
      }
    } else if (equation.charAt(i) == "^") {
      if (!(stack[stack.length - 1] != "^" && stack.length != 0)) {
        stack.push(equation.charAt(i));
      } else {
        for (let j = 0; j < equation.length; j++) {
          if (equation.charAt(j) == "^") {
            let temp = stack[stack.length - 1];
            stack.pop();
            postfix.push(temp);
          }
          break;
        }
        stack.push(equation.charAt(i));
      }
    } else if (equation.charAt(i) == ")") {
      while (stack[stack.length - 1] != "(") {
        let temp = stack[stack.length - 1];
        stack.pop();
        postfix.push(temp);
      }
      stack.pop();
    } else {
      digits = 0;
      let temp = "";
      for (let j = i; j < equation.length; j++) {
        if (!isNaN(equation.charAt(j))) {
          temp += equation.charAt(j);
          digits++;
        } else {
          break;
        }
      }
      postfix.push(parseFloat(temp));
    }
  }
  while (stack.length != 0) {
    let temp = stack[stack.length - 1];
    stack.pop();
    postfix.push(temp);
  }
}

function left() {
  pointer++;
  let temp = equation.slice(0, equation.length - pointer);
  if (temp.length >= 11) {
    move(temp);
  } else {
    pointer--;
  }
}

function right() {
  pointer--;
  if (pointer >= 0) {
    let temp = equation.slice(0, equation.length - pointer);
    move(temp);
  }
}

function num(n) {
  pointer = 0;
  if (equation == "0") {
    document.getElementById("text").innerHTML = n.toString();
    equation = document.getElementById("text").innerHTML;
  } else {
    document.getElementById("text").innerHTML = equation + n.toString();
    equation = document.getElementById("text").innerHTML;
  }
  move(equation);
}

function parenth(n) {
   pointer = 0;
  if (equation == "0") {
    document.getElementById("text").innerHTML = n;
    equation = document.getElementById("text").innerHTML;
  } else {
    document.getElementById("text").innerHTML = equation + n;
    equation = document.getElementById("text").innerHTML;
  }
  move(equation);
}

function deci() {
  pointer = 0;
  document.getElementById("text").innerHTML = equation + ".";
  equation = document.getElementById("text").innerHTML;
  move(equation);
}

function opp(sign) {
  pointer = 0;
  if (equation == "0" && sign == "-") {
    document.getElementById("text").innerHTML = sign;
  } else {
    document.getElementById("text").innerHTML = equation + sign;
  }
  equation = document.getElementById("text").innerHTML;
  move(equation);
}

function equi() {
  pointer = 0;
  let neweq = equation;
  let count = 0;
  if (equation.charAt(0) == "-") {
    count++;
    for (let j = 1; j < equation.length; j++) {
      if (isNaN(equation.charAt(j))) {
        neweq = "(0" + equation.slice(0, j) + ")" + equation.slice(j);
        break;
      }
    }
  }
  for (let i = 2; i < equation.length; i++) {
    if (equation.charAt(i) == "-" && isNaN(equation.charAt(i - 1))) {
      for (let j = i + 1; j < equation.length; j++) {
        if (isNaN(equation.charAt(j)) || j == equation.length - 1) {
          if (j == equation.length - 1) {
            j++;
          }
          neweq = neweq.slice(0, i + (3 * count)) + "(0" + 
equation.slice(i, j) + ")" + equation.slice(j);
          break;
        }
      }
      count++;
    }
  }
  equation = neweq;
  pemdas();
  const solve = [];
  for (let i = 0; i < postfix.length; i++) {
    if (isNaN(postfix[i])) {
      if (postfix[i] == "+") {
        let temp = solve[solve.length - 2] + solve[solve.length - 1];
        solve.pop(); solve.pop();
        solve.push(temp);
      } else if (postfix[i] == "-") {
        let temp = solve[solve.length - 2] - solve[solve.length - 1];
        solve.pop(); solve.pop();
        solve.push(temp);
      } else if (postfix[i] == "×") {
        let temp = solve[solve.length - 2] * solve[solve.length - 1];
        solve.pop(); solve.pop();
        solve.push(temp);
      } else if (postfix[i] == "÷") {
        let temp = solve[solve.length - 2] / solve[solve.length - 1];
        solve.pop(); solve.pop();
        solve.push(temp);
      } else if (postfix[i] == "^") {
        let temp = 1;
        for (let j = 0; j < solve[solve.length - 1]; j++) {
          temp *= solve[solve.length - 2];
        }
        solve.pop(); solve.pop();
        solve.push(temp);
      }
    } else {
      solve.push(postfix[i]);
    }
  }
  let res = solve[0].toString();
  document.getElementById("text").innerHTML = res;
  equation = document.getElementById("text").innerHTML;
  postfix.length = 0;
  stack.length = 0;
  solve.length = 0;
  digits = 0;
  move(equation);
}

function dele() {
  pointer = 0;
  document.getElementById("text").innerHTML = equation.slice(0, 
equation.length - 1);
  equation = document.getElementById("text").innerHTML;
  move(equation);
  if (equation == "") {
    document.getElementById("text").innerHTML = "0";
    equation = document.getElementById("text").innerHTML;
  }
}
