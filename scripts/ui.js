import { todos, toggleCompleted, deleteTodo } from "./todo.js";
import { MAX_LENGTH } from "./utils.js";

let $ = document

const list = $.getElementById("todo-list");
const input = $.getElementById("todo-input");
const charCount = $.getElementById("char-count");
const errorBox = $.getElementById("error-box");

// Generate HTML string with star emojis based on difficulty count
function getStarsHTML(count) {
  return Array(count).fill("⭐").join("");
}

//  Create a single <li> element representing a todo item
function createTodoElement(todo, index) {
  const li = $.createElement("li");
  li.className = "todo-item";
  
  // Add 'completed' class if todo is marked done
  if (todo.completed) li.classList.add("completed");

  // Span to show todo text
  const textSpan = $.createElement("span");
  textSpan.className = "todo-text";
  textSpan.textContent = todo.text;

  // Span to show stars representing difficulty
  const starsSpan = $.createElement("span");
  starsSpan.className = "todo-stars";
  starsSpan.innerHTML = getStarsHTML(todo.difficulty || 0);

  // Container for action buttons (done/delete)
  const actions = $.createElement("div");
  actions.className = "task-actions";

  // Done button with click event to toggle completion
  const doneBtn = $.createElement("button");
  doneBtn.innerHTML = "✅";
  doneBtn.title = "Mark as done";
  doneBtn.dataset.index = index;
  doneBtn.addEventListener("click", () => toggleCompleted(index));

  // Delete button with click event to remove todo
  const deleteBtn = $.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete task";
  deleteBtn.dataset.index = index;
  deleteBtn.addEventListener("click", () => deleteTodo(index));

  // Append buttons to actions container
  actions.append(doneBtn, deleteBtn);

  // Append text, stars, and actions to list item
  li.append(textSpan, starsSpan, actions);

  return li;
}

// Render the entire todos list in the UI
export function renderTodos() {
  list.innerHTML = "";  // Clear existing list items

  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    list.appendChild(todoElement);
  });
}

// Update the character count display below the input field
export function updateCharCount() {
  const length = input.value.trim().length;
  charCount.textContent = `${length}/${MAX_LENGTH} characters`;

// Add error styling if length is 0 or exceeds max length
  const hasError = length === 0 || length > MAX_LENGTH;
  charCount.classList.toggle("error", hasError);
  input.classList.toggle("error", hasError);
}


// Show an error message below the input
export function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
  input.classList.add("error");
}

// Hide the error message and remove error styles
 
export function clearError() {
  errorBox.style.display = "none";
  input.classList.remove("error");
}
