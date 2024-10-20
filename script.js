const btns = document.querySelectorAll('button');
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const screen = document.querySelector("h1");
const operators = document.querySelectorAll(".operator");

let screenDisplay = '';
let haveDecimal = false;
let equation = '';
let operatorArray = ["+", "-", "×", "÷"];

//show the value on screen and validate the decimal number
function createANumber (number){
    let lastChar = screenDisplay.slice(-1);
    if(operatorArray.includes(lastChar) && operatorArray.includes(number)){
        return
    } 
    if (number == 0 && operatorArray.includes(lastChar)){
        return
    }

    if (screen.textContent === 0){
        screenDisplay = number;
    }else if ( haveDecimal == true && number == ".") {
        return
    } 
    else {
        screenDisplay += number;
    }

    if (number == "."){
        haveDecimal = true;
    }
    
    screen.textContent = screenDisplay;
    equation = screenDisplay;
}


//transforming the equation into the one that is ready to calculate
function transformingOprator(){    
    let firstCharEqu = equation[0];
    let lastCharEqu = equation.slice(-1);
    if (firstCharEqu == operatorArray[2] || firstCharEqu == operatorArray[3]){
        equation = equation.slice(1);
    }
    
    if (operatorArray.includes(lastCharEqu)){
        equation = equation.slice(0, -1);
    }

    equation = equation.replace(/×/g, '*').replace(/÷/g, '/');    
    return equation
}

//reset the decimal value 
function resetNum(){
    haveDecimal = false;
    
}

//reset all 
function reset() {
    screen.textContent = 0;
    screenDisplay = '';
    haveDecimal = false;
    equation = '';
    
}

//calculate the textContent
function calculate () {
    screen.textContent = eval(transformingOprator());
    screenDisplay = '';
    haveDecimal = false;
    equation = ''; 
}



btns.forEach(btn=>{
    btn.addEventListener("click", ()=>createANumber(btn.value))
})

operators.forEach(operator => {
    operator.addEventListener("click", ()=> resetNum())
})

clear.addEventListener("click",() => reset())

equal.addEventListener("click", () => calculate())


