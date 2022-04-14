const messages = {
    ERROR_MESSAGE_EMPTY :{
        text: "Item can't be empty",
        status: "error"
    },
    ERROR_MESSAGE_ALREDY_EXISTS: {
        text: "Item already exists",
        ststus: "error"
    },
    SUCCESS_MESSAGE_ITEMS_LOADED: {
        text: "Item loaded",
        ststus: "success"
    },
    SUCCESS_MESSAGE_ITEM_CREATED : {
        text: "Item created",
        status: "success"
    },
    SUCCESS_MESSAGE_ITEM_REMOVED: {
        text: "Item removed",
        status: "success"
    },
    EMPTY_TODOS: {
        text:"You don't have any todos yet: Add some",
        status:"success"
    },
    ERROR_MESSAGE_SMTH_WENT_WRONG: {
        text:"Something went wrong",
        status: "error"
    },
};

const {
    ERROR_MESSAGE_EMPTY,
    ERROR_MESSAGE_ALREDY_EXISTS,
    SUCCESS_MESSAGE_ITEMS_LOADED,
    SUCCESS_MESSAGE_ITEM_CREATED,
    SUCCESS_MESSAGE_ITEM_REMOVED,
    EMPTY_TODOS,
    ERROR_MESSAGE_SMTH_WENT_WRONG
} = messages;

const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];
const LOCAL_STORAGE_KEY = "todos";
const API_URL= "https://kodiraonica-todos.herokuapp.com/api"
let itemValues = [];
loadTodoItems();

button.addEventListener("click", function (e) {
    e.preventDefault();
    addTodoItem(input.value);
});

async function loadTodoItems() {
    await fetch(`${API_URL}/todos`)
    .then ((response)=>response.json())
    .then((res)=>itemValues = res)
    .catch((err)=> console.log(err));

    if (itemValues, length > 0) {
        itemValues.forEach((todoItem)=>{
            const button = createRemoveButton(todoItem._id);
            createListItem(button, todoItem.title);
            removeTodoItem(button, todoItem._id); 
            showMessage (
                SUCCESS_MESSAGE_ITEMS_LOADED.text,
                SUCCESS_MESSAGE_ITEMS_LOADED.status 
            );   
        });
    } else {
        showMessage(EMPTY_TODOS.text, EMPTY_TODOS.status);
    }
}
    
async function addTodoItem(value) {
    let button;
    const isTodoEmpty = value.trim() == "";
    const todoAlreadyExists = itemValues.filter((itemValue) => {
        if(itemValue.title == value) {
            return true;
        }
    })
    if(isTodoEmpty) {
        showMessage(ERROR_MESSAGE_EMPTY.text, ERROR_MESSAGE_EMPTY.status);
        return
    }
    if(todoAlreadyExists.length > 0) {
        showMessage(ERROR_MESSAGE_ALREDY_EXISTS.text, ERROR_MESSAGE_ALREDY_EXISTS.status);
        return;
    }

    await fetch (`${API_URL}/todo`, {
        method:"POST",
        body: JSON.stringify({
            title:value
        }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
    })

    .then ((response)=>response.json())
    .then((json) => {
        itemValues.push(value);
        const button = createRemoveButton(json._id);
        createListItem(button,json.title);
        removeTodoItem(button,json._id);
        showMessage(SUCCESS_MESSAGE_ITEM_CREATED.text,SUCCESS_MESSAGE_ITEM_CREATED.status);
        resetForm();
    })
    .catch((err) => console.log(err));
}

function resetForm() {
    const form = document.getElementsByTagName("form")[0];
    form.reset();
}

function createRemoveButton(id) {
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.setAttribute(
        "id", 
        `removeBtn-${id}`);
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
    button.addEventListener("click", async function() {
        console.log(itemValues)
        console.log(id)
        await fetch (`${API_URL}/delete/${id}`,{
        method: "DELETE"
    })
        .then((response) => {
            if(response.status == 200) {
                button.parentElement.remove();
                const newItemValues = itemValues.filter((itemValue) => itemValue._id !== id);
                console.log(newItemValues)  
                itemValues = newItemValues;
                showMessage(SUCCESS_MESSAGE_ITEM_REMOVED.text, SUCCESS_MESSAGE_ITEM_REMOVED.status);
            } else {
            showMessage(ERROR_MESSAGE_SMTH_WENT_WRONG.text, ERROR_MESSAGE_SMTH_WENT_WRONG.status);
        }
            
        })
    
        
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