// Creating variables
const toDoInput = document.querySelector("#todo-input");
const addItemBtn = document.querySelector("#add-item-btn");
const todos = document.querySelector("#todos");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const noOfTodos = document.querySelector("#numbers-of-todos");
const filter = document.querySelector("#filters");
const themeToggleBtn = document.querySelector("#toggle-theme");
let myBool = true;

// Event Listners
addItemBtn.addEventListener("click", addItems);
addItemBtn.addEventListener("click", totalItemsLeft);
addItemBtn.addEventListener("click", updateWhileFiltering);
toDoInput.addEventListener("keypress", addItemsWithEnter);
clearCompletedBtn.addEventListener("click", clearCompleted);
filter.addEventListener("click", filterFunction);
todos.addEventListener("click", updateWhileFiltering);
themeToggleBtn.addEventListener("click", toggleTheme);

// Functions
function addItems(event) {
  // Creating a new todo
  let todoItemDiv = document.createElement("li");
  todoItemDiv.classList.add("todo-item-div", "active-items");
  let markCompletionTodo = document.createElement("input");
  markCompletionTodo.type = "checkbox";
  markCompletionTodo.classList.add("mark-completion-todo", "fas", "fa-check");
  let crossDelete = document.createElement("input");
  crossDelete.type = "checkbox";
  crossDelete.classList.add("cross-delete-todo", "fas", "fa-times");
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.innerText = toDoInput.value;
  todoItemDiv.appendChild(markCompletionTodo);
  todoItemDiv.appendChild(todoItem);
  todoItemDiv.appendChild(crossDelete);
  todos.appendChild(todoItemDiv);

  // Resetting input section
  toDoInput.value = "";

  // Adding eventListener to element as they are created
  markCompletionTodo.addEventListener("click", completeOrNot);
  crossDelete.addEventListener("click", crossDeleteTodo);

  // Checking whether the dark mode is on or not for newly created elements
  if (myBool === false) {
    todoItemDiv.classList.toggle("dark");
    markCompletionTodo.classList.toggle("dark");
    todoItem.classList.toggle("dark");
    crossDelete.classList.toggle("dark");
  }

  // Toggling cross icon's visiblity
  todoItemDiv.addEventListener("mouseover", () => {
    crossDelete.style.opacity = "1";
  });
  todoItemDiv.addEventListener("mouseleave", () => {
    crossDelete.style.opacity = "0";
  });
}

function crossDeleteTodo(event) {
  let toDeleteDiv = event.target.parentElement;
  toDeleteDiv.remove();
}

function addItemsWithEnter(event) {
  if (event.key === "Enter") {
    addItems();
  }
}

function toggleMyBool() {
  myBool = !myBool;
}

function totalItemsLeft() {
  let currentNosOfTodosDiv = document.querySelectorAll(".todo-item-div");
  let currentNosOfTodos = currentNosOfTodosDiv.length;
  noOfTodos.innerText = `${currentNosOfTodos} items left`;
}

function activeItemsLeft() {
  let currentNosOfTodosDiv = document.querySelectorAll(".active-items");
  let currentNosOfTodos = currentNosOfTodosDiv.length;
  noOfTodos.innerText = `${currentNosOfTodos} items left`;
}

function completedItemsLeft() {
  let currentNosOfTodosDiv = document.querySelectorAll(".completed-items");
  let currentNosOfTodos = currentNosOfTodosDiv.length;
  noOfTodos.innerText = `${currentNosOfTodos} items left`;
}

function completeOrNot(event) {
  let markedItem = event.target;
  let markedItemParent = markedItem.parentElement;
  markedItemParent.classList.toggle("completed-items");
  markedItemParent.classList.toggle("active-items");
}

function clearCompleted() {
  let completedItems = document.querySelectorAll(".completed-items");
  completedItems.forEach((element) => {
    element.remove();
  });
  totalItemsLeft();
  completedItemsLeft();
}

function filterFunction(event) {
  let inputAll = document.querySelector("input[value='all']");
  let inputActive = document.querySelector("input[value='active']");
  let inputCompleted = document.querySelector("input[value='completed']");
  let eventTarget = event.target;
  if (eventTarget === inputAll) {
    showAll();
  } else if (eventTarget === inputActive) {
    showOnlyActive();
  } else if (eventTarget === inputCompleted) {
    showOnlyCompleted();
  }
}

function showAll() {
  let allItems = document.querySelectorAll(".todo-item-div");
  allItems.forEach((element) => {
    element.style.display = "flex";
  });
  totalItemsLeft();
}

function showOnlyActive() {
  let activeItems = document.querySelectorAll(".active-items");
  let completedItems = document.querySelectorAll(".completed-items");
  activeItems.forEach((element) => {
    element.style.display = "flex";
  });
  completedItems.forEach((element) => {
    element.style.display = "none";
  });
  activeItemsLeft();
}

function showOnlyCompleted() {
  let activeItems = document.querySelectorAll(".active-items");
  let completedItems = document.querySelectorAll(".completed-items");
  activeItems.forEach((element) => {
    element.style.display = "none";
  });
  completedItems.forEach((element) => {
    element.style.display = "flex";
  });
  completedItemsLeft();
}

function updateWhileFiltering() {
  let inputAll = document.querySelector("input[value='all']");
  let inputActive = document.querySelector("input[value='active']");
  let inputCompleted = document.querySelector("input[value='completed']");
  if (inputAll.checked === true) {
    totalItemsLeft();
    showAll();
  } else if (inputActive.checked === true) {
    activeItemsLeft();
    showOnlyActive();
  } else if (inputCompleted.checked === true) {
    completedItemsLeft();
    showOnlyCompleted();
  }
}

function toggleTheme() {
  let inputDiv = document.querySelector("#input");
  let footerInMain = document.querySelector("#footer-in-main");
  themeToggleBtn.classList.toggle("dark");
  document.body.classList.toggle("dark");
  todos.classList.toggle("dark");
  inputDiv.classList.toggle("dark");
  toDoInput.classList.toggle("dark");
  footerInMain.classList.toggle("dark");
  addItemBtn.classList.toggle("dark");
  multipleItemsDarkToggle();
  toggleMyBool();
}

function multipleItemsDarkToggle() {
  let markCompletionTodo = document.querySelectorAll(".mark-completion-todo");
  let crossDelete = document.querySelectorAll(".cross-delete-todo");
  let todoItemDiv = document.querySelectorAll(".todo-item-div");
  let todoItem = document.querySelectorAll(".todo-item");
  markCompletionTodo.forEach((element) => {
    element.classList.toggle("dark");
  });
  crossDelete.forEach((element) => {
    element.classList.toggle("dark");
  });
  todoItemDiv.forEach((element) => {
    element.classList.toggle("dark");
  });
  todoItem.forEach((element) => {
    element.classList.toggle("dark");
  });
}
