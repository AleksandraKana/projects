document.addEventListener("DOMContentLoaded", loadList); // Call loadList() when the page loads to restore saved items

const addItem = document.getElementById("addItem");
const addNew = document.getElementById("addNew");
const slist = document.getElementById("sList");
const deleteAllBtn = document.getElementById("deleteAllBtn");

addNew.addEventListener("click", addOne);
addItem.addEventListener("keyup", addOneKeyboard);
deleteAllBtn.addEventListener("click", deleteAll);

function loadList() {
  const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || []; // Retrieve saved items from local storage, or use an empty array if none exist
  savedItems.forEach(item => addItemToList(item.text, item.checked)); // Loop through each saved item and add it back to the list
}

function addOne() {
  let addItemValue = addItem.value.trim(); // Get the value and trim any extra spaces

  // Input validation
  if (addItemValue === "") {
    alert("Please enter a valid item.")
    return;
  }  

  addItemToList(addItemValue, false);
  addItem.value = ""; // Clear input field
}

function addOneKeyboard() {
  let key = event.key; // Store the pressed key
  
  if (key == "Enter") {
    let addItemValue = addItem.value.trim(); // Get the value and trim any extra spaces

    // Input validation
    if (addItemValue === "") {
      alert("Please enter a valid item.")
      return; // Exit if input is empty
    }

    addItemToList(addItemValue); // Add item to list
    addItem.value = ""; // Clear input field
  }
}

function addItemToList(text, checked = false) {
  let liEle = document.createElement("li");

  // Create checkbox
  let checkbox = document.createElement("input"); // Create input element
  checkbox.type = "checkbox"; // Set it as a checkbox
  checkbox.checked = checked;
  checkbox.addEventListener("change", lineThrough); // Toggle strikethrough on change
  liEle.appendChild(checkbox);

  // Create text element
  let spanEle = document.createElement("span"); // Create span for text
  spanEle.textContent = text;
  spanEle.addEventListener("click", (e) => e.stopPropagation()); // Prevent text click from toggling strikethrough (Ignore text clicks)
  liEle.appendChild(spanEle);
        
  //Create the delete image
  let imageDelete = document.createElement("img");
  imageDelete.src = "delete2.png";
  imageDelete.alt = "delete icon";
  imageDelete.classList.add("imgDelete");
  liEle.appendChild(imageDelete);

  // Create the edit image
  let imageEdit = document.createElement("img");
  imageEdit.src = "edit.png";
  imageEdit.alt = "edit icon";
  imageEdit.classList.add("imgEdit");
  liEle.appendChild(imageEdit);

  slist.appendChild(liEle);
  addItem.value = ""; // Clear input field

  // Apply strikethrough if the checkbox was already checked
  if (checked) {
    lineThrough({ target: checkbox }); // Trigger function without clicking
  } 

  saveList(); // Save list to local storage
}
 
function saveList() {
  let items = []; // Create an empty array to store list items
  sList.querySelectorAll("li").forEach(li => {
    let text = li.querySelector("span").textContent; // Get the item's text
    let checked = li.querySelector("input[type='checkbox']").checked; // Get the checkbox state
    items.push({ text, checked }); // Store item text and checked status as an object in the array
  });

  localStorage.setItem("shoppingList", JSON.stringify(items)); // Convert the array to a JSON string and save it in local storage
}

// Function to delete all items from list
function deleteAll() {
  let liEleAll = document.querySelectorAll("li");
  for (let i = 0; i < liEleAll.length; i++) {
    liEleAll[i].remove();
    saveList();
  }
}

function lineThrough(e) {
  let liEle = e.target.parentElement; // Get the parent <li>
  let spanEle = liEle.querySelector("span"); // Find the text element

  if (e.target.checked) {
    spanEle.style.textDecoration = "line-through"; // Add striketrough
    spanEle.style.color = "grey";
  } else {
    spanEle.style.textDecoration = ""; // Remove strikethrough
    spanEle.style.color = "black";
  }

  saveList(); // Save changes to local storage
}

sList.addEventListener("click", (e) => {
  // Handle checkbox change
  if (e.target.type === "checkbox") {
    saveList(); // Save checkbox state
  }
  // If the clicked element has the "imgDelete" class, remove the parent <li>
  else if (e.target.classList.contains("imgDelete")) {
    e.target.parentElement.remove();
    saveList();
  } 
  // If the clicked element has the "editImg" class, allow inline editing
  else if (e.target.classList.contains("imgEdit")) {
    let liEle = e.target.parentElement; // Get the parent <li>
    let editLi = liEle.querySelector("span"); // Get the text inside <li>

    if (!editLi) return; // Ensure span exists
          
    let inputEle = document.createElement("input"); // Create an input field
    inputEle.type = "text"; // Set input type as text
    inputEle.value = editLi.textContent.trim(); // Set input value to current text (trimmed)

    // Insert input field before span text and remove original text
    liEle.insertBefore(inputEle, editLi);
    liEle.removeChild(editLi);

    inputEle.focus(); // Automatically focus on the input field

    // Function to save and replace input with text
    function saveInput() {
      let newText = document.createElement("span");
      newText.textContent = inputEle.value.trim();
      liEle.insertBefore(newText, inputEle);
      liEle.removeChild(inputEle);
      saveList();
    }

    // Handle "Enter" key press
    inputEle.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        inputEle.removeEventListener("blur", saveInput); // Prevent duplicate calls
        saveInput();
      }
    });

    inputEle.addEventListener("blur", saveInput); //Handle blur event (if user clicks away)
  }
});