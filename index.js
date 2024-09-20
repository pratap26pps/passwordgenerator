// fetch by custom attribute

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const stmbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatorBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type-checkbox]");
const symbols = '!@#$%^&*()+":?><|~`,./;[]=-'; 


 //dafault value
let password ="";
let passwordLength=10;

 let checkCount=0;

// call a function
handleSlider();


// set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

// set indicator
function setIndicator (color){
    indicator.Style.backgroundColor = color;
}
function getRandomInteger (min,max){
  return Math.floor(Math.random()*(max-min)) + min;
    
}
function generateRandomNumber(){
   return getRandomInteger(0,9);
}

function generatelowercase(){
    
  return String.fromCharCode( getRandomInteger(97,123))
   
}

function generateuppercase(){
    return String.fromCharCode( getRandomInteger(65,91))
}

function generatesymbol(){
    const Rndnum = getRandomInteger(0,symbols.length)
    return symbols.charAt(Rndnum);  
}

function calcStrength(){
    let hasupper =false;
    let haslower =false;
    let hassym =false;
    let hasnum =false;

    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(symbols.checked) hassym=true;
    if(numbers.checked) hasnum=true;

    if (hasupper && haslower && (hassym || hasnum) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if(hasupper && haslower && (hassym || hasnum) && passwordLength >=6){
        setIndicator("0ff");
    }
    else{
        setIndicator("00f");
    }

}

async function copyContent() {

    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="copied";
    }
    catch(e){
      copyMsg.innerText ="failed";
    }
// to make copy wala visible
    copyMsg.classList.add("active")

    setTimeout (()=>{
        copyMsg.classList.remove("active");
    },600);
   
}

// function shufflePassword(Array){
//     // fisher yates method
//     for(let i=Array.length -1;i>0;i--){
//        // random index value of j
//         const j=Math.floor(Math.random()*(i+1));
//         //swaping
//         const temp=Array[i];
//         Array[i]=Array[j];
//         Array[j]=temp;
//     }
//     let str ="";
//     Array.forEach((el) =>(str+=el));
//     return str;
// }

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((CheckBox)=>{
        if(CheckBox.checked)
            checkCount ++;
    });
}

// special condition
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}

allCheckBox.forEach((CheckBox) => {
    CheckBox.addEventListener('change',handleCheckBoxChange);
});


inputSlider.addEventListener('input',(e) =>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
    
})

generatorBtn.addEventListener('click',()=>{
    
// none of the checkbox are selected
//  if(CheckBox ==0)
//      return;
 
//special case
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}

// let's start the journey to find new password
console.log("starting the journey");
// to remove old password
password ="";

// let's put the stuff mentioned by checkboxes

// if(uppercaseCheck.checked){
//     password += generateuppercase();
// }
// if(lowercaseCheck.checked){
//     password += generatelowercase();
// }
// if(numbersCheck.checked){
//     password += generateRandomNumber();
// }
// if(symbols.checked){
//     password += generatesymbol();
// }
// if(uppercaseCheck.checked){
//     password += generateuppercase();
// }


//another method used by array
let funcArr = [];
if (uppercaseCheck.checked)
    funcArr.push(generateuppercase);

if (uppercaseCheck.checked)
    funcArr.push(generatelowercase);

if (uppercaseCheck.checked)
    funcArr.push(generateRandomNumber);

if (stmbolsCheck.checked)
    funcArr.push(generatesymbol);
// compulsary addidion
  console.log("checked  is done")

for(let i=0;i<funcArr.length;i++){
    password += funcArr[i]();
}
console.log("compulsary addition done");
// remaining addition
for (let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex= getRandomInteger(0,funcArr.length);
    password +=funcArr[randIndex]();
}
console.log("remaining addition done");

// shuffle the password
 //password=shufflePassword();

console.log("shuffle password done");
// showin ui
passwordDisplay.value=password;
console.log("ui display done");
// calculate strength
 calcStrength();

});