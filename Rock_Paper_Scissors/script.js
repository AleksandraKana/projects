// Main function to play the game
function playGame(playerChoice) {
  const choices = ["Rock", "Paper", "Scissors"];
  let computer = Math.floor(Math.random() * 3);
  let computerChoice = choices[computer];
  let result = determineWinner(playerChoice, computerChoice);
  document.getElementById("playerChoice").innerHTML = "Your choice: " + playerChoice;
  document.getElementById("computerChoice").innerHTML = "Computer's choice: " + computerChoice;
  document.getElementById("result").innerHTML = "Result: " + result;
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
        return "You Win!";
    } else {
        return "Computer Wins!";
    }
}