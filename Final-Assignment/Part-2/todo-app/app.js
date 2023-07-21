const todoForm = document.querySelector(".add-todo-form");
const todoList = document.querySelector(".todo-list");
const deletedTodoList = document.querySelector(".todo-list-deleted");
let todos = getLocalStorage("todos");
let deletedTodos = getLocalStorage("todos-deleted");
let currentIndex = getLocalStorage("todos-current-idx");

function getUniqueIndex(){
    if (currentIndex === null){
        currentIndex = 0;
    }else {
        currentIndex += 1
    }
    // Save current index to localStorage
    localStorage.setItem("todos-current-idx", currentIndex);
    return currentIndex;
}

function loadList(){
    // Clear all existing child data
    while (todoList.hasChildNodes()){
        todoList.firstChild.remove();
    }

    while (deletedTodoList.hasChildNodes()){
        deletedTodoList.firstChild.remove();
    }

    if(todos != null){
        // Sort Array by index (Ascending order, smaller number first)
        todos.sort((a,b) => a.index - b.index);

        // Sort Array by priority (Descending order, larger number first)
        todos.sort((c,d) => d.priority - c.priority);
        
        // Load Each Item from Array
        todos.forEach(loadTodo);
        deletedTodos.forEach(loadDeletedTodo);
    }else {
        // Initialize as array if first time to store in localStorage.
        todos = [];
        deletedTodos = [];
    }

    // Save to Local Storage
    saveLocalStorage("todos", todos);
    saveLocalStorage("todos-deleted", deletedTodos);
}

function loadTodo(item, index, arr){
    // div - Todo Task
    let li = document.createElement('li');
    li.setAttribute("class", `todo-item`);
    todoList.appendChild(li);
   
    // Todo Item
    let div0 = document.createElement('div');
    div0.setAttribute("class", `todo-task`);
    div0.setAttribute("id", `todo-item-${index}`);
    div0.setAttribute("onblur", `saveTodo(${index})`);
    div0.setAttribute("contenteditable", "false");
    div0.textContent = arr[index].description;
    li.appendChild(div0);
    
    // div - Todo Button
    let div1 = document.createElement('div');
    div1.setAttribute("class", `todo-button`);
    li.appendChild(div1);
    
    // Edit Button
    let btnEdit = document.createElement('button');
    btnEdit.setAttribute("class", `btn-edit`);
    btnEdit.setAttribute("id", `btn-edit-item-${index}`);
    btnEdit.setAttribute("onclick", `editTodo(${index})`);
    btnEdit.textContent = "Edit";
    div1.appendChild(btnEdit);

    // Delete Button
    let btnDelete = document.createElement('button');
    btnDelete.setAttribute("class", `btn-delete`);
    btnDelete.setAttribute("id", `btn-delete-item-${index}`);
    btnDelete.setAttribute("onclick", `removeTodo(${index})`);
    btnDelete.textContent = "Delete";
    div1.appendChild(btnDelete);

    // Priority
    let div2 = document.createElement('div');
    div2.setAttribute("class", `priority`);
    li.appendChild(div2);

    // Priority Label
    let div3 = document.createElement('div');
    div3.setAttribute("class", `priority-label`);
    div3.textContent = "Priority:";
    div2.appendChild(div3);

    // Priority Dropdown
    let selectPriority = document.createElement('select');
    selectPriority.setAttribute("class", `priority-dropdown`);
    selectPriority.setAttribute("id", `priority-dropdown-${index}`);
    selectPriority.setAttribute("onblur", `savePriority(${index})`);
    selectPriority.setAttribute("disabled",'');
    div2.appendChild(selectPriority);

    // Priority Option
    for(let i=1; i<=5; i++){
        let selectOption = document.createElement('option');
        selectOption.setAttribute("value",i);
        if (arr[index].priority === i){
            selectOption.setAttribute("selected",'');
        }
        selectOption.textContent = i;
        selectPriority.appendChild(selectOption);
    }
        
    // Edit Button
    let btnEditPriority = document.createElement('button');
    btnEditPriority.setAttribute("class", `btn-edit-priority`);
    btnEditPriority.setAttribute("id", `btn-edit-priority-item-${index}`);
    btnEditPriority.setAttribute("onclick", `editPriority(${index})`);
    btnEditPriority.textContent = "Edit";
    div2.appendChild(btnEditPriority);
}

function loadDeletedTodo(item, index, arr){
    let li = document.createElement('li');
    li.setAttribute("class", `todo-item`);
    deletedTodoList.appendChild(li);

    let div1 = document.createElement('div')
    div1.textContent = arr[index].description;
    div1.setAttribute("class", `todo-task`);
    div1.setAttribute("id", `deleted-item-${index}`);
    li.appendChild(div1);

    let div2 = document.createElement('div')
    div2.setAttribute("class", `todo-button`);
    li.appendChild(div2);
    
    let btnRestore = document.createElement('button');
    btnRestore.textContent = "Restore";
    btnRestore.setAttribute("class", `btn-restore`);
    btnRestore.setAttribute("id", `btn-restore-item-${index}`);
    btnRestore.setAttribute("onclick", `restoreTodo(${index})`);
    div2.appendChild(btnRestore);
}

function addTodo(){
    const addTaskElem = document.querySelector('#add-task')
    const addPriorityElem = document.querySelector('#add-priority')
    const userTask = addTaskElem.value;
    const userPriority = Number(addPriorityElem.value);
    let todoObject = {index: getUniqueIndex(), description: userTask, priority: userPriority};

    // Validation to prevent empty todo
    if (userTask === ""){
        alert("No empty To-Do's allowed!")
        return;
    }

    // Save User Input
    console.log(todoObject);
    todos.push(todoObject);
    loadList();

    // Clear input after submit
    addTaskElem.value = "";
    addPriorityElem.value = "";
}

function editTodo(idx){
    const todoItem = document.querySelector(`#todo-item-${idx}`);
    todoItem.setAttribute("contenteditable", "true");
    todoItem.focus();
}

function saveTodo(idx){
    const todoItem = document.querySelector(`#todo-item-${idx}`);
    todoItem.setAttribute("contenteditable", "false");
    // Replace the edited content to Array.
    todos[idx].description = todoItem.textContent;

    // Reload everything.
    loadList();
}

function removeTodo(idx){
    // Declare deletedTodo object
    let deletedTodo = {index: todos[idx].index, description: todos[idx].description, priority: todos[idx].priority };
    
    // Save to delete array
    deletedTodos.push(deletedTodo);
    
    // Remove Todo from Array.
    todos.splice(idx,1);
    
    // Reload everything.
    loadList();
}

function restoreTodo(idx){
    console.log(`Restore Deleted Todo #${idx}!`);

    // Read deleted Todo with index
    let restoreIndex = deletedTodos[idx].index;
    let restoreDesc = deletedTodos[idx].description;
    let restorePriority = deletedTodos[idx].priority;
    let restoreObject = {index: restoreIndex, description: restoreDesc, priority: restorePriority};

    // Insert back into todo Array
    todos.splice(restoreIndex, 0, restoreObject);

    // Remove Deleted Todo from Array
    deletedTodos.splice(idx,1);

    // Reload everything.
    loadList();
}

function editPriority(idx){
    const priorityDropdown = document.querySelector(`#priority-dropdown-${idx}`);
    priorityDropdown.removeAttribute("disabled");
}

function savePriority(idx){
    const priorityDropdown = document.querySelector(`#priority-dropdown-${idx}`);
    priorityDropdown.setAttribute("disabled", '');
    // Replace the edited content to Array.  
    todos[idx].priority = Number(priorityDropdown.value);

    // Reload everything.
    loadList();
}

function saveLocalStorage(name, arr){
    let string = JSON.stringify(arr)
    localStorage.setItem(name, string)
}

function getLocalStorage(name){
    let arr = JSON.parse(localStorage.getItem(name));
    return arr;
}

// Execute Function
loadList();

// Prevent form refresh
todoForm.addEventListener('submit', (e) => e.preventDefault()); 