const API_URL = "https://kodiraonica-todos.herokuapp.com/api";

async function getAllTodos() {
  return await fetch(`${API_URL}/todos`);
}

async function createTodo(value) {
  return await fetch(`${API_URL}/todo`, {
    method: "POST",
    body: JSON.stringify({
      title: value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

async function removeTodo(id) {
  return await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE"
  });
}