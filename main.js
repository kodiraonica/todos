const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
let itemValues = [];
loadTodoItems();

button.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoItem(input.value);
});

function loadTodoItems() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todoItem) => {
      const button = document.createRemoveButton("todoItem");
      createListItem(button, todoItem);
      removeTodoItem(button, todoItem);
    });
    itemValues = todos;
  }
}

function addTodoItem(value) {
  if (value.trim() == "") {
    showErrorMessage("Item can't be empty");
    return;
  }

  if (!itemValues.includes(value)) {
    itemValues.push(value);
  } else {
    showErrorMessage("Item already exists");
    return;
  }

  localStorage.setItem("todos", JSON.stringify(itemValues));
  const button = document.createElement("button");
  button.innerHTML = "remove";
  button.setAttribute("id", `removeBtn-${value.trim().replaceAll(" ", "")}`);
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
    localStorage.setItem("todos", JSON.stringify(itemValues));
  });
}

function showErrorMessage(message) {
  const err = document.getElementsByClassName("error");
  if (err.length > 0) {
    err[0].innerHTML = message;
    return false;
  }

  const div = document.createElement("div");
  const body = document.getElementsByTagName("body")[0];
  div.setAttribute("class", "error");
  body.append(div);
  div.innerHTML = message;
  setTimeout(() => {
    div.remove();
  }, 300000);
}
