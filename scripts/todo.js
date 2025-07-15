import { saveTodos } from "./storage.js";
import { renderTodos } from "./ui.js";

export let todos = [];

// DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Utility to generate star emojis based on difficulty
function getStarsHTML(count) {
  return Array(count).fill("⭐").join("");
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // Create a new <li> element for visual feedback (optional, since renderTodos will override it)
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <span class="todo-stars">${getStarsHTML(selectedDifficulty)}</span>
  `;
  todoList.appendChild(li);

  // Add new todo to the array and re-render the list
  addTodo(text, selectedDifficulty);

  // Clear input and reset difficulty
  input.value = "";
  selectedDifficulty = 0;

  // Update UI (stars and character counter)
  updateStars();
  updateCharCount();
});


// Replace current todos list with a new one
export function setTodos(newTodos) {
  todos = newTodos;
}


//  Add a new todo item
export function addTodo(text, difficulty) {
  todos.push({ text, difficulty, completed: false });
  saveTodos(todos);
  renderTodos();
}


// Toggle completed state of a todo item
export function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos(todos);
  renderTodos();
}


// Delete a todo item from the list
export function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}
