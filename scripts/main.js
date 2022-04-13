const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
let itemValues;

loadTodoItems();

button.addEventListener("click", function(e){
    e.preventDefault();
    addTodoItem(input.value)
});

async function loadTodoItems() {
    try {
        const response = await getAllTodos();
        const data = await response.json();
        itemValues = data;

        if (itemValues.length > 0) {
            itemValues.forEach((todoValue) => {
                const button = createRemoveButton(todoValue._id);
                createListItem(button, todoValue.title);
                removeTodoItem(button, todoValue._id);
            });
        } else {
            showMessage(EMPTY_TODOS.text, EMPTY_TODOS.status);
        }
    } catch (e) {
        console.log(e)
    }
}

async function addTodoItem(value) {
    const isValid = isFormValid(value);
    if (!isValid) {
        resetForm();
        return;
    }

    try {
        const response = await saveTodoItem(value);
        const newTodoItem = await response.json();
        const button = createRemoveButton(newTodoItem._id);
        itemValues.push(newTodoItem);
        showMessage(SUCCESS_MESSAGE_ITEM_ADDED.text, SUCCESS_MESSAGE_ITEM_ADDED.status);
        removeTodoItem(button, newTodoItem._id);
        createListItem(button, newTodoItem.title);
        resetForm();
    } catch (e) {
        showMessage(e, "error");
    }
}

function removeTodoItem(button, id) {
    button.addEventListener("click", async function() {
        try {
            await deleteTodoItem(id);
            button.parentElement.remove();
            const newItemValues = itemValues.filter((item) => item._id !== id);
            itemValues = newItemValues;
            showMessage(SUCCESS_MESSAGE_ITEM_REMOVED.text, SUCCESS_MESSAGE_ITEM_REMOVED.status)
        } catch (e) {
            showMessage(ERROR_MESSAGE_SMTH_WENT_WRONG.text, ERROR_MESSAGE_SMTH_WENT_WRONG.status)
        }   
    });
}

function resetForm(){
    const form = document.getElementsByTagName("form")[0];
    form.reset();
}

function createListItem(button, value) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li);
    span.innerHTML = value;
    li.appendChild(span);
    li.appendChild(button);
}

function createRemoveButton(value){
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.setAttribute("class", "removeBtn");
    button.setAttribute("id", value);
    return button;
}