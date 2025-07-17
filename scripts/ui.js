import { todos, toggleCompletedById, deleteTodoById } from "./todo.js";
import { MAX_LENGTH } from "./utils.js";
import { filterTodos, currentFilter } from "./main.js";

const $ = document;

const list = $.getElementById("todo-list");
const input = $.getElementById("todo-input");
const charCount = $.getElementById("char-count");
const errorBox = $.getElementById("error-box");

// Generate stars for difficulty display
function getStarsHTML(count) {
  return Array(count).fill("⭐").join("");
}

function createTodoElement(todo, index) {
  const li = document.createElement("li");
  li.className = "todo-item";

  if (todo.completed) li.classList.add("completed");
  if (todo.deleted) li.classList.add("deleted");

  if (todo.color) {
    li.style.backgroundColor = todo.color;
  }

  const textSpan = document.createElement("span");
  textSpan.className = "todo-text";
  textSpan.textContent = todo.text;

  const descriptionSpan = document.createElement("p");
  descriptionSpan.className = "todo-description";
  descriptionSpan.textContent = todo.description || "";

  const starsSpan = document.createElement("span");
  starsSpan.className = "todo-stars";
  starsSpan.innerHTML = getStarsHTML(todo.difficulty || 0);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "✅";
  doneBtn.title = "Mark as done";
  doneBtn.dataset.index = index;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete task";
  deleteBtn.dataset.index = index;

  // Disable buttons if todo is marked deleted
  if (todo.deleted) {
    doneBtn.disabled = true;
    deleteBtn.disabled = true;
    doneBtn.style.opacity = "0.5";
    deleteBtn.style.opacity = "0.5";
  } else {
    doneBtn.addEventListener("click", () => {
      toggleCompletedById(todo.id);
      filterTodos(currentFilter);
    });
    deleteBtn.addEventListener("click", () => {
      deleteTodoById(todo.id);
      filterTodos(currentFilter);
    });
  }

  actions.append(doneBtn, deleteBtn);

  // اضافه کردن عناصر به ترتیب صحیح
  li.append(textSpan, descriptionSpan, starsSpan, actions);

  return li;
}

// Render list of todos (filtered or full)
export function renderTodos(filteredTodos = todos) {
  list.innerHTML = "";
  filteredTodos.forEach((todo, index) => {
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
