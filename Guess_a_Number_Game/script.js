/* The JavaScript handles the logic of the game. It generates a random number between 1 and 100, keeps track of the number of attempts, 
       and provides feedback based on whether the guess is too high, too low, or correct. */

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// The checkGuess function is called when the user clicks the "Guess" button, and it updates the result based on the user's input.
function checkGuess() {
  let userGuess = document.getElementById("userGuess").value;
  let result = document.getElementById("result");
  let attemptsDisplay = document.getElementById("attempts");

  if (userGuess === "") {
    result.innerHTML = "Please, enter a number!";
    result.style.color = "black";
    return;
  }

  if ((userGuess < 1) || (userGuess > 100)) {
    result.innerHTML = "It looks like you guessed " + userGuess + 
    ", but the number I picked is between 1 and 100. Try again with a guess in that range!";
    result.style.color = "black";
    return;
  }

  userGuess = parseInt(userGuess);
  attempts++;

  if (userGuess === randomNumber) {
    result.innerHTML = "Congratulations! Your guess is correct. The number I picked is " + userGuess + ". Well done!";
    result.style.color = "green";
  } else if (userGuess < randomNumber) {
    result.innerHTML = "The number I picked is higher than " + userGuess + ". Try again!";
    result.style.color = "red";
  } else {
    result.innerHTML = "The number I picked is lower than " + userGuess + ". Try again!";
    result.style.color = "red";
  }

  attemptsDisplay.innerHTML = "Attempts: " + attempts;
}

//The resetGame function is called when the user clicks the "Start Over" button, resetting the game state.
function resetGame() {
  attempts = 0;
  document.getElementById("userGuess").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("attempts").innerHTML = "Attempts: 0";
}