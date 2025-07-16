import { todos, toggleCompleted, deleteTodo } from "./todo.js";
import { MAX_LENGTH } from "./utils.js";

const $ = document;

const list = $.getElementById("todo-list");
const input = $.getElementById("todo-input");
const charCount = $.getElementById("char-count");
const errorBox = $.getElementById("error-box");

function getStarsHTML(count) {
  return Array(count).fill("⭐").join("");
}

function createTodoElement(todo, index) {
  const li = $.createElement("li");
  li.className = "todo-item";
  
  if (todo.completed) li.classList.add("completed");

  if (todo.color) {
    li.style.backgroundColor = todo.color;
  }

  const textSpan = $.createElement("span");
  textSpan.className = "todo-text";
  textSpan.textContent = todo.text;

  const starsSpan = $.createElement("span");
  starsSpan.className = "todo-stars";
  starsSpan.innerHTML = getStarsHTML(todo.difficulty || 0);

  const actions = $.createElement("div");
  actions.className = "task-actions";

  const doneBtn = $.createElement("button");
  doneBtn.innerHTML = "✅";
  doneBtn.title = "Mark as done";
  doneBtn.dataset.index = index;
  doneBtn.addEventListener("click", () => toggleCompleted(index));

  const deleteBtn = $.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete task";
  deleteBtn.dataset.index = index;
  deleteBtn.addEventListener("click", () => deleteTodo(index));

  actions.append(doneBtn, deleteBtn);
  li.append(textSpan, starsSpan, actions);

  return li;
}

export function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    list.appendChild(todoElement);
  });
}

export function updateCharCount() {
  const length = input.value.trim().length;
  charCount.textContent = `${length}/${MAX_LENGTH} characters`;

  const hasError = length === 0 || length > MAX_LENGTH;
  charCount.classList.toggle("error", hasError);
  input.classList.toggle("error", hasError);
}

export function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
  input.classList.add("error");
}

export function clearError() {
  errorBox.style.display = "none";
  input.classList.remove("error");
}
