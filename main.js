const messages = {
  ERROR_MESSAGES_EMPTY: {
    text: "Item can't be empty",
    status: "error",
  },
  ERROR_MESSAGES_ALREADY_EXIST: {
    text: "Item already exists",
    status: "error",
  },
  SUCCESS_MESSAGE_ITEM_LOADED: {
    text: "Item loaded",
    status: "success",
  },
  SUCCESS_MESSAGE_ITEM_REMOVED: {
    text: "Item removed",
    status: "success",
  },
  SUCCESS_MESSAGE_ITEM_ADDED: {
    text: "Item added",
    status: "success",
  },
  EMPTY_TODOS: {
    text: "You don't have any todos yet! Add some",
    status: "success",
  },
  ERROR_MESSAGE_SMTH_WENT_WRONG: {
    text: "Something went wrong",
    status: "error",
  },
};

const {
  ERROR_MESSAGES_EMPTY,
  ERROR_MESSAGES_ALREADY_EXIST,
  SUCCESS_MESSAGE_ITEM_LOADED,
  SUCCESS_MESSAGE_ITEM_REMOVED,
  SUCCESS_MESSAGE_ITEM_ADDED,
  EMPTY_TODOS,
  ERROR_MESSAGE_SMTH_WENT_WRONG,
} = messages;

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
  await fetch(`${API_URL}/todos`)
    .then((response) => response.json())
    .then((res) => (itemValues = res))
    .catch((err) => console.log(err));

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
}

async function addTodoItem(value) {
  console.log(value)
  let button;
  if (value.trim() == "") {
    showMessage(ERROR_MESSAGES_EMPTY.text, ERROR_MESSAGES_EMPTY.status);
    return;
  }

  if (!itemValues.includes(value)) {
    itemValues.push(value);
  } else {
    showMessage(ERROR_MESSAGES_EMPTY.text, ERROR_MESSAGES_EMPTY.status);
    return;
  }

  await fetch(`${API_URL}/todo`, {
    method: 'POST',
    body: JSON.stringify({
        title: value
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
  })
    .then((response) => response.json())
    .then((json) => {
      itemValues.push(json);
      button = createRemoveButton(json._id);
      createListItem(button, value);
      removeTodoItem(button, json._id);
      showMessage(
        SUCCESS_MESSAGE_ITEM_ADDED.text,
        SUCCESS_MESSAGE_ITEM_ADDED.status
      );
      resetForm();
    })
    .catch((err) => console.log(err));
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
    await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
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
    });
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
