function isFormValid(value){
    const isTodoEmpty = value.trim() == "";
    const todoAlreadyExists = itemValues.filter((itemValue) => {
        if (itemValue.title == value) {
            return true;
        }
    });

    if (todoAlreadyExists.length > 0) {
        showMessage(ERROR_MESSAGE_ALREADY_EXISTS.text, ERROR_MESSAGE_ALREADY_EXISTS.status);
        return false; 
    } 

    if (isTodoEmpty) {
        showMessage(ERROR_MESSAGE_EMPTY.text, ERROR_MESSAGE_EMPTY.status);
        return false;
    }

    return true;
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
    }, 5000)
}