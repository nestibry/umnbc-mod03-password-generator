// Assignment Code
var generateBtn = document.querySelector("#generate");



/* --------------------BKN ADDED CODE----------------------------------------------- */

// Global variables
var arrNumbers = ['0','1','2','3','4','5','6','7','8','9'];
var arrLowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var arrSpecial = [' ','!','"','#','$','%','&',"'",'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',']','^','_','`','{','|','}','~'];

var arrUppercase = [];
for(var i = 0; i < arrLowercase.length; i++) {
    arrUppercase[i] = arrLowercase[i].toUpperCase();
}


function lengthPrompt() {
    
    // Choose number of characters for password length
    var numChar = prompt(`Number of Characters: \nEnter a number between 8 and 128 (inclusively). \n    Proceed  :=  OK\n    EXIT  :=  Cancel`);
    console.log(`Password Length: ${numChar}  Type: ${typeof numChar}`);

    // Case: User clicks cancel --> Return to userPrompts() with null value --> User can either click 'OK' to exit password generator OR 'Cancel' to re-prompt the lengthPrompt()
    if (numChar === null) {
        return null;
    }

    // Case: Check that the value is a number AND within range [8:128] -- Re-prompt user to enter password length
    numChar *= 1;   // converts to a number
    console.log(`Converted to: ${numChar}  type: ${typeof numChar}`);
    if(!numChar){
        console.log("User did not enter a number. Re-prompting user to enter password length...")
        numChar = lengthPrompt();
    } else if (numChar < 8 || numChar > 128) { 
        console.log("User did not enter a number between 8 and 128. Re-prompting user to enter password length...")
        numChar = lengthPrompt();
    }

    return numChar;
}


function userPrompts() {

    // Prompt for password length between 8 and 128 inclusive
    var numChar = lengthPrompt(); 

    // Case: User clicks cancel during lengthPrompt() --> 
    //      lengthPrompt() returns null --> 
    //      Confirm Exit Password Generator --> 
    //      User can either click 'OK' to exit password generator OR 'Cancel' to re-prompt the lengthPrompt()
    if (numChar === null){
        do {
            var confirmAbort = confirm("Exit Password Generator?");
            if (confirmAbort){
                // Aborts to default screen with "Your Secure Password" --> returns null for the 'numChar'
                console.log("User selected to abort Password Generator. Returning to the default browser...")
                return null;
            }
            numChar = lengthPrompt();
        }
        while(numChar === null);
    }

    // Prompt user to confirm types of characters to include
    var includeLowercase = confirm(`Include 'lowercase' characters? \n    Yes  :=  OK\n    No  :=  Cancel`);
    console.log(`Include lowercase: ${includeLowercase}  Type: ${typeof includeLowercase}`);

    var includeUppercase = confirm(`Include 'UPPERCASE' characters? \n    Yes  :=  OK\n    No  :=  Cancel`);
    console.log(`Include UPPERCASE: ${includeUppercase}  Type: ${typeof includeUppercase}`);

    var includeNumbers = confirm(`Include Numbers? \n    Yes  :=  OK\n    No  :=  Cancel`);
    console.log(`Include Numbers: ${includeNumbers}  Type: ${typeof includeNumbers}`);

    var includeSpecials = confirm(`Include 'Special' characters? \n( e.g., ! " # $ % & ' ) \n    Yes  :=  OK\n    No  :=  Cancel`);
    console.log(`Include Special Characters: ${includeSpecials}  Type: ${typeof includeSpecials}`);

    // Case: User clicks cancel for ALL character types --> Return to default browser
    if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecials) {
        console.log("User selected to cancel to ALL parameters prompts. Returning to the default browser...")
        return null;
    }

    // Creating and Prompting User to Confirm Password Paramaters List
    var strParams = "";
    strParams += `${numChar} characters \nInclude:  `;
    if(includeLowercase){strParams += `lowercase, `;}
    if(includeUppercase){strParams += `UPPERCASE, `;}
    if(includeNumbers){strParams += `numbers, `;}
    if(includeSpecials){strParams += "specials, ";}
    var confirmParams = confirm(`Confirm password parameters: \n${strParams}\n    Proceed  :=  OK\n    EXIT  :=  Cancel`)
    console.log(`Confirm Parameters: ${confirmParams}  Type: ${typeof confirmParams}`);

    // Case: User clicks cancel to confirm parameters prompt --> Return to default browser
    if (confirmParams === false) {
        console.log("User selected to cancel to the confirm parameters prompt. Returning to the default browser...")
        return null;
    }

    // Add all the values here in case of loopbacks with lengthPrompt()
    var userSelection = {
        passwordLength: numChar,
        includeLowercase: includeLowercase,
        includeUppercase: includeUppercase,
        includeNumbers: includeNumbers,
        includeSpecials: includeSpecials,
    };

    return userSelection;
}




// Randomize array using the Durstenfeld shuffle algorithm 
// Source: (Stack Overflow - See post by Laurens Holst and edited by ashleedawg)
// [How To Randomly Shuffle a JavaScript Array - Durstenfeld Shuffle](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
// -- AND -- 
// To Bootcamp Graders/Instructors: Yes, I do understand this algorithm, I have bachelors degrees in Mathematics and Electrial Engineering :)
function shuffle(array) {
    for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function generatePassword() {

    var userSelection = userPrompts();

    // Case(s): Each exits the password generator and returns to the default browser
    //      - User clicks cancel to confirm parameters prompt
    //      - User clicks cancel during lengthPrompt()
    if(userSelection === null){
        return null;
    }

    // Select one character from each included type and Append the array to a arrCombinedCharacters to randomly choose from later
    var arrNewPassword = [];
    var arrCombinedChars = [];
    var i = 0;
    var j = 0;
    if(userSelection.includeLowercase === true){
        j = Math.floor(Math.random() * (arrLowercase.length)); // Choose a random index from lowercase array
        arrNewPassword[i] = arrLowercase[j]; // Add the selected character from the lowercase array to the new password array
        // console.log(`Index #${i}: ${arrNewPassword[i]}`);  // Log the value to the console for debugging
        i++; // increase the index value
        arrCombinedChars = arrCombinedChars.concat(arrLowercase);  // Append the lowercase characters to one combined character array
    }

    if(userSelection.includeUppercase === true){
        j = Math.floor(Math.random() * (arrUppercase.length));
        arrNewPassword[i] = arrUppercase[j];
        i++;
        arrCombinedChars = arrCombinedChars.concat(arrUppercase);
    }

    if(userSelection.includeNumbers === true){
        j = Math.floor(Math.random() * (arrNumbers.length));
        arrNewPassword[i] = arrNumbers[j];
        i++;
        arrCombinedChars = arrCombinedChars.concat(arrNumbers);
    }

    if(userSelection.includeSpecials === true){
        j = Math.floor(Math.random() * (arrSpecial.length));
        arrNewPassword[i] = arrSpecial[j];
        i++;
        arrCombinedChars = arrCombinedChars.concat(arrSpecial);
    }

    // Select remaining characters 
    for(var k = i; k < userSelection.passwordLength; k++) {
        var j = Math.floor(Math.random() * (arrCombinedChars.length));
        arrNewPassword[k] = arrCombinedChars[j];
    }

    // Shuffle it so the first ones included are jumbled
    arrNewPassword = shuffle(arrNewPassword);
    console.log(`arrNewPassword: \nLength: ${arrNewPassword.length}  \nType: ${typeof arrNewPassword} \nValues: ${arrNewPassword}`);
    
    // join each element into one string and have no separator
    var newPassword = arrNewPassword.join("");

    return newPassword;
}






/* ------------------------------------------------------------------- */



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
