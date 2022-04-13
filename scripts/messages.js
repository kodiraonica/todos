const messages = {
    ERROR_MESSAGE_EMPTY: {
        text: "Item can't be empty", 
        status: "error"
    },
    ERROR_MESSAGE_ALREADY_EXISTS: {
        text: "Item already exists",
        status: "error"
    },
    ERROR_MESSAGE_SMTH_WENT_WRONG: {
        text: "Something went wrong",
        status: "error"
    },
    SUCCESS_MESSAGE_ITEM_REMOVED: {
        text: "Item removed",
        status: "success"
    },
    SUCCESS_MESSAGE_ITEM_ADDED: {
        text: "Item added",
        status: "success"
    },
    EMPTY_TODOS: {
        text: "You don't have any todos yet! Add new todo :)",
        status: "success"
    }
}

const { 
    ERROR_MESSAGE_EMPTY,
    ERROR_MESSAGE_ALREADY_EXISTS, 
    ERROR_MESSAGE_SMTH_WENT_WRONG, 
    SUCCESS_MESSAGE_ITEM_REMOVED,
    SUCCESS_MESSAGE_ITEM_ADDED,
    EMPTY_TODOS
} = messages;