const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
const itemValues = [];
loadTodoItems();

button.addEventListener("click", function(e) {
    e.preventDefault();
    addTodoItem(input.value);
});

function loadTodoItems() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const ul = document.getElementsByTagName("ul")[0];
    if (todos) {
        todos.forEach((todoItem) => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerHTML = "remove";
            button.setAttribute(
                "id",
                `removeBtn-${todoItem.trim().replaceAll(" ", "")}`
            );
            li.innerHTML = todoItem;
            ul.append(li);
            li.append(button);
            removeTodoItem(button, todoItem);
        });
        itemValues = todos;
    }
}

//event lisener na novi remove button
//maknut list item od tog buttona, parent
//updejtat itemValues array tako da nema taj item
//spremiti updejtani itemValues array u local storage

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

    const li = document.createElement("li");
    const ul = document.getElementsByTagName("ul")[0];
    const form = document.getElementsByTagName("form")[0];
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.setAttribute("id", `removeBtn-${value.trim().replaceAll(" ", "")}`);
    ul.appendChild(li);
    li.innerHTML = value;
    li.appendChild(button);
    removeTodoItem(button, value);
    form.reset();
}

function removeTodoItem(button) {
    button.addEventListener("click", function() {
        button.parentElement.remove();
        const newItemValues = itemValues.filter((itemValue) => itemValue !== value);
        localStorage.setItem("todos", JSON.stringify(newItemValues));
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
    }, 3000);
}