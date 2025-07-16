import { loadTodos } from "./storage.js";
import { addTodo, setTodos } from "./todo.js";
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

let selectedDifficulty = 0;
let selectedColor = null;

colorOptions.forEach(option => {
  option.addEventListener("click", () => {
    selectedColor = option.dataset.color;
    input.style.backgroundColor = selectedColor;
  });
});

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

function hideLoader() {
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}

function loadAndRenderTodos() {
  const savedTodos = loadTodos();
  setTodos(savedTodos);
  renderTodos();
}

function handleAddTodo(e) {
  e.preventDefault();
  clearError();

  const text = input.value.trim();
  if (!validateInput(text, showError)) return;

  addTodo(text, selectedDifficulty, selectedColor);

  input.value = "";
  selectedDifficulty = 0;
  selectedColor = null;
  input.style.backgroundColor = '#fff'
  updateStars();
  updateCharCount();
}

function initEventListeners() {
  input.addEventListener("input", () => {
    updateCharCount();
    clearError();
  });

  form.addEventListener("submit", handleAddTodo);
}

function initApp() {
  initThemeToggle();
  loadAndRenderTodos();
  initEventListeners();
  updateCharCount();
  updateStars();
}

window.addEventListener("load", () => {
  hideLoader();
  initApp();
});
