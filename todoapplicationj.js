let taskContainer = document.getElementById("todolistContainer");

function gettodoitem() {
    let todolistj = localStorage.getItem("todolist");
    let todoListp = JSON.parse(todolistj);

    if (todoListp === null) {
        return [];
    } else {
        return todoListp;
    }
}

let todoList = gettodoitem();

let addBtn = document.getElementById("addBtn");
let delBtn = document.getElementById("delIcon");
let userInput = document.getElementById("userInput");


function ontodochangestatus(checkboxId, labelId, todoId) {
    let check = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked-label");

    let todoindex = todoList.findIndex(function(i) {
        let Iid = "todo" + i.uniqueNo;
        if (Iid === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoobject = todoList[todoindex];

    if (todoobject.isChecked === true) {
        todoobject.isChecked = false;
    } else {
        todoobject.isChecked = true;
    }
}

function deletetodo(todoId) {
    let deleteElement = document.getElementById(todoId);
    taskContainer.removeChild(deleteElement);
    console.log(todoList);
    console.log(todoId);
    let deletetodoIndex = todoList.findIndex(function(i) {
        let Itodoid = "todo" + i.uniqueNo;
        if (Itodoid === todoId) {
            return true;
        } else {
            return false;
        }
    })
    todoList.splice(deletetodoIndex, 1);
}

function createTodoItem(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;

    let li = document.createElement("li");
    li.classList.add("d-block", "todoitem", "col-md-12", "d-flex", "flex-row");
    li.id = todoId;

    let input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("checkbox");
    input.id = checkboxId;
    input.checked = todo.isChecked;
    input.onclick = function() {
        ontodochangestatus(checkboxId, labelId, todoId);
    };

    li.appendChild(input);

    let parentdiv = document.createElement("div");
    parentdiv.classList.add("d-flex", "flex-row", "todotask");

    let div1 = document.createElement("div");

    let label = document.createElement("label");
    label.setAttribute("for", checkboxId);
    label.id = labelId;
    label.textContent = todo.text;
    if (todo.isChecked === true) {
        label.classList.add("checked-label");
    }
    div1.appendChild(label);



    let div2 = document.createElement("div");
    div2.classList.add("delete-icon");

    let deleteicon = document.createElement("i");
    deleteicon.classList.add("fa-regular", "fa-trash-can");
    deleteicon.id = "delIcon";
    deleteicon.onclick = function() {
        deletetodo(todoId);
    }
    div2.appendChild(deleteicon);

    parentdiv.appendChild(div1);
    parentdiv.appendChild(div2);

    li.appendChild(parentdiv);


    taskContainer.appendChild(li);



}



function Savetodo() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}

function onAddtodo() {
    let todoCount = todoList.length;

    let userInput = document.getElementById("userInput");
    let userInputValue = userInput.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount += 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    }
    todoList.push(newTodo);
    createTodoItem(newTodo);
    userInput.value = "";
}
for (let i of todoList) {
    createTodoItem(i);
}
