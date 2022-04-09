const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
const LOCAL_STORAGE_KEY = "todos"
let itemValues = [];

loadTodoItems();

button.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoItem(input.value);
});

function loadTodoItems() {
  const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (todos) {
    todos.forEach((todoItem) => {
      const button = document.createRemoveButton("todoItem");
      createListItem(button, todoItem);
      removeTodoItem(button, todoItem);
      showMessage("Items loades", "success")
    });
    itemValues = todos;
  }
}

function addTodoItem(value) {
  if (value.trim() == "") {
    showMessage("Item can't be empty", "error");
    return;
  }

  if (!itemValues.includes(value)) {
    itemValues.push(value);
  } else {
    showMessage("Item already exists", "error");
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemValues));
  const button = createRemoveButton(value);
  createListItem(button, value);
  removeTodoItem(button, value);
  resetForm();
}

function resetForm() {
  const form = document.getElementsByTagName("form")[0];
  form.reset();
}

function createRemoveButton(value) {
  const button = document.createElement("button");
  button.innerHTML = "remove";
  button.setAttribute("id", `removeBtn-${value.trim().replaceAll(" ", "")}`);
  return button;
}

function createListItem(button, value) {
  const ul = document.getElementsByTagName("ul")[0];
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = value;
  li.appendChild(button);
}

function removeTodoItem(button, value) {
  button.addEventListener("click", function () {
    button.parentElement.remove();
    const newItemValues = itemValues.filter((itemValue) => itemValue !== value);
    itemValues = newItemValues;
    showMessage("Item removed", "success")
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(itemValues));
  });
}

function showMessage(message, status) {
  const err = document.getElementsByClassName(status);
  if (err.length > 0) {
    err[0].innerHTML = message;
    return false;
  }

  const div = document.createElement("div");
  const body = document.getElementsByTagName("body")[0];
  div.setAttribute("class", status);
  body.append(div);
  div.innerHTML = message;
  setTimeout(() => {
    div.remove();
  }, 300000);
}
