class Todo {
    constructor(todoTask) {
        this.todoId = todoList.length + 1;
        this.todoTask = todoTask;
        this.todoStatus = "❌";
    }

    readTodo() {
        console.log(`You have ${todoList.length} todo!`);
        todoList.forEach((todo) => {
            console.log(`#${todo.todoId} - ${todo.todoTask} - ${todo.todoStatus}`);
        })
    }

    addTodo(obj) {
        todoList.push(obj);
        console.log(`Todo task Id ${obj.todoId} created with task ${obj.todoTask}`);
    }

    editTodo(todoId, todoItem) {
        console.log(todoList);
        todoList[todoId - 1].todoTask = todoItem;
        console.log(`Todo Id ${todoId} edited.`);
    }

    completeTodo(todoId) {
        todoList[todoId - 1].todoStatus = "✅";
        console.log(`Todo Id ${todoId} mark completed.`);
    }

    deleteTodo(todoId) {
        todoList.splice(todoId - 1, 1);
        console.log(`Todo Id ${todoId} deleted.`);
    }
}

class TodoApp extends Todo {
    constructor() {
        super();
        this.quitApp = false;
    }

    start() {
        while (!this.quitApp) {
            // Render menu
            this.renderMenu();

            // Ask question
            const option = prompt('Enter (1/2/3/4/5/6):');
            console.log(option);

            switch (option) {
                case '1':
                    super.readTodo();
                    break;
                case '2':
                    const task = prompt('Enter your task:');
                    const itemObj = new Todo(task);
                    super.addTodo(itemObj);
                    break;
                case '3':
                    const editTodoId = prompt('Enter the todo id you want to edit:');
                    const todoItem = prompt('Change the todo item to:');
                    super.editTodo(editTodoId, todoItem);
                    break;
                case '4':
                    const completeTodoId = prompt('Enter the todo id you want to toggle complete:');
                    super.completeTodo(completeTodoId);
                    break;
                case '5':
                    const deleteTodoId = prompt('Enter the todo id you want to delete:');
                    super.deleteTodo(deleteTodoId);
                    break;
                case '6':
                    console.log('Quit app');
                    this.quitApp = true;
                    break;
            }
        }
    }

    renderMenu() {
        console.log('');
        console.log('--------- TODO APP ---------');
        console.log('What would you like to do?');
        console.log('1  View my todo list');
        console.log('2  Add new todo');
        console.log('3  Edit a todo item');
        console.log('4  Toggle complete a todo');
        console.log('5  Delete a todo');
        console.log('6  Quit app');
        console.log('');
    }
}

// Import prompt sync
const prompt = require('prompt-sync')();
let todoList = [];
const todoSession = new TodoApp();
todoSession.start();