let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement = document.querySelector("#user-answer");
let submitButton = document.querySelector("#submit-answer");
let resultTextElement = document.querySelector('#result');
let playAgain = document.querySelector('#play-again');

let first = true;

// TODO when the page loads, select an element at random from the countriesAndCodes array
//  This array is defined in the countries.js file. Your browser treats all
//  JavaScript files as one big file, organized in the order of the script tags
//  so countriesAndCodes is available to this file
let rContIndex = 0;

let generateIndex = function(first){
    if(first===true){
        // Solution courtesy of Stack Overflow
        rContIndex = Math.floor(Math.random()*countriesAndCodes.length);
        first=false;
    }
    return rContIndex;
};

let loadCountry = function (first) {
    let rContIndex = generateIndex(first);
    let randCont = countriesAndCodes[rContIndex].name;
    randomCountryElement.innerHTML = randCont;
    return rContIndex;
};

loadCountry();


// console.log(countriesAndCodes);  // You don't need to log countriesAndCodes - just proving it is available

// TODO display the country's name in the randomCountryElement

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement
//  * Use fetch() to make a call to the World Bank API with the country code (from countriesAndCodes)
//  * Extract the capital city from the World Bank API response
//  * Compare it to the user's answer.
//      You can decide how correct you require the user to be. A basic solution requires
//      the user's answer to be exactly the same as the World Bank answer. If you want
//      to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Display an appropriate result in the resultTextElement.
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

let loadInfo = function(){
    let rContIndex = loadCountry();
    console.log(rContIndex);
    let contCode = countriesAndCodes[rContIndex]["alpha-2"];
    let url = 'http://api.worldbank.org/v2/country/'+contCode+'?format=json';
    return url
};

submitButton.addEventListener('click',function () {
    let text = userAnswerElement.value;
    let url = loadInfo();
    fetch(url)
        .then(res =>res.json())
        .then(contData =>{
            console.log(contData);
            if(contData.length===2){
                let capital = contData[1][0].capitalCity;
                console.log(capital);
                if (text===capital){
                    resultTextElement.innerHTML = 'Correct!'
                }else {
                    resultTextElement.innerHTML='Sorry. Try again :C'
                }
            }else{
                resultTextElement.innerHTML = 'This country is not recognized by the' +
                    ' world bank. Please press Play Again'
            }
        })
        .catch(err=>{
            console.log(err)
        })
});
playAgain.addEventListener('click',function () {
    first = true;
    loadCountry(first);
    clear();
});

let clear = function () {
    userAnswerElement.value = '';
    resultTextElement.innerHTML = '';

};