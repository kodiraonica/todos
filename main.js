const button = document.getElementsByTagName("button")[0];
const input = document.getElementsByTagName("input")[0];
const form = document.getElementsByTagName("form")[0];
button.addEventListener("click", onButtonClick)

function onButtonClick(e){
    e.preventDefault();
    addTodoItem(input.value)
}

function addTodoItem(inputValue){
    if (inputValue.trim() == "") {
        showErrorMessage();
        return;
    }

    const list = document.getElementsByTagName("ul")[0];
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.innerHTML = inputValue;
    button.innerHTML = "remove";
    button.setAttribute("id", `removeBtn-${inputValue.trim().replaceAll(" ", "")}`);
    list.appendChild(listItem);
    listItem.appendChild(button);
    form.reset();
    removeTodoItem(button)
}

function removeTodoItem(button) {
    button.addEventListener("click", () => {
        button.parentElement.remove();
    });
}

function showErrorMessage() {
    const err = document.getElementsByClassName("error");
    if (err.length > 0) {
        return false;
    }

    const div = document.createElement("div");
    const body = document.getElementsByTagName("body")[0];
    div.setAttribute("class", "error")
    body.append(div);
    div.innerHTML = "Something is wrong with your todo! Try again."
    setTimeout(() => {
        div.remove();
    }, 3000)
}
