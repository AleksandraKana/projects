window.onload = build; // This function is executed when the page finishes loading
      
const myArray = ["Laurence", "Mike", "John"]; // Initial array of candidates

// Get references to DOM elements
const newInput = document.getElementById("addCandidate");
const btnAdd = document.getElementById("addNew");
const output = document.getElementById("output");
const candidateColumn = document.getElementById("candidateColumn");
const votesColumn = document.getElementById("votesColumn");

btnAdd.addEventListener("click", (e) => {
  const newCandidate = newInput.value.trim(); // Get the value from the input field and remove any extra spaces
        
  // Check if the input is empty
  if(newCandidate === "") {
    alert("Please enter a name!");
    return; // Stop the function if no name is provided
  }

  adder(newCandidate, myArray.length, 0); // Call the adder function to add a new row
  myArray.push(newCandidate); // Add the new candidate's name to the array
  newInput.value = ""; // Clear the input field after adding the candidate
});

//This function populates the table when the page loads
function build() {
  myArray.forEach((item, index) => {
    adder(item, index, 0); // Call the adder function for each candidate in the array
  });
}

// Function to add a new row to the table
function adder(name, index, counter) {
  const tr = document.createElement("tr"); // Create a new table row
  const td1 = document.createElement("td"); // Create a table cell for the index
  td1.textContent = index + 1; // Set the cell conctent to the index + 1 (to display row number)
  const td2 = document.createElement("td"); // Create a table cell for the name
  td2.textContent = name; // Set the cell content to the candidate's name
  const td3 = document.createElement("td"); // Create a table cell for the click count
  td3.textContent = counter; // Set the initial click count (0) in the third cell
  tr.append(td1, td2, td3); // Append the created cells to the row

  tr.addEventListener("click", () => {
    let val = Number(td3.textContent); // Get the current click count (convert to number)
    val++; // Increment the click count
    td3.textContent = val; // Update the click count in the third cell
  });

  output.appendChild(tr); // Append the row to the table
}

// Sorting functionality for candidate name and votes
candidateColumn.addEventListener("click", () => sortTable(1)); 
votesColumn.addEventListener("click", () => sortTable(2));

function sortTable(columnIndex) {
  const rows = Array.from(output.rows);
  let sortedRows;

  if (columnIndex === 1) {
    // Sort by candidate name alphabetically
    sortedRows = rows.sort((rowA, rowB) => {
      const nameA = rowA.cells[1].textContent.toLowerCase();
      const nameB = rowB.cells[1].textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } else if (columnIndex === 2) {
    // Sort by votes numerically
    sortedRows = rows.sort((rowA, rowB) => {
      const votesA = Number(rowA.cells[2].textContent);
      const votesB = Number(rowB.cells[2].textContent);
      return votesB - votesA;
    });
  }

  // Re-append the sorted rows to the table 
  output.innerHTML = ""; // Clear the table
  sortedRows.forEach(row => output.appendChild(row));
}