const calcScreen = document.querySelector("#results");
const clear = document.querySelector("#clear");
const calculate = document.querySelector("#calculate"); //action
clear.onclick = () => {
  while (calcScreen.firstChild) {
    calcScreen.removeChild(calcScreen.firstChild);
  }
};
calculate.onclick = () => {
  let operatorSelect = document.querySelector("#operator"); //select
  let operator = operatorSelect.options[operatorSelect.selectedIndex].value;
  let a = parseFloat(document.querySelector("#firstnumber").value); //input
  let b = parseFloat(document.querySelector("#secondnumber").value); //input
  let rounding = document.querySelector("#doround").checked; //checkbox
  switch (operator) {
    case "add":
      result = a + b;
      break;
    case "sub":
      result = a - b;
      break;
    case "mul":
      result = a * b;
      break;
    case "div":
      result = a / b;
      break;
  }
  if (rounding == true) {
    let decimals = parseFloat(document.querySelector("#decimals").value); // select
    result = result.toFixed(decimals);
  }
  document.querySelector("#firstnumber").value = result;
  let number = document.createElement("LI");
  value = document.createTextNode(result);
  number.appendChild(value);
  calcScreen.appendChild(number);
  number.scrollIntoView();
};
