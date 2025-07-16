import { loadTodos } from "./storage.js";
import { addTodo, setTodos, todos } from "./todo.js";
import { updateCharCount, clearError, showError, renderTodos } from "./ui.js";
import { initThemeToggle } from "./theme.js";
import { validateInput } from "./utils.js";

const $ = document;

const form = $.getElementById("todo-form");
const input = $.getElementById("todo-input");
const loader = $.getElementById("loader");
const starsContainer = $.getElementById("difficulty-stars");
const stars = starsContainer.querySelectorAll(".star");
const colorOptions = document.querySelectorAll('.color-option');
const filterSelect = document.getElementById("filter-select");

let selectedDifficulty = 0;
let selectedColor = null;
let currentFilter = "all";

// Update input background and selected color on color option click
colorOptions.forEach(option => {
  option.addEventListener("click", () => {
    selectedColor = option.dataset.color;
    input.style.backgroundColor = selectedColor;
  });
});

// Filter todos based on current filter type and render
function filterTodos(type) {
  currentFilter = type;

  let filtered = [];

  if (type === "completed") {
    filtered = todos.filter(todo => todo.completed && !todo.deleted);
  } else if (type === "active") {
    filtered = todos.filter(todo => !todo.completed && !todo.deleted);
  } else if (type === "deleted") {
    filtered = todos.filter(todo => todo.deleted);
  } else {
    filtered = todos.filter(todo => !todo.deleted);
  }

  renderTodos(filtered);
}

// Listen to filter dropdown changes
filterSelect.addEventListener("change", () => {
  filterTodos(filterSelect.value);
});

// Update stars UI based on selected difficulty
function updateStars() {
  stars.forEach((star, i) => {
    star.classList.toggle("selected", i < selectedDifficulty);
  });
}

// Highlight stars on hover
function highlightStars(level) {
  stars.forEach((star, i) => {
    star.classList.toggle("hovered", i < level);
  });
}

// Stars event listeners for click and hover
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedDifficulty = index + 1;
    updateStars();
  });
  star.addEventListener("mouseover", () => {
    highlightStars(index + 1);
  });
  star.addEventListener("mouseout", () => {
    updateStars();
  });
});

// Hide the loading overlay smoothly
function hideLoader() {
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}

// Load todos from storage and render
function loadAndRenderTodos() {
  const savedTodos = loadTodos();
  setTodos(savedTodos);
  renderTodos();
}

// Handle form submit to add new todo
function handleAddTodo(e) {
  e.preventDefault();
  clearError();

  const text = input.value.trim();
  if (!validateInput(text, showError)) return;

  addTodo(text, selectedDifficulty, selectedColor);

  // Reset input and selections after adding
  input.value = "";
  selectedDifficulty = 0;
  selectedColor = null;
  input.style.backgroundColor = '#fff';
  updateStars();
  updateCharCount();
  filterTodos(currentFilter); // Refresh filtered list after add
}

// Setup input and form event listeners
function initEventListeners() {
  input.addEventListener("input", () => {
    updateCharCount();
    clearError();
  });

  form.addEventListener("submit", handleAddTodo);
}

// Initialize app on page load
function initApp() {
  initThemeToggle();
  loadAndRenderTodos();
  initEventListeners();
  updateCharCount();
  updateStars();
  filterTodos(currentFilter); // Apply filter initially
}

window.addEventListener("load", () => {
  hideLoader();
  initApp();
});

export { filterTodos, currentFilter };
