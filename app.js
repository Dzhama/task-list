// DEFINE UI VARS

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// LOAD ALL EVENT LISTENERS
loadEventListeners();


// LOAD ALL EVENT LISTENERS
function loadEventListeners() {
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event 
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear all the Tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter task events
    filter.addEventListener('keyup', filterTasks);
}

//Get task from Local Storage
function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
            // creating li element 
        const li = document.createElement('li');
        //add class
        li.className = "collection-item";
        //create a tex\t node and append to li 
        li.appendChild(document.createTextNode(task));
        // create new link to li
        const link = document.createElement('a');
        //add class
        link.className = "delete-item secondary-content";
        //add icon
        link.innerHTML = '<i class="fa fa-trash"></i>';
        // append link to li
        li.appendChild(link);
        // apend li to ul
        taskList.appendChild(li);
        // clear input
    })
};

// Add Task 
function addTask (e) {
    if(taskInput.value === '') {
        alert("add a task");
    }else {
        // creating li element 
        const li = document.createElement('li');
        //add class
        li.className = "collection-item";
        //create a tex\t node and append to li 
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link to li
        const link = document.createElement('a');
        //add class
        link.className = "delete-item secondary-content";
        //add icon
        link.innerHTML = '<i class="fa fa-trash"></i>';
        // append link to li
        li.appendChild(link);
        // apend li to ul
        taskList.appendChild(li);
        // clear input

        // store in LC
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
    // prevent from default
    }
    
    e.preventDefault();
}

// Store task in Local storage
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // pushing task to  tasks
    tasks.push(task);
    // converting array to string
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
       e.target.parentElement.parentElement.remove();
       
       //remove from LS
       removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
}

//Remove from Local Storage 
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
    //taskList.innerHTML = '';
    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTaskFromLocalStorage();
}

// Clear tasks from Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks 
function filterTasks (e) {
    //targeting input value
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }else {
            task.style.display = 'none';
        }
    })
}



