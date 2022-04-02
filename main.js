const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
const itemValues = [];

button.addEventListener("click", function(e) {
    e.preventDefault();
    addTodoItem(input.value)
})

function addTodoItem(value) {
    if (value.trim() == "") {
        showErrorMessage("Item can't be empty");
        return;
    }


    if (!itemValues.includes(value)) {
        itemValues.push(value)
    } else {
        showErrorMessage("Item already exists");
        return; 
    }

    const li = document.createElement("li");
    const ul = document.getElementsByTagName("ul")[0];
    const form = document.getElementsByTagName("form")[0];
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.setAttribute("id", `removeBtn-${value.trim().replaceAll(" ","")}`)
    ul.appendChild(li);
    li.innerHTML = value;
    li.appendChild(button);
    removeTodoItem(button);
    form.reset();
}

function removeTodoItem(button) {
    button.addEventListener("click", function(){
        button.parentElement.remove();
    })
}

function showErrorMessage(message) {
    const err = document.getElementsByClassName("error");
    if(err.length > 0) {
        return false;
    }
    const div = document.createElement("div");
    const body =document.getElementsByTagName("body")[0];
    div.setAttribute("class", "error");
    body.append(div);
    div.innerHTML = message;

    setTimeout(() => {
        div.remove();
    }, 3000)
}