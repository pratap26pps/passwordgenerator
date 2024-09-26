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
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()+":?><|~`,./;[]=-'; 


 //dafault value
let password ="";
let passwordLength=10;

 let checkCount=0;

// call a function
handleSlider();
 setIndicator("#ccc");

// set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

// set indicator

function setIndicator(color) {
    indicator.style.backgroundColor = color; // Fix 'Style' to 'style'
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

let hasUpper = uppercaseCheck.checked;
let hasLower = lowercaseCheck.checked;
let hasSym = stmbolsCheck.checked;
let hasNum = numbersCheck.checked;

 
    if (hasupper && haslower && (hassym || hasnum) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if(hasupper && haslower && (hassym || hasnum) && passwordLength >=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}

async function copyContent() {

    try{
        // writeText return promise
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

function shufflePassword(array){
    // fisher yates method
    for(let i=array.length -1;i>0;i--){
       // random index value of j
        const j=Math.floor(Math.random()*(i+1));
        //swaping
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str ="";
    array.forEach((el) =>(str+=el));
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((CheckBox)=>{
        if(CheckBox.checked)
            checkCount ++;
    });


// special condition
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}
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
 if(checkCount ===0)
     return;
    
 password ="";
 //another method used by array
let funcArr = [];



if (uppercaseCheck.checked) {
    funcArr.push(generateuppercase);
}
if (lowercaseCheck.checked) {
    funcArr.push(generatelowercase);
}
if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
}
if (stmbolsCheck.checked) {
    funcArr.push(generatesymbol);
}
//special case
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}

// let's start the journey to find new password
console.log("starting the journey");

// compulsary addidion
  console.log("checked  is done")

for(let i=0;i<funcArr.length;i++){
    password += funcArr[i]();
}
console.log("compulsary addition done");
// remaining addition
for (let i=0;i<passwordLength-funcArr.length;i++){
   
    let randIndex = getRandomInteger(0, funcArr.length);

    console.log("randIndex" + randIndex);
    password +=funcArr[randIndex]();
    
}
console.log("remaining addition done");

// shuffle the password
 password=shufflePassword(Array.from(password));

console.log("shuffle password done");
// showin ui
passwordDisplay.value=password;
console.log("ui display done");
// calculate strength
 calcStrength();

});