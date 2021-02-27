// queryselector all the html elements needed
let randomCountryElement = document.querySelector('#random-country') 
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')

// TODO display the country's name in the randomCountryElement:
//select random number within the range of the countriesandcodes array length to be the random element of the countriesandcodes array
// initialize random country number variable
let randomCountryNumber = Math.floor(Math.random()*(countriesAndCodes.length))
//set the random country html text to the country name of that element number
randomCountryElement.innerHTML = countriesAndCodes[randomCountryNumber].name

//put focus on the user answer element for the user to be able to immediately type in their answer
userAnswerElement.focus()

//added enter for click option for submit button
document.addEventListener('keyup', function() { 
    if (event.keyCode == 13) {
        submitButton.click()
    }
})

// console.log(countriesAndCodes[randomCountryNumber]["alpha-2"])

//event listener for submit answer button
submitButton.addEventListener('click', function(){
    //get value from user answer
    let userAnswer = userAnswerElement.value
    //set the url based on the 2 letter country code from the countries.js array
    let url = `https://api.worldbank.org/v2/country/${countriesAndCodes[randomCountryNumber]["alpha-2"]}?format=json`
    fetch(url) //fetch the url
    .then(response => response.json())
    .then( json => {
        // console.log(json)
        // get the answer from the json results from the world bank api
        let answer = json[1][0].capitalCity
        // make sure correct answers don't get counted as incorrect at least because of case sensitivity
        if (userAnswer.toUpperCase() == answer.toUpperCase()) {
            //if they get it correct, show the result text element with the correct answer
            resultTextElement.innerHTML = `Correct! ${answer} is the capital of ${countriesAndCodes[randomCountryNumber].name}`
            //remove the bootstrap red text class and add the green text color class because it's correct
            resultTextElement.classList.remove('text-danger')
            resultTextElement.classList.add('text-success')
        } else {
            //incorrect answer message displayed back in red by removing green text-success 
            //(if applicable - seems to work whether you get the answer wrong first or right first)
            resultTextElement.innerHTML = `Sorry, the correct answer is ${answer}`
            resultTextElement.classList.remove('text-success')
            resultTextElement.classList.add('text-danger')
        }
    })
    .catch(error => {    // handle errors that occur when requesting data or processing the response
        console.log(error)
        alert('Error fetching data from the World Bank API')

})

})

//play again button eventlistener
playAgainButton.addEventListener('click', function(){
    //refocus on the user answer element for their next turn
    userAnswerElement.focus()
    //clear the user answer
    userAnswerElement.value = ''
    //clear the result text from the previous game
    resultTextElement.innerHTML = ''
    //select another random number from the length of the list of countries
    randomCountryNumber = Math.floor(Math.random()*(countriesAndCodes.length))
    //put the new country picked in the random country element for the new turn
    randomCountryElement.innerHTML = countriesAndCodes[randomCountryNumber].name
})




// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 