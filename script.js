const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const todoList = document.getElementById("todo-list");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");

// Function to fetch tasks from the API
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Display the tasks on the webpage
        data.forEach(task => {
            const li = document.createElement("li");
            li.innerText = task.title;
            if (task.completed) {
                li.classList.add("completed");
            }

            // Mark the task as completed when clicked
            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                updateTaskStatus(task.id, !task.completed);
            });

            todoList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Function to add a new task
async function addTask() {
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") return;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: taskTitle,
                completed: false,
            }),
        });

        if (response.status === 201) {
            const newTask = await response.json();
            const li = document.createElement("li");
            li.innerText = newTask.title;

            // Mark the new task as completed when clicked
            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                updateTaskStatus(newTask.id, !newTask.completed);
            });

            todoList.appendChild(li);
            taskInput.value = "";
        } else {
            console.error("Failed to add task");
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Function to update the task status (completed or not)
async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`${apiUrl}/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: status,
            }),
        });

        if (response.status !== 200) {
            console.error("Failed to update task status");
        }
    } catch (error) {
        console.error("Error updating task status:", error);
    }
}

// Add a click event listener to the "Add Task" button
addButton.addEventListener("click", addTask);

// Fetch tasks when the page loads
fetchTasks();
