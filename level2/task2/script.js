let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") return;

    tasks.push({ text: task, completed: false });
    input.value = "";

    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
            <li class="${task.completed ? 'completed' : ''}">
                <span onclick="toggleTask(${index})">${task.text}</span>
                <div class="actions">
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            </li>
        `;
    });
}

// Load tasks on page start
renderTasks();