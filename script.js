// Get required elements from the DOM
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-btn');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
  // Clear the existing task list
  todoList.innerHTML = '';

  // Render each task as a list item
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;

    // Add a "completed" class to completed tasks
    if (task.completed) {
      listItem.classList.add('completed');
    }

    // Add event listener for task completion
    listItem.addEventListener('click', function () {
      toggleTaskCompletion(index);
    });

    // Append the list item to the task list
    todoList.appendChild(listItem);
  });

  // Update local storage
  saveTasks();
}

// Function to add a new task
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };

    tasks.push(task);
    renderTasks();
    todoInput.value = '';
  }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for add button click
addBtn.addEventListener('click', addTodo);

// Event listener for Enter key press in the input field
todoInput.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    addTodo();
  }
});

// Event listener for clear button click
clearBtn.addEventListener('click', clearCompletedTasks);

// Render initial tasks
renderTasks();
