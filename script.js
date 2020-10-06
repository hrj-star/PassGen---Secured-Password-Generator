
console.clear();
// set slider properties
const sliderProps = {
	fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
};

// length dependent on slider
const slider = document.querySelector(".slider");

// get value of the range slider.
const sliderValue = document.querySelector(".length__title");


slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	applyFill(event.target);
});

applyFill(slider.querySelector("input"));

function applyFill(slider) {
	const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
	const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
			0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}

// objects for password settings
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

// random pasword generation
function secureMathRandom() {
	return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
}

// password generator functions

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = '~!@#$%^&*()_+{}":?><;.,';
	return symbols[Math.floor(Math.random() * symbols.length)];
}

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
const strengthBtn = document.getElementById("strength-btn");
const resultContainer = document.querySelector(".result");
const strengthresult = document.getElementById("results");

let generatedPassword = false;
let resultContainerBound = {
	left: resultContainer.getBoundingClientRect().left,
	top: resultContainer.getBoundingClientRect().top,
};
window.addEventListener("resize", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
});

// clipboard copy
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;
	if (!password || password == "CLICK GENERATE") {
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

  const successful = document.execCommand('copy');
    if(successful){
      copyBtn.innerHTML = ' Copied ! ';
      generateBtn.addEventListener('click', () => {
      copyBtn.innerHTML=" Copy Secured Password"
      })
    } else {
      copyBtn.innerHTML = ' Unable to copy! ';  
    }
});

// when clicking on generate password 
generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;
	generatedPassword = true;
	resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
  strengthtext=checkStrength(resultEl.innerText);
  strengthresult.innerText=strengthtext;
});


// password generator function

function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	if (typesCount === 0) {
		return '';
    
	}
	for (let i = 0; i < length; i++) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length)
									.split('').sort(() => Math.random() - 0.5)
									.join('');
}

// Password Strength Validation logic
    var results = document.getElementById("strength");
    function checkStrength(password){
    //initial strength
    var strength = 0
    var msg="Password Strength : "
    if (password.length == 0) {
        return ''
    }
    //if the password length is less than 6, return message - too weak.
    if (password.length < 6) {
        return msg+'Too Weak'
    }
 
    //if length is 8 characters or more, strength++
    if (password.length > 7) strength += 1
 
    //if password contains both lower and uppercase characters, strength++
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1
 
    //if it has numbers and characters,strength++
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 
 
    //if it has one special character, strength++
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1
 
    //if it has two special characters, strength++
    if (password.match(/(.*[~!@#$%^&*()_+{}":?><;.,].*[~!@#$%^&*()_+{}":?><;.,])/)) strength += 1
 
    //if value is less than 2
    if (strength < 2) {
        
        return msg+'Weak'
    } else if (strength == 2 ) {
        
        return msg+'Good'
    } else {
        
        return msg+'Strong'
    }
}