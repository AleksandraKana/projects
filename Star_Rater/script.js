let stars = document.querySelectorAll(".star");
let output = document.querySelector(".output");
let averageRating = document.getElementById("averageRating");

// Initialize variables to keep track of total ratings and number of ratings
let totalRatings = 0; // Total sum of ratings
let numRatings = 0; // Number of ratings given

// Loop through each star and assign a star value based on the index (1 to 5)
stars.forEach((star, index) => {
  star.starValue = index + 1; // Star value (1-5)
  star.addEventListener("click", starRate); // Event listener for click on each star
});

// Function to handle star rating when a star is clicked
function starRate(e) {
  let rating = e.target.starValue; // Get the rating for the clicked star
  output.textContent = "You rated this " + rating + " stars"; // Display the rating in the output div

  // Loop through each star and highlight it if its value is less than the clicked star value
  stars.forEach((star, index) => {
    if(index < rating) {
      star.classList.add("orange"); // Add "orange" class to highlight the star
    } else {
      star.classList.remove("orange"); // Remove "orange" class from unselected stars
    }
  });

  totalRatings += rating; // Update total ratings by adding the clicked rating
  numRatings++; // Increment the number of ratings given
  let average = totalRatings / numRatings; // Calculate the average rating
  averageRating.textContent = average.toFixed(1); // Update the average rating in HTML (formatted to 1 decimal place)
}