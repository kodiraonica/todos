const button = document.getElementById("add");
const input = document.getElementsByTagName("input")[0];

button.addEventListener("click",function(e){
    e.preventDefault();
    addTodoItem(input.value)
});


function addTodoItem(value) {
    const li = document.createElement("li");
    const ul = document.getElementsByTagName("ul")[0];
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.setAttribute("id", `removeBtn-${value.trim().replaceAll(" ", "")}`);
    ul.appendChild(li);
    li.innerHTML = value;
    li.appendChild(button);
    removeTodoItem(button)
} 

function removeTodoItem(button)  {
        button.addEventListener("click",function(){
            button.parentElement.remove();
        })
}