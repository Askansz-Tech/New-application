let previous = "";
let current = "";
let operator = "";
let display = "";
let result = "";
let pos = "";

function one() {
    current += "1";
    display += "1";
    document.getElementById("inputField").value = display;
}

function two() {
    current += "2";
    display += "2";
    document.getElementById("inputField").value = display;
}

function three() {
    current += "3";
    display += "3";
    document.getElementById("inputField").value = display;
}

function four() {
    current += "4";
    display += "4";
    document.getElementById("inputField").value = display;
}

function five() {
    current += "5";
    display += "5";
    document.getElementById("inputField").value = display;
}

function six() {
    current += "6";
    display += "6";
    document.getElementById("inputField").value = display;
}

function seven() {
    current += "7";
    display += "7";
    document.getElementById("inputField").value = display;
}

function eight() {
    current += "8";
    display += "8";
    document.getElementById("inputField").value = display;
}

function nine() {
    current += "9";
    display += "9";
    document.getElementById("inputField").value = display;
}

function clear() {
    document.getElementById("inputField").value = "";
    current = "";
    previous = "";
    operator = "";
    display = "";
    pos = "";
}

function zero() {
    current += "0";
    display += "0";
    document.getElementById("inputField").value = display;
}

function plus() {
    previous = current;
    operator = "+";
    display += "+";
    document.getElementById("inputField").value = display;
    current = "";
}

function minus() {
    previous = current;
    operator = "-";
    display += "-";
    document.getElementById("inputField").value = display;
    current = "";
}

function divide() {
    previous = current;
    operator = "/";
    display += "/";
    document.getElementById("inputField").value = display;
    current = "";
}

function times() {
    previous = current;
    operator = "x";
    display += "×";
    document.getElementById("inputField").value = display;
    current = "";
}

function powery() {
    previous = current;
    operator = "xʸ"
    document.getElementById("inputField").value = display + "xʸ";
    current = "";
}

function plusMinus() {
    if (pos !== "idk") {
        pos = "idk";
        if (current.startsWith("-")) return;
        current = "-" + current; 
        display = current; 
        document.getElementById("inputField").value = display;
    } else {
        pos = "ik";
        current = current.replace("-", ""); 
        display = current; 
        document.getElementById("inputField").value = display;
    }
}

function equal() {
    if (operator !== "x" && operator !== "/" && operator !== "-" && operator !== "+" && operator !== "xʸ") {
        window.alert("Please choose an operator first");
        previous = "";
        current = "";
        operator = "";
        result = "";
        document.getElementById("inputField").value = "";
        return;
    }

    let number1 = parseInt(previous);
    let number2 = parseInt(current);

    // CHANGED: correct negative handling for number1
    if (previous.startsWith("-")) number1 = -Math.abs(number1);
    if (current.startsWith("-")) number2 = -Math.abs(number2);

    if (operator === "+") result = number1 + number2;
    if (operator === "-") result = number1 - number2;
    if (operator === "/") result = number1 / number2;
    if (operator === "x") result = number1 * number2;
    if (operator === "xʸ") result = Math.pow(number1, number2);

    // reset after calculation
    previous = "";
    current = "";
    operator = "";

    let result100 = result * 100;
    let rounded100 = Math.round(result100)
    let roundedResult = rounded100 / 100;
    document.getElementById("inputField").value += "=" + roundedResult;
}

document.getElementById("1").addEventListener("click", one)
document.getElementById("2").addEventListener("click", two)
document.getElementById("3").addEventListener("click", three)
document.getElementById("4").addEventListener("click", four)
document.getElementById("5").addEventListener("click", five)
document.getElementById("6").addEventListener("click", six)
document.getElementById("7").addEventListener("click", seven)
document.getElementById("8").addEventListener("click", eight)
document.getElementById("9").addEventListener("click", nine)
document.getElementById("c").addEventListener("click", clear)
document.getElementById("0").addEventListener("click", zero)
document.getElementById("=").addEventListener("click", equal)
document.getElementById("+").addEventListener("click", plus)
document.getElementById("-").addEventListener("click", minus)
document.getElementById("/").addEventListener("click", divide)
document.getElementById("x").addEventListener("click", times)
document.getElementById("py").addEventListener("click", powery)
document.getElementById("+-").addEventListener("click", plusMinus)
