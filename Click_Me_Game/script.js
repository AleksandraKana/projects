// Select elements from the DOM
const message1 = document.querySelector(".message1") // Message at top
const output = document.querySelector(".output"); // Game area
const message2 = document.querySelector(".message2"); // Message at bottom
const restartBtn = document.querySelector(".restartBtn"); // Restart button
const instructions = document.querySelector(".instructions"); // Instructions for the game

const box = document.createElement("div"); // Create a div element (the box that the player will click on)
box.classList.add("box"); // Add class .box to the div (box) element
output.appendChild(box); // Append to game area

message1.textContent = "Press to Start"; // Initial message1

// Game state object
const game = {
  timer: 0, // Timer reference
  start: null, // Start time of game round
  timeLimit: 1, // Time limit (1 second per round)
  score: 0, // Player's score
  countdown: null // Countdown timer
};

// Function to generate a random number up to the max value
function randomNum(max) {
  return Math.floor(Math.random() * max);
}

// Function to generate a random color
function randomColor() {
  const colors = ["red", "blue", "green", "purple", "orange"]; // Array od colors
  return colors[randomNum(colors.length)]; // Randomly select a color from the array
} 

// Add click event listener to the box
box.addEventListener("click", (e) => {
  clearTimeout(game.timer); // Stop the box timer
  clearInterval(game.countdown); // Stop the countdown timer

  if(game.start) {
    // Calculate the time taken to click the box
    const cur = new Date().getTime(); // Get the current time when the box was clicked
    const dur = (cur - game.start) / 1000; // Calculate the time taken to click the box (in seconds)
    message2.innerHTML = "Time: " + dur.toFixed(2) + " sec - Score: " + ++game.score; // Display the time taken and update the score 
    addBox(); // Add new box
  }
}); 

// Function to add a new box to the screen
function addBox() {
  message1.textContent = "Click it"; // Update message1 to prompt user to click the new box
  
  game.start = new Date().getTime(); // Record the start time of this game round
  
  const boxSize = randomNum(40) + 30; // Random box size between 30px and 70px;
  box.style.width = boxSize + "px"; // Set the random width
  box.style.height = boxSize + "px"; // Set the random height
  box.style.left = randomNum(500 - boxSize) + "px"; // Set a random horizontal position for the box
  box.style.top = randomNum(500 - boxSize) + "px"; // Set a random vertical position for the box
  box.style.backgroundColor = randomColor(); // Set random background color
  box.style.display = "block"; // Show the box

  startCountdown(); // Start the countdown timer
}

// Function to start countdown timer
function startCountdown() {
  let timeRemaining = game.timeLimit; // Set countdown time (1 second)
  game.countdown = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      // If time runs out, stop the game and hide the box
      clearInterval(game.countdown); // Stop countdown
      box.style.display = "none"; // Hide box
      message1.textContent = ""; // Clear message1
      message2.textContent = "Game Over! Final Score: " + game.score; // Show final score
      restartBtn.style.display = "inline-block"; // Show restart button
    }
  }, 1000);
}

// Restart game event listener
restartBtn.addEventListener("click", () => {
  game.start = null; // Reset start time
  restartBtn.style.display = "none"; // Hide restart button
  message1.style.display = "block"; // Show initial message1
  message1.textContent = "Press to Start"; // Update message1 textContent
  message2.textContent = ""; // Clear message2
  instructions.style.display = "block"; // Show instructions
});

// Function to start the game
function startGame() {
  game.start = null; // Reset the start time
  game.timer = setTimeout(addBox, randomNum(3000)); // Add a box after a random time (up to 3 seconds)
  game.score = 0; // Reset score
  instructions.style.display = "none"; // Hide instructions

  message1.textContent = "Loading..."; // Loading message
  restartBtn.style.display = "none"; // Hide restart button
  box.style.display = "none"; // Hide the box initially
}

// Start game when clicking on the game area
output.addEventListener("click", (e) => {
  if (!game.start) {
    startGame(); // Start the game
  }
});