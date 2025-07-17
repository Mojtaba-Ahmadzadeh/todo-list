// ==== Imports ====
import { loadTodos } from "./storage.js";
import { addTodo, setTodos, todos } from "./todo.js";
import { updateCharCount, clearError, showError, renderTodos } from "./ui.js";
import { exportAsJSON, exportAsCSV, exportAsPDF } from "./export.js";
import { initThemeToggle } from "./theme.js";
import { validateInput } from "./utils.js";

// ==== DOM References ====
const $ = document;
const form = $.getElementById("todo-form");
const input = $.getElementById("todo-input");
const loader = $.getElementById("loader");
const starsContainer = $.getElementById("difficulty-stars");
const stars = starsContainer.querySelectorAll(".star");
const colorOptions = $.querySelectorAll(".color-option");
const filterSelect = $.getElementById("filter-select");
const descriptionInput = $.getElementById("todo-description");
const sortSelect = document.getElementById("sort-select");

// ==== State ====
let selectedDifficulty = 0;
let selectedColor = null;
let currentFilter = "all";

// ==== Color Picker ====
colorOptions.forEach(option => {
  option.addEventListener("click", () => {
    selectedColor = option.dataset.color;
    input.style.backgroundColor = selectedColor;
  });
});

// ==== Filtering ====
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

  const sortType = sortSelect.value;
  if (sortType === "difficulty-asc") {
    filtered.sort((a, b) => a.difficulty - b.difficulty);
  } else if (sortType === "difficulty-desc") {
    filtered.sort((a, b) => b.difficulty - a.difficulty);
  }

  renderTodos(filtered);
}

sortSelect.addEventListener("change", () => {
  filterTodos(currentFilter); // اعمال مجدد فیلتر با ترتیب جدید
});

filterSelect.addEventListener("change", () => {
  filterTodos(filterSelect.value);
});

// ==== Stars (Difficulty) ====
function updateStars() {
  stars.forEach((star, i) => {
    star.classList.toggle("selected", i < selectedDifficulty);
  });
}

function highlightStars(level) {
  stars.forEach((star, i) => {
    star.classList.toggle("hovered", i < level);
  });
}

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

// ==== Loader ====
function hideLoader() {
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}

// ==== Load & Render ====
function loadAndRenderTodos() {
  const savedTodos = loadTodos();
  setTodos(savedTodos);
  renderTodos();
}

// ==== Add Todo ====
function handleAddTodo(e) {
  e.preventDefault();
  clearError();

  const text = input.value.trim();
  const description = descriptionInput.value.trim();

  if (!validateInput(text, showError)) return;

  addTodo(text, selectedDifficulty, selectedColor, description);

  // Reset input and state
  input.value = "";
  descriptionInput.value = "";
  selectedDifficulty = 0;
  selectedColor = null;
  input.style.backgroundColor = "#fff";

  updateStars();
  updateCharCount();
  filterTodos(currentFilter);
}

// ==== Event Listeners ====
function initEventListeners() {
  input.addEventListener("input", () => {
    updateCharCount();
    clearError();
  });

  form.addEventListener("submit", handleAddTodo);

  // Export Buttons
  $.getElementById("export-json").addEventListener("click", exportAsJSON);
  $.getElementById("export-csv").addEventListener("click", exportAsCSV);
  $.getElementById("export-pdf").addEventListener("click", exportAsPDF);
}

// ==== Init App ====
function initApp() {
  initThemeToggle();
  loadAndRenderTodos();
  initEventListeners();
  updateCharCount();
  updateStars();
  filterTodos(currentFilter);
}

// ==== Start ====
window.addEventListener("load", () => {
  hideLoader();
  initApp();
});

// ==== Export ====
export { filterTodos, currentFilter };
