const fs = require("fs");
const { json } = require("stream/consumers");
const filePath = "./tasks.json";

const loadTask = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTask();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task Added ", task);
};

const listTasks = () => {
  const tasks = loadTask();
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task.task}`);
  });
};

const removetask = (taskIndex) => {
  const tasks = loadTask();

  if (taskIndex < 1 || taskIndex > tasks.length) {
    console.log("Invalid task Number");
    return;
  }
  const removedTask = tasks.splice(taskIndex - 1, 1);
  saveTasks(tasks);
  console.log(`Removed task: ${removedTask[0].task}`);
};

const command = process.argv[2];
const argument = process.argv[3];

// Command line structure => todo/todo.js add "make chai"
// argv[0] => folder
// argv[1] => file
// argv[2] => command
// argv[3] => argument

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removetask(parseInt(argument));
} else {
  console.log("Command not found");
}
