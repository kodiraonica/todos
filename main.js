const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
const LOCAL_STORAGE_KEY = "todos";
const API_URL = "https://kodiraonica-todos.herokuapp.com/api";
let itemValues = [];

loadTodoItems();

button.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoItem(input.value);
});

async function loadTodoItems() {
  try {
    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    itemValues = data;
    if (itemValues.length > 0) {
      itemValues.forEach((todoItem) => {
        const button = createRemoveButton(todoItem._id);
        createListItem(button, todoItem.title);
        removeTodoItem(button, todoItem._id);
        showMessage(
          SUCCESS_MESSAGE_ITEM_LOADED.text,
          SUCCESS_MESSAGE_ITEM_LOADED.status
        );
      });
    } else {
      showMessage(EMPTY_TODOS.text, EMPTY_TODOS.status);
    }
  } catch (e) {
    console.log(e);
  }
}

async function addTodoItem(value) {
  let button;
  const isTodoEmpty = value.trim() == "";
  const todoAlreadyExists = itemValues.filter((itemValue) => {
    if (itemValue.title == value) {
      return true;
    }
  });

  if (isTodoEmpty) {
    showMessage(ERROR_MESSAGES_EMPTY.text, ERROR_MESSAGES_EMPTY.status);
    return;
  }

  if (todoAlreadyExists.length > 0) {
    showMessage(
      ERROR_MESSAGE_ALREADY_EXISTS.text,
      ERROR_MESSAGE_ALREADY_EXISTS.status
    );
    return;
  }

  try {
    const response = await fetch(`${API_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({
        title: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    itemValues.push(data);
    button = createRemoveButton(data._id);
    createListItem(button, data.title);
    removeTodoItem(button, data._id);
    showMessage(
      SUCCESS_MESSAGE_ITEM_ADDED.text,
      SUCCESS_MESSAGE_ITEM_ADDED.status
    );
    resetForm();
  } catch (e) {
    console.log(e);
  }
}

function resetForm() {
  const form = document.getElementsByTagName("form")[0];
  form.reset();
}

function createRemoveButton(value) {
  const button = document.createElement("button");
  button.innerHTML = "remove";
  button.setAttribute("id", `removeBtn-${value}`);
  return button;
}

function createListItem(button, value) {
  const ul = document.getElementsByTagName("ul")[0];
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = value;
  li.appendChild(button);
}

function removeTodoItem(button, id) {
  button.addEventListener("click", async function () {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });
    try {
      if (response.status == 200) {
        button.parentElement.remove();
        const newItemValues = itemValues.filter(
          (itemValue) => itemValue._id !== id
        );
        itemValues = newItemValues;
        showMessage(
          SUCCESS_MESSAGE_ITEM_REMOVED.text,
          SUCCESS_MESSAGE_ITEM_REMOVED.status
        );
      } else {
        showMessage(
          ERROR_MESSAGE_SMTH_WENT_WRONG.text,
          ERROR_MESSAGE_SMTH_WENT_WRONG.status
        );
      }
    } catch (err) {
      showMessage(
        ERROR_MESSAGE_SMTH_WENT_WRONG.text,
        ERROR_MESSAGE_SMTH_WENT_WRONG.status
      );
    }
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
  }, 3000);
}
