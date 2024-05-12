var value;
var i;

if (localStorage.getItem("i") == null) {
     i = 0;
}
else {
    i = localStorage.getItem("i");
}

for (let k = 1; k <= localStorage.getItem("i"); k++) {
    if (localStorage.getItem(`value${k}`) == null) {
        continue;
    }
    else {
        document.querySelector(".todoList").innerHTML += localStorage.getItem(`value${k}`);
    }
}

function add() {
    if(document.getElementById("todoText").value.trim()) {
        i++;
        value = document.getElementById("todoText").value;
        document.querySelector(".todoList").innerHTML += `<div class="todolistExampleBox values${i}">
                <input type="checkbox" class="completedCheckbox" onchange="toggleCompletion(${i})">   
                <input type="text" class="todolistTextExample value${i}" value="${value}" onclick="edit(${i})"></input>
                <i class="fa-regular fa-trash-can symbol${i}" onclick="remove(${i})"></i>
                <i class="fa-regular fa-floppy-disk save${i}" onclick="save(${i})" style="display: none;"></i>
            </div>`

        console.log(i);
        localStorage.setItem(`value${i}`, `<div class="todolistExampleBox values${i}">
        <input type="checkbox" class="completedCheckbox" onchange="toggleCompletion(${i})">
        <input type="text" class="todolistTextExample value${i}" value="${value}" onclick="edit(${i})"></input>
        <i class="fa-regular fa-trash-can symbol${i}" onclick="remove(${i})"></i>
        <i class="fa-regular fa-floppy-disk save${i}" onclick="save(${i})" style="display: none;"></i>
        </div>`);
        localStorage.setItem("i", i);
        document.getElementById("todoText").value = "";
    }
}

function remove(a) {
    console.log(a);
    document.querySelector(`.values${a}`).outerHTML = "";
    localStorage.removeItem(`value${a}`);
    localStorage.setItem("i", i);
}

document.getElementById("todoText").addEventListener("keypress",
    function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("todoAddButton").click();
        }
    }
)

function edit(thisValue){
    console.log(thisValue);
    document.querySelector(`.symbol${thisValue}`).style.display = "none";
    document.querySelector(`.save${thisValue}`).style.display = "flex";
}

function save(b){
    document.querySelector(`.symbol${b}`).style.display = "flex";
    document.querySelector(`.save${b}`).style.display = "none";
    
    localStorage.setItem(`value${b}`,`<div class="todolistExampleBox values${b}">
    <input type="checkbox" class="completedCheckbox" onchange="toggleCompletion(${i})">
    <input type="text" class="todolistTextExample value${b}" value="${document.querySelector(`.value${b}`).value}" onclick="edit(${b})"></input>
    <i class="fa-regular fa-trash-can symbol${b}" onclick="remove(${b})"></i>
    <i class="fa-regular fa-floppy-disk save${i}" onclick="save(${i})" style="display: none;"></i>
    </div>`)
}

function toggleCompletion(index) {
    let checkbox = document.querySelector(`.values${index} .completedCheckbox`);
    let todoText = document.querySelector(`.values${index} .todolistTextExample`);
    if (checkbox.checked) {
        todoText.style.textDecoration = "line-through";
    } else {
        todoText.style.textDecoration = "none";
    }
}

function filterTodos(filterType) {
    let todos = document.querySelectorAll(".todolistExampleBox");
    todos.forEach(todo => {
        switch (filterType) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.querySelector(".completedCheckbox").checked) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "active":
                if (!todo.querySelector(".completedCheckbox").checked) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
