const words = ["learn JavaScript", "learn HTML", "learn CSS"]; // Array of possible words for the game

const game = {cur: "", solution: "", puzz: [], total: 0, attempts: 0, scorePoints: 0}; /* Game state object to track the current game status.
                                                                                          It stores:
                                                                                          1. cur: The current word being guessed.
                                                                                          2. solution: The array of letters of the current word.
                                                                                          3. puzz: The elements that represent the blanks/guesses on the screen.
                                                                                          4. total: The total number of letters left to guess (used for win condition).
                                                                                          5. attempts: The current number of incorrect guesses made. 
                                                                                          6. scorePoints: The current number of points*/

// Accessing DOM elements for score, puzzle, letters, incorrect guesses, feedback, start button and restart button
const score = document.querySelector(".score");
const puzzle = document.querySelector(".puzzle");
const letters = document.querySelector(".letters");
const hangman = document.querySelector(".hangman");
const feedback = document.querySelector(".feedback");
const btn = document.querySelector("button");
const restartBtn = document.querySelector(".restartBtn");

restartBtn.style.display = "none"; // Hide the restart button initially
restartBtn.addEventListener("click", () => location.reload()); // Reload the page to restart the game

const maxAttempts = 6; // Max number of incorrect guesses (Maximum incorrect guesses allowed)

btn.addEventListener("click", startGame); // Start game when the start button is clicked

// Function to initialize a new game
function startGame() {
  score.style.display = "block"; // Show the score element
  feedback.style.display = "block"; // Show the feedback element
  if (words.length > 0) {
    btn.style.display = "none"; // Hide the start button
    restartBtn.style.display = "inline-block"; // Show restart button
    game.puzz = []; // Reset puzzle array
    game.total = 0; // Reset remaining letter count
    game.attempts = 0;
    game.scorePoints = 0; // Reset score points
    feedback.textContent = ""; // Clear previous feedback
    hangman.innerHTML = ""; // Clear the hangman visualisation
    let index = Math.floor(Math.random() * words.length);
    game.cur = words[index];; // Get the random word from the array
    game.solution = game.cur.split(""); // Split the words into letters
    words.splice(index, 1); // Remove the selected word from the array
    builder(); // Build the puzzle UI
  } else {
    score.textContent = "No More Words."; // Inform the player if no words are left
    score.style.color = "#663399";
    btn.style.display = "none";
    restartBtn.textContent = "Start Over!";
  }
}

// Function to build the puzzle UI and set up letter buttons
function builder() {
  letters.innerHTML = ""; // Clear the letters area
  puzzle.innerHTML = ""; // Clear the puzzle area
  hangman.innerHTML = ""; // Clear the hangman elements from the DOM

  game.solution.forEach(lett => {
    let div = createElement("div", puzzle, "-", "boxE"); // Create a div for each letter in the solution word, starting with a - as a placeholder (or a blank space for spaces in the word)
    if (lett === " ") {
      div.textContent = " "; // If the letter is a space, display it
      div.style.borderColor = "white"; // Hide space borders
      div.style.backgroundColor = "aliceblue";
    } else {
      game.total++; // Count the letters for the total
    }
    game.puzz.push(div); // Store the puzzle div
    updateScore(); // Update the score display
  });
        
  // Create letter buttons A-Z for guessing
  for (let i = 0; i < 26; i++) {
    let temp= String.fromCharCode(65 + i); // Get letter from A-Z
    let div = createElement("div", letters, temp, "box");
         
    let checker = function(e) {
      div.classList.remove("box"); // Change letter button style
      div.classList.add("boxD");
      div.removeEventListener("click", checker); // Remove the event listener after click
      div.style.backgroundColor = "#ddd"; // Change background color of guessed letter
      checkLetter(temp); // Check the guessed letter
      div.style.pointerEvents = "none"; // Disable the click event
    }

    div.addEventListener("click", checker); // Add event listener to the letter
  }

  updateScore(); // Update score after building the game
}

// Function to create an element and append it to a parent
function createElement(elType, parentEl, output, cla) {
  let temp = document.createElement(elType);
  temp.classList.add(cla);
  parentEl.append(temp);
  temp.textContent = output;
  return temp;
}

/* Function to update the score display (letters left to guess) and checks whether the player 
   has won (all guessed correctly) or lost (reached the maximum incorrect guesses). If the game is over,
   it disables the letter buttons.*/
function updateScore() {
  score.textContent = `Total letters left: ${game.total} | Incorrect guesses: ${game.attempts} | Points: ${game.scorePoints}`;
  if (game.total <= 0) {
    score.textContent = `You won! Game Over. Total Points: ${game.scorePoints}`; // End game when all letters are guessed
    score.style.color = "#b8860b";
    btn.style.display = "inline-block"; // Show start button for a new game
    btn.textContent = "Next word";
    disableLetterButtons(); // Disable letter buttons when the game is won
  } else {
    score.style.color = "black";
  }

  if (game.attempts >= maxAttempts) {
    score.textContent = `Game Over! You lost. Total Points: ${game.scorePoints}`;
    score.style.color = "red";
    disableLetterButtons(); // Disable letter buttons when the game is lost
  }
}

/* Function to check if the guessed letter is in the solution.
   1. Loops through each letter in the solution (game.solution) and checks if the clicked letter matches any of them.
   2. If the guess is correct, it updates the puzzle and decreases the number of letters left (game.total).
   3. If the guess is incorrect, it increments game.attempts and updates the hangman figure. */
function checkLetter(letter) {
  let correctGuess = false;
  game.solution.forEach((el, index) => {
    if (el.toUpperCase() === letter) { // Compare letters in a case-insensitive way
      game.puzz[index].textContent = letter; // Show the correct letter in the puzzle
      game.total--; // Decrease the remaining letter count
      correctGuess = true; // Mark the guess as correct
      game.scorePoints += 10; // Adds 10 points for each correct guess
    }
  });

  updateScore(); // Update the score display

  //Display feedback based on guess correctness
  if (correctGuess) {
    feedback.textContent = `Good job! '${letter}' is correct`;
    feedback.style.color = "green";
  } else {
    game.attempts++; // Increase incorrect attempts
    feedback.textContent = `Oops! '${letter}' is incorrect.`;
    feedback.style.color = "red";
    updateHangman(); // Update the hangman visualisation
    updateScore(); // Update score after incorrect guess
  }
}

// This function will loop through all letter buttons and disable them
function disableLetterButtons() {
  const letterButtons = document.querySelectorAll(".letters .box");
  letterButtons.forEach(button => {
    button.style.pointerEvents = "none"; // Disable the click event
    button.style.backgroundColor = "#ddd";
  });
}

function updateHangman() {
  hangman.innerHTML = "";
  for (let i = 0; i < maxAttempts; i++) {
    const spanCircles = createElement("span", hangman, "", "circles");
    if (i < game.attempts) {
      spanCircles.style.backgroundColor = "red"; // Color the incorrect guess
    }
  }
}