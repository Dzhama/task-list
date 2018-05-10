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
    //add task event 
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear all the Tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter task events
    filter.addEventListener('keyup', filterTasks);
}

// Add Task 
function addTask (e) {
    if(taskInput.value === '') {
        alert("add a task");
    }
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
    taskInput.value = "";
    // prevent from default
    e.preventDefault();
}

// remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
       e.target.parentElement.parentElement.remove();
    }
}

// Clear tasks
function clearTasks() {
    //taskList.innerHTML = '';
    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

//filter Tasks 
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



