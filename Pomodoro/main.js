const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTime()
renderTasks()

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks()
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
            <div class="task">
                <div class="completed">${
                  task.completed
                    ? `<span class="done">Done</span>`
                    : `<button class="start-button" data-id="${task.id}">Start</button></div>`
                }
                <div class="title">${task.title}</div>
            </div>`;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll('.task .start-button');

  startButtons.forEach(startButton => {
    startButton.addEventListener('click', e => {
        if (!timer) {
            startButtonHandler(startButton.getAttribute("data-id"));
            startButton.textContent = "In progress...";
        }
    });
  });
}

function startButtonHandler(id) {
    time = 5
    current = id;
    const taskId = tasks.findIndex((task) => task.id === id);
    document.querySelector('#time #taskName').textContent = tasks[taskId].title;
    renderTime();
    timer = setInterval(() => {
        timerHandler(id);
    }, 1000);
}

function timerHandler(id = null) {
    time--;
    renderTime();
    if (time === 0) {
      clearInterval(timer);
      markCompleted(id);
      timer = null;
      renderTasks();
      startBreak();
    }
}

function startBreak() {
  time = 5;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000)
}

function timerBreakHandler() {
  time--;
    renderTime();
    if (time === 0) {
      clearInterval(timerBreak);
      current = null;
      timerBreak = null;
      taskName.textContent = '';
      renderTasks();
    }
}

function renderTime() {
  const timeDiv = document.querySelector('#time #value');
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds <10 ? "0" : ""}${seconds}`;
}

function markCompleted(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}
