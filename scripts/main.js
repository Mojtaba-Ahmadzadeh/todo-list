import { loadTodos } from "./storage.js";
import { addTodo, setTodos } from "./todo.js";
import { updateCharCount, clearError, showError, renderTodos } from "./ui.js";
import { initThemeToggle } from "./theme.js";
import { validateInput } from "./utils.js";

let $ = document

const form = $.getElementById("todo-form");
const input = $.getElementById("todo-input");
const loader = $.getElementById("loader");
const starsContainer = $.getElementById("difficulty-stars");
const stars = starsContainer.querySelectorAll(".star");

let selectedDifficulty = 0;

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const li = $.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <span class="todo-stars">${getStarsHTML(selectedDifficulty)}</span>
  `;
  todoList.appendChild(li);

  input.value = "";
  selectedDifficulty = 0;
  updateStars();
  updateCharCount?.();
});

export function initDifficultyStars(containerSelector = "#difficulty-stars") {
  const container = $.querySelector(containerSelector);
  const stars = container.querySelectorAll(".star");

  const updateStars = (hover = 0) => {
    stars.forEach(star => {
      const val = parseInt(star.dataset.value);
      star.classList.remove("selected", "hovered");
      if (hover && val <= hover) star.classList.add("hovered");
      else if (val <= selectedDifficulty) star.classList.add("selected");
    });
  };

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedDifficulty = parseInt(star.dataset.value);
      updateStars();
    });

    star.addEventListener("mouseenter", () => {
      updateStars(parseInt(star.dataset.value));
    });

    star.addEventListener("mouseleave", () => {
      updateStars();
    });
  });

  updateStars();
}

export function getSelectedDifficulty() {
  return selectedDifficulty;
}

// Hide the loader with a fade-out effect
function hideLoader() {
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}

// Load todos from localStorage and render them on the UI
function loadAndRenderTodos() {
  const savedTodos = loadTodos();
  setTodos(savedTodos);
  renderTodos();
}

// Handle adding a new todo item
function handleAddTodo(e) {
  e.preventDefault();
  clearError();

  const text = input.value.trim();

  if (!validateInput(text, showError)) return;

  addTodo(text, selectedDifficulty); // 👈 اضافه کردن درجه سختی
  input.value = "";
  selectedDifficulty = 0;
  updateStars();
  updateCharCount();
}

// Initialize event listeners for input and form submission
function initEventListeners() {
  input.addEventListener("input", () => {
    updateCharCount();
    clearError();
  });

  form.addEventListener("submit", handleAddTodo);
}

// Initialize the whole app: theme toggle, todos, event listeners, UI updates
function initApp() {
  initThemeToggle();
  loadAndRenderTodos();
  initEventListeners();
  updateCharCount();
  initDifficultyStars()
}

// Start the app after the window has fully loaded
window.addEventListener("load", () => {
  hideLoader();
  initApp();
});
