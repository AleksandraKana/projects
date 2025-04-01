let draggedTask = null; // Holds the reference to the dragged task element
let tasks = []; // Store all tasks in an array to manage them better

//Allow the dragged task to be dropped into the column
function allowDrop(event) {
  event.preventDefault(); // Prevent default behavior to allow drop
}

function dragStart(event) {
  const task = event.target.closest(".task"); // Find the closest parent element with the class .task (in case the user clicks on a child element inside the task)

  // Check if the task does not exist or if it has the .completed class or if it has .overdue class (Prevent dragging if the task is completed or overdue)
  if (!task || task.classList.contains("completed") || task.classList.contains("overdue")) {
    event.preventDefault();
    return;
  }

  draggedTask = task; // Store the dragged task in the global variable so it can be used later in the drop event
  event.target.style.opacity = "0.5";
}

// Reset the opacity of the task after the drag ends
function dragEnd(event) {
  event.target.style.opacity = "1";
}

// Handle the drop event
function drop(event) {
  event.preventDefault(); // Prevent default behavior (such as opening the dragged content in the browser) to allow dropping
  const targetColumn = event.target.closest(".column"); // Get the closest parent column element of the drop target to ensure the drop happens inside a valid column

  // Check if the drop target is valid (targetColumn exists) and a task is being dragged (draggedTask is not null)
  if (targetColumn && draggedTask) {
    // If the task is completed or overdue, prevent it from being moved
    if (draggedTask.classList.contains("completed") || draggedTask.classList.contains("overdue")) {
      return;
    }

    targetColumn.appendChild(draggedTask); // Append the dragged task to the target column (this moves the task visually into the column)

    // Check if the task is dropped into the "Completed" column
    if (targetColumn.id === "completed") {
      draggedTask.classList.add("completed"); // If dropped in the "Completed" column, add .completed class to the task
      draggedTask.setAttribute("draggable", "false"); // Disable dragging for completed tasks

      draggedTask.classList.remove("low", "medium", "high"); // Remove the priority classes (low, medium, high) from the task (to have only .completed)


      const buttons = draggedTask.querySelectorAll("button");
      // Disable all buttons
      buttons.forEach(button => {
        button.disabled = true;
        button.classList.add("disabled");
      });

      const deleteButton = draggedTask.querySelector(".delete-btn");
      const copyButton = draggedTask.querySelector(".copy-btn");
      const viewDescBtn = draggedTask.querySelector(".toggle-desc-btn");

      // Enable the "Delete" button
      if (deleteButton) {
        deleteButton.disabled = false;
        deleteButton.classList.add("enabled");
      }

      // Enable the "Copy" button
      if (copyButton) {
        copyButton.disabled = false; 
        copyButton.classList.add("enabled");
      }

      // Enable the "View Description" button
      if (viewDescBtn) {
        viewDescBtn.disabled = false; 
        viewDescBtn.classList.add("enabled");
      }

      // Disable the priority change dropdown in other columns
      const prioritySelect = draggedTask.querySelector(".priority");
      if (prioritySelect) {
        prioritySelect.disabled = true;
        prioritySelect.style.cursor = "not-allowed";
      }

      const dueDate = draggedTask.querySelector(".due-date");
      if (dueDate) {
        dueDate.disabled = true;
        dueDate.style.cursor = "not-allowed";
      }
    } else {
      draggedTask.classList.remove("completed"); // If not in the "Completed" column, remove the .completed class (in case it was previously added)
    }

    // Check if the task is dropped into the Overdue column
    if (targetColumn.id === "overdue") {
      draggedTask.classList.add("overdue"); // If dropped in the "Overdue" column, add .overdue class to the task
      draggedTask.setAttribute("draggable", "false"); // Disable dragging for overdue tasks

      draggedTask.classList.remove("low", "medium", "high");

      const buttons = draggedTask.querySelectorAll("button");
      // Disable all buttons
      buttons.forEach(button => {
        button.disabled = true;
        button.classList.add("disabled");
      });

      const deleteButton = draggedTask.querySelector(".delete-btn");
      const copyButton = draggedTask.querySelector(".copy-btn");
      const viewDescBtn = draggedTask.querySelector(".toggle-desc-btn");

      // Enable the "Delete" button
      if (deleteButton) {
        deleteButton.disabled = false; 
        deleteButton.classList.add("enabled");
      }

      // Enable the "Copy" button
      if (copyButton) {
        copyButton.disabled = false; 
        copyButton.classList.add("enabled");
      }

      // Enable the "View Description" button
      if (viewDescBtn) {
        viewDescBtn.disabled = false; 
        viewDescBtn.classList.add("enabled");
      }

      // Disable the priority change dropdown in other columns
      const prioritySelect = draggedTask.querySelector(".priority");
      if (prioritySelect) {
        prioritySelect.disabled = true;
        prioritySelect.style.cursor = "not-allowed";
      }

      const dueDate = draggedTask.querySelector(".due-date");
      if (dueDate) {
        dueDate.disabled = true;
        dueDate.style.cursor = "not-allowed";
      }
    } else {
      draggedTask.classList.remove("overdue"); // If not in the "Overdue" column, remove the .overdue class (in case it was previously added)
    }

    updateTaskCounters(); // Update task counters after movement
  }
}

// Add a new task to the specified column
function addTask(columnId) {
  // Create a unique task ID based on the current timestamp
  const taskId = "task" + new Date().getTime();

  const task = document.createElement("div"); // Create the task div
  task.classList.add("task"); // Add the .task class to it
  task.setAttribute("draggable", "true"); // Make it draggable
  task.setAttribute("id", taskId); // Set the task ID
  task.setAttribute("ondragstart", "dragStart(event)"); // Attach drag start event
  task.setAttribute("ondragend", "dragEnd(event)"); // Attach drag end event

  const priority = "low"; // Default priority
  const dueDate = new Date().toISOString().split("T")[0]; // Default due date as today 
  const createDate = new Date().toLocaleString(); // Set create date with current date and time 

  // Set the inner HTML for the task (including buttons for actions)
  task.innerHTML = `
    <div class="task-header">
      <span class="task-name">Task Name</span>
      <button class="edit-btn" onclick="editTask('${taskId}')">Edit</button>
    </div>
    <button class="add-desc-btn" onclick="addDescription('${taskId}')">Add Description</button>
    <button class="toggle-desc-btn" onclick="toggleDescription('${taskId}')" style="display: none;">View Description</button> <br>
    <div class="task-desc" id="desc-${taskId}" style="display: none;"></div>
    <span>Created: ${createDate}</span> <br>
    <span>Priority:</span>
    <select class="priority" onchange="setPriority(event, '${taskId}')">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <br>
    <span>Due Date: </span>
    <input type="date" class="due-date" onchange="setDueDate(event, '${taskId}')" value="${dueDate}"> <br>
    <button class="assign-btn" onclick="assignTask('${taskId}')">Assign</button>
    <button class="delete-btn" onclick="deleteTask('${taskId}')">Delete</button>
    <button class="copy-btn" onclick="copyTask('${taskId}')">Copy</button>
    <button class="complete-btn" onclick="completeTask('${taskId}')">Complete</button>           
  `; 

  // Add the new task to the specified column
  const column = document.getElementById(columnId);
  const addButton = column.querySelector(".add-task-btn");
  column.insertBefore(task, addButton);

  tasks.push({id: taskId, column: columnId, priority, dueDate, createDate, taskDescription: ""});
  updateTaskCounters(); // Update task counters after adding a new task 
}

// Set the prority of a task (change color based on priority)
function setPriority(event, taskId) {
  const task = document.getElementById(taskId);
  task.classList.remove("low", "medium", "high");
  task.classList.add(event.target.value);
}  

function setDueDate(event, taskId) {
  const dueDate = event.target.value; // Get the selected due date from the input field
  const task = tasks.find(t => t.id === taskId); // Find the task object in the tasks array that matches the given taskId

  // If the task is found, update its due date with the selected value
  if (task) {
    task.dueDate = dueDate; // Update stored due date
  }
}

function editTask(taskId) {
  const task = document.getElementById(taskId); // Find the task by ID
  const taskName = task.querySelector(".task-name"); // Get the task name element

  const newTaskName = document.createElement("input"); // Create an input field for editing the task name
  newTaskName.type = "text"; // Set the input type to text
  newTaskName.value = taskName.textContent.trim(); // Set the current task name as the value of the input field

  // When the input field loses focus, update the task name
  newTaskName.addEventListener("blur", () => {
    const trimmedNewTaskName = newTaskName.value.trim(); // Get the value from the input field and trim it

    // If the user enters a non-empty task name, update the task name
    if (trimmedNewTaskName !== "") {
      taskName.textContent = trimmedNewTaskName;
    } else {
      // If the user entered an empty string, revert to the original task name
      taskName.textContent = "Task Name" + taskName.textContent;
    } 
  });
  
  // Replace the task name with the input field so the user can edit it
  taskName.innerHTML = ""; // Clear the current task name
  taskName.appendChild(newTaskName); // Append the input field for editing
}

// Assign a team member to the task
function assignTask(taskId) {
  const task = document.getElementById(taskId);

  // Create an input field for the team member's name
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = "Enter team member's name";

  // When the input field loses focus (blur event)
  newInput.addEventListener("blur", () => {
    const teamMember = newInput.value.trim(); // Get the value from the input field
    // If the user enters a name (team member is not empty)
    if (teamMember !== "") {
      const assignment = document.createElement("div"); // Create a new <div> element to display the assignment
      assignment.classList.add("assignment"); // Add a CSS class .assignment to the <div> element
      assignment.innerHTML = "Assigned to: " + teamMember; // Set the innerHTML of the <div> to include the team member's name 

      const editAssignBtn = document.createElement("button"); // Create a new <button> element to edit assignment
      editAssignBtn.innerText = "Edit";
      editAssignBtn.classList.add("edit-assign-btn");
      editAssignBtn.addEventListener("click", () => editAssignTask(assignment, editAssignBtn));

      task.append(assignment, editAssignBtn); // Append the newly created assignments <div> and <button> to the task element
    }

    newInput.remove(); // Remove the input field after the assignment is made
  });

  task.append(newInput); // Append the input field to the task

  newInput.focus(); // Focus the input field so the user can immediately start typing   
}

// Function to edit the assignment of a task
function editAssignTask(assignment, editAssignBtn) {
  if (!assignment) return; // Safety check to ensure assignment exists before proceeding

  const currentText = assignment.textContent.replace("Assigned to: ", "").trim(); // Extract the current assigned team member's name from the assignment's text content
  
  const newInput = document.createElement("input"); // Create an input field to allow editing of the current assignment
  newInput.type = "text"; // Set the input field type to text
  newInput.value = currentText; // Set the current assignment as the input's value
  
  // Add an event listener to handle when the input field loses focus
  newInput.addEventListener("blur", () => {
    const newValue = newInput.value.trim(); // Get the new assignment value from the input and trim whitespace 

    // If the new value is different from the old value, update the assignment
    if (newValue === "") {
      assignment.remove(); // Remove the assignment text if input is empty
      editAssignBtn.remove(); // Remove the edit button if input is empty
    } else if (newValue !== currentText) {
      assignment.innerHTML = "Assigned to: " + newValue; // Update the assignment text
    } else {
      assignment.innerHTML = "Assigned to: " + currentText; // Revert to the original text if no change
    } 
  });

  assignment.style.display = "inline-block";
  // Replace the current assignment text with the input field
  assignment.innerHTML = ""; // Clear current assignment
  assignment.append(newInput); // Append the input field to the assignment 

  newInput.focus(); // Focus the input field to allow the user to immediately start editing
}

// Delete a task from the column
function deleteTask(taskId) {
  const task = document.getElementById(taskId);
  task.remove(); // Remove the task from the DOM
  tasks = tasks.filter(task => task.id !== taskId); // Remove task from tasks array
  updateTaskCounters(); // Update task counters after deletion
}

// Update task counters for each column
function updateTaskCounters() {
  // Get references to the task counters for each column
  const todoCount = document.getElementById("todo-counter");
  const inProgressCount = document.getElementById("inprogress-counter");
  const onHoldCount = document.getElementById("onhold-counter");
  const inReviewCount = document.getElementById("inreview-counter");
  const completedCount = document.getElementById("completed-counter");
  const overdueCount = document.getElementById("overdue-counter");

  // Count the number of tasks in each column and update the respective counter's text content
  todoCount.textContent = document.querySelectorAll("#toDo .task").length;
  inProgressCount.textContent = document.querySelectorAll("#inProgress .task").length;
  onHoldCount.textContent = document.querySelectorAll("#onHold .task").length;
  inReviewCount.textContent = document.querySelectorAll("#inReview .task").length;
  completedCount.textContent = document.querySelectorAll("#completed .task").length;
  overdueCount.textContent = document.querySelectorAll("#overdue .task").length;
}

// Complete Task
function completeTask(taskId) {
  const task = document.getElementById(taskId);
  const completedColumn = document.getElementById("completed");

  if (task && completedColumn) {
    task.classList.add("completed"); // Add the .completed class
    task.setAttribute("draggable", "false"); // Disable dragging for completed task

    // Remove existing drag event listeners
    task.removeAttribute("ondragestart");
    task.removeAttribute("ondragend");

    task.classList.remove("low", "medium", "high"); // Remove the priority classes (low, medium, high) from the task (to have only .completed)

    // Disabled buttons in the completed task
    const buttons = task.querySelectorAll("button");
    buttons.forEach(button => {
      button.disabled = true;
      button.classList.add("disabled");
    });

    const deleteButton = task.querySelector(".delete-btn");
    const copyButton = task.querySelector(".copy-btn");
    const viewDescBtn = task.querySelector(".toggle-desc-btn");

    if (deleteButton) {
      deleteButton.disabled = false; // Enable the "Delete" button
      deleteButton.classList.add("enabled");
    }

    if (copyButton) {
      copyButton.disabled = false; // Enable the "Copy" button
      copyButton.classList.add("enabled");
    }  

    if (viewDescBtn) {
      viewDescBtn.disabled = false; // Enable the "View Description" button
      viewDescBtn.classList.add("enabled");
    }

    // Disable the priority change dropdown in other columns
    const prioritySelect = task.querySelector(".priority");
    if (prioritySelect) {
      prioritySelect.disabled = true;
      prioritySelect.style.cursor = "not-allowed";
    }

    const dueDate = task.querySelector(".due-date");
    if (dueDate) {
      dueDate.disabled = true;
      dueDate.style.cursor = "not-allowed";
    }

    completedColumn.appendChild(task); // Move the task to the "Completed" column

    task.querySelector(".priority").removeEventListener("onchange", setPriority);

    updateTaskCounters(); // Update task counters
  }
} 

// Search tasks by name
function searchTasks() {
  const searchText = document.getElementById("search").value.toLowerCase(); // Get the text entered in the search input field and convert it to lowercase for case-insensitive comparison
  const tasks = document.querySelectorAll(".task"); // Select all task element from the document

  // Loop through each task element
  tasks.forEach(task => {
    const taskName = task.innerHTML.split("<br>")[0].toLowerCase(); // Extract the task name (the first line before the first <br> tag) and convert it to lowercase
    // Check if the task name includes the searched text
    if (taskName.includes(searchText)) {
      task.style.display = "block"; // Show the task if it matches the search
    } else {
      task.style.display = "none"; // Hide the task if it doesn't match
    }
  });
} 

function copyTask(taskId) {
  const task = document.getElementById(taskId);

  if (task) {
    const taskClone = task.cloneNode(true); // Clone the task

    const newTaskId = "task" + new Date().getTime(); // Reset the task clone's attributes

    const newCreateDate = new Date().toLocaleString(); // New timestamp for copied task

    taskClone.setAttribute("id", newTaskId); // Give the copied task a new unique ID
    taskClone.setAttribute("draggable", "true"); // Ensure the copied task is draggable
    taskClone.classList.remove("completed"); // Remove .completed class so it's draggable

    // Update the "Created" time
    const spans = taskClone.querySelectorAll("span"); // Get all <span> elements
    const createdSpan = spans[1]; // Select the first <span> (which shows "Created")
    if (createdSpan) {
      createdSpan.innerHTML = "Created " + newCreateDate; // Set new timestamp
    }

    // Remove the draggable restriction
    taskClone.setAttribute("ondragstart", "dragStart(event)");
    taskClone.setAttribute("ondragend", "dragEnd(event)");

    // Ensure the copied task gets an independent description
    const originalDesc = task.querySelector(".task-desc");
    if (originalDesc) {
      const clonedDesc = taskClone.querySelector(".task-desc");
      clonedDesc.innerHTML = originalDesc.innerHTML; // Copy text content
      clonedDesc.setAttribute("id", `desc-${newTaskId}`); // Unique ID for the new task
    }

    // Remove any existing event listeners (if any)
    const copyBtn = taskClone.querySelector(".copy-btn");
    copyBtn.removeAttribute("onclick"); 

    // Update the copy button to call the copy function again for the new task
    copyBtn.setAttribute("onclick", `copyTask('${newTaskId}')`);
    
    // Attach event listeners for edit button to call the copy function again for the new task
    const editBtn = taskClone.querySelector(".edit-btn");
    editBtn.setAttribute("onclick", `editTask('${newTaskId}')`);

    const assignBtn = taskClone.querySelector(".assign-btn");
    assignBtn.setAttribute("onclick", `assignTask('${newTaskId}')`);

    // Reassign the priority selection handler for the new task (to ensure it's independent)
    const prioritySelect = taskClone.querySelector(".priority");
    // Enable the priority change dropdown in other columns
    if (prioritySelect) {
      prioritySelect.disabled = false;
      prioritySelect.style.cursor = "pointer";
    }
    prioritySelect.setAttribute("onchange", `setPriority(event, '${newTaskId}')`);

    // Reassign due date
    const dueDate = taskClone.querySelector(".due-date");
    if (dueDate) {
      dueDate.disabled = false;
      dueDate.style.cursor = "pointer";
    }
    dueDate.setAttribute("onchange", `setDueDate(event, '${newTaskId}')`);

    // Reassign the delete button
    const deleteBtn = taskClone.querySelector(".delete-btn");
    deleteBtn.setAttribute("onclick", `deleteTask('${newTaskId}')`); // Update with the new task ID

    // Reassign the complete button
    const completeBtn = taskClone.querySelector(".complete-btn"); // The "Complete" button uses the .complete-btn class
    completeBtn.setAttribute("onclick", `completeTask('${newTaskId}')`); // Update with the new task ID

    // Reassign the Add Description button
    const addDescBtn = taskClone.querySelector(".add-desc-btn");
    addDescBtn.setAttribute("onclick", `addDescription('${newTaskId}')`);

    // Reassign the View Description button
    const viewDescBtn = taskClone.querySelector(".toggle-desc-btn");
    viewDescBtn.setAttribute("onclick", `toggleDescription('${newTaskId}')`); 

    // Enable all the buttons in the copied task
    const buttons = taskClone.querySelectorAll("button");
    buttons.forEach(button => {
      button.disabled = false;
      button.classList.remove("disabled");
    });

    // Edit Assignment Button in the Cloned Task
    const originalAssignments = task.querySelectorAll(".assignment"); // Get all assignments in the original task
    const clonedAssignments = taskClone.querySelectorAll(".assignment"); // Get all assignments in the cloned task
    // For each assignment, re-attach the edit functionality
    originalAssignments.forEach((originalAssignment, index) => {
      const clonedAssignment = clonedAssignments[index];
      // Ensure the "Edit" button is also cloned and the event listener is added
      const editAssignBtn = clonedAssignment.nextElementSibling; // The edit button is the sibling of the assignment

      // Re-attach the edit function for the cloned assignment
      if (editAssignBtn) {
        editAssignBtn.removeEventListener("click", () => editAssignTask(clonedAssignment, editAssignBtn)); // Remove old listener
        editAssignBtn.addEventListener("click", () => editAssignTask(clonedAssignment, editAssignBtn)); // Attach listener for cloned task
      }
    });
    
    // Reset the opacity in case it was inherit from the original task
    taskClone.style.opacity = "1";

    // Append the cloned task to the same column
    task.parentElement.appendChild(taskClone);

    // Ensure the cloned task is not considered completed and can be dragged
    taskClone.classList.remove("completed"); // Ensure no .completed class on the clone
    taskClone.classList.remove("overdue"); 
    taskClone.classList.remove("low", "medium", "high");

    tasks.push({
      id: newTaskId, 
      column: task.parentElement.id, 
      priority: "low", 
      dueDate: task.querySelector(".due-date").value, 
      createDate: task.querySelector("span").textContent});
    
    updateTaskCounters(); // Update task counters after copying
  }
}

// Function to add a description
function addDescription(taskId) {
  const descDiv = document.getElementById(`desc-${taskId}`);
  descDiv.style.display = "block";
  const addDescBtn = document.querySelector(`#${taskId} .add-desc-btn`);
  const viewDescBtn = document.querySelector(`#${taskId} .toggle-desc-btn`); // Find the "View Description" button

  // If there's no description, create an input field for adding a new one
  if (!descDiv.innerHTML.trim()) {
    const newDescInput = document.createElement("textarea"); // Create a textarea for entering a new description
    newDescInput.placeholder = "Enter task description";
    newDescInput.classList.add("description-input");
    newDescInput.focus(); // Focus the input to let the user start typing

    // Event listener when user finishes typing (on blur)
    newDescInput.addEventListener("blur", () => {
      const desc = newDescInput.value.trim();
      
      // If description is empty, remove the input field
      if (!desc) {
        descDiv.style.display = "none"; // Hide the description div
        addDescBtn.innerHTML = "Add Description"; // Reset button text
        return;
      }
        
      descDiv.innerHTML = desc.replace(/\n/g, "<br>"); // Replace new lines with <br> for line breaks in HTML
      descDiv.style.display = "block"; // Show the description div
      addDescBtn.innerHTML = "Edit Description"; // Change button text to "Edit Description"
      if (viewDescBtn) {
        viewDescBtn.style.display = "inline-block"; // Show the "View Description" button
        viewDescBtn.innerText = "Hide Description"; // Change button text to "Hide Description"
      }

      newDescInput.remove(); // Remove the input field after description is added
    });

    descDiv.appendChild(newDescInput); // Append the textarea to the description div
  } else { // If description already exists, allow editing the existing one
    // If there's already a textarea (active editing), don't create a new one
    const existingDescInput = descDiv.querySelector("textarea");
    if (!existingDescInput) {
      const newDescInput = document.createElement("textarea"); // Create a textarea to edit the description
      newDescInput.value = descDiv.innerHTML.replace(/<br>/g, "\n"); // Set the current description as the textarea value
      newDescInput.classList.add("description-input");

      // Add event listener when user finishes editing (on blur)
      newDescInput.addEventListener("blur", () => {
        const newDesc = newDescInput.value.trim();

        // If description is empty, hide it
        if (newDesc === "") {
          descDiv.style.display = "none";
          if (viewDescBtn) {
            viewDescBtn.style.display = "none"; // Hide "View Description" button
          }
          addDescBtn.innerHTML = "Add Description"; // Change button text back to "Add Description"
        } else {
          // Save the description with line breaks in the div
          descDiv.innerHTML = newDesc.replace(/\n/g, "<br>"); // Replace new lines with <br> for line breaks in HTML
          descDiv.style.display = "block"; // Show the description div
          addDescBtn.innerHTML = "Edit Description"; // Keep "Edit Description" button
          if (viewDescBtn) {
            viewDescBtn.style.display = "inline-block"; // Show "View Description" button
          }
        }
    
        // Remove the textarea after editing
        newDescInput.remove();
      });

      // Replace the existing description with the new textarea for editing
      descDiv.innerHTML = ""; // Clear the existing description
      descDiv.appendChild(newDescInput);
      newDescInput.focus(); // Focus the textarea for immediate editing
    }
  }
}  

// Toggle description visibility
function toggleDescription(taskId) {
  const descDiv = document.getElementById(`desc-${taskId}`);
  descDiv.style.display = descDiv.style.display === "none" ? "block" : "none";
  const viewDescBtn = document.querySelector(`#${taskId} .toggle-desc-btn`);
  viewDescBtn.innerText = descDiv.style.display === "none" ? "View Description" : "Hide Description";
}

function checkOverdueTasks() {
  const now = new Date(); // Get the current date and time
  now.setHours(0, 0, 0, 0); // Reset the time to midnight (only compare dates)

  // Loop through all tasks in the tasks array
  tasks.forEach(task => {
    const taskElement = document.getElementById(task.id); // Get the task element from the DOM
    if (!taskElement) return; // If the task doesn't exist in the DOM, skip it

    const dueDate = new Date(task.dueDate); // Convert the task's due date to a Date object
    dueDate.setHours(0, 0, 0, 0); // Reset time to midnight for proper date comparison

    const parentColumn = taskElement.closest(".column").id; // Get the ID of the column where the task is currently located

    // Check if the task is overdue and is not already in "overdue" or "done" (completed) columns
    if (dueDate < now && parentColumn !== "overdue" && parentColumn !== "completed") {
      taskElement.classList.add("overdue"); // Add the .overdue class to visually highlight the task

      taskElement.classList.remove("low", "medium", "high");

      const buttons = taskElement.querySelectorAll("button");
      // Disable all buttons
      buttons.forEach(button => {
        button.disabled = true;
        button.classList.add("disabled");
      });

      const deleteButton = taskElement.querySelector(".delete-btn");
      const copyButton = taskElement.querySelector(".copy-btn");
      const viewDescBtn = taskElement.querySelector(".toggle-desc-btn");

      // Enable the "Delete" button
      if (deleteButton) {
        deleteButton.disabled = false; 
        deleteButton.classList.add("enabled");
      }

      // Enable the "Copy" button
      if (copyButton) {
        copyButton.disabled = false; 
        copyButton.classList.add("enabled");
      }

      // Enable the "View Description" button
      if (viewDescBtn) {
        viewDescBtn.disabled = false; 
        viewDescBtn.classList.add("enabled");
      }

      // Disable the priority change dropdown in other columns
      const prioritySelect = taskElement.querySelector(".priority");
      if (prioritySelect) {
        prioritySelect.disabled = true;
        prioritySelect.style.cursor = "not-allowed";
      }

      const dueDate = taskElement.querySelector(".due-date");
      if (dueDate) {
        dueDate.disabled = true;
        dueDate.style.cursor = "not-allowed";
      }

      document.getElementById("overdue").appendChild(taskElement); // Move the task to the "Overdue" column

      updateTaskCounters(); // Update task counters after moving the task
    }
  });
}

setInterval(checkOverdueTasks, 1000 * 60); // Run the function every 1 minute (60000 milliseconds)