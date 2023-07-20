// Define the API endpoint
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Fetch todos from the API
async function fetchTodos() {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json();

        // Clear the existing todo list
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';

        // Add each todo item to the list
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Add a new todo to the API
async function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoTitle = todoInput.value.trim();

    if (todoTitle === '') {
        return;
    }

    const todo = {
        title: todoTitle,
        completed: false
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (response.ok) {
            todoInput.value = '';
            fetchTodos();
        } else {
            console.error('Error adding todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Handle form submission
const addTodoForm = document.getElementById('add-todo-form');
addTodoForm.addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
});

// Fetch todos when the page loads
fetchTodos();
