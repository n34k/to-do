const ToDo = (() => {
    const projectsList = [];
    function Project(name) {
        this.name = name;
        this.tasks = [];
    }

    const addProj = (name) => {
        const project = new Project(name);
        projectsList.push(project);    
    } 

    function Task(title, dueDate, details, done) {
        this.title = title;
        this.dueDate = dueDate;
        this.details = details;
        this.done = done;
    }
 
    const addTask = (project, title, dueDate, details, done) => {
        const task = new Task(title, dueDate, details, done);
        project.tasks.push(task);
    }

    return {projectsList, addProj, addTask};
})();

const DOM = (() => {
    let currentProj = 0;
    const addProjButton = document.querySelector(".add-button");
    const projBox = document.querySelector(".projects");
    const tasks = document.querySelector(".tasks");
    const addProjBox = document.querySelector(".add-proj-box")
    const x1 = document.getElementById("x1");
    const x2 = document.getElementById("x2");
    const submitProj = document.getElementById("add1");
    const submitTask = document.getElementById("add2");
    const projInput = document.querySelector(".project-input");
    const addTaskBox = document.querySelector(".add-task-box");
    const overlay = document.querySelector('.overlay');
    const taskNameInput = document.getElementById("task-name");
    const taskDateInput = document.getElementById("task-date");
    const taskDetailInput = document.getElementById("task-detail");
    const addTaskButtonDiv = document.querySelector(".add-task");
    

    const removeChildren = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    const boxOn = (box) => {
        box.style.display = "flex";
        overlay.style.display = 'block';
    }

    const boxOff = (box) => {
        box.style.display = "none";
        overlay.style.display = 'none';
    }

    const addProjClick = () => {
        addProjButton.addEventListener("click", () => {
            boxOn(addProjBox);
        })
    }

    const xClick = (x, box) => {
        x.addEventListener('click', () => {
            boxOff(box);
        })
    }

    const xClicks = () => {
        xClick(x1, addProjBox);
        xClick(x2, addTaskBox);
    }

    const submitProjClick = () => {
        submitProj.addEventListener("click", () => {
            if(projInput.value == "") {
                console.log("bruh");
            }
            else {
                const projectName = projInput.value;
                ToDo.addProj(projectName);           
                boxOff(addProjBox);
                projInput.value = '';
                loadProjects();  // HERE THIS IS THE DANGER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
        })
    }

    const loadProjects = ()  => {
        removeChildren(projBox);
        for (let i = 0; i < ToDo.projectsList.length; i++) {
            const projectName = document.createElement("h4");
            projectName.innerHTML = `${i + 1}. ${ToDo.projectsList[i].name}`;
            projBox.appendChild(projectName);
            projectNameClick(projectName);
        }
    }

    const projectNameClick = (projectName) => {
        const projectNameHandler = () => {
            currentProj = parseInt(projectName.innerHTML[0] - 1);
            console.log(currentProj);
            loadTasks();
        }  
        projectName.removeEventListener("click", projectNameHandler);
        projectName.addEventListener("click", projectNameHandler);   
    }

    const loadTasks = () => {
        taskNameInput.value = "";    // Clear task input values
        taskDateInput.value = "";
        taskDetailInput.value = "";
        removeChildren(tasks);
        const projName2 = document.createElement("h1");
        projName2.innerHTML = ToDo.projectsList[currentProj].name;
        tasks.appendChild(projName2);
        for(var k = 0; k < ToDo.projectsList[currentProj].tasks.length; k++) {
            const taskInfo = document.createElement("div");
            tasks.appendChild(taskInfo);
            taskInfo.classList.add("taskInfo");

            const circle = document.createElement("div");
            circle.classList.add("circle");
            taskInfo.appendChild(circle);
            circle.addEventListener("click", deleteTaskHandler(k));

            const taskName = document.createElement("h2");
            taskInfo.appendChild(taskName);
            taskName.innerHTML = ToDo.projectsList[currentProj].tasks[k].title;

            const taskDetails = document.createElement("p");
            taskInfo.appendChild(taskDetails);
            taskDetails.innerHTML = ToDo.projectsList[currentProj].tasks[k].details;
            
            if(ToDo.projectsList[currentProj].tasks[k].dueDate != "") {
                const taskDate = document.createElement("h4");
                taskInfo.appendChild(taskDate);
                taskDate.innerHTML = "Due: " + ToDo.projectsList[currentProj].tasks[k].dueDate;
                taskDate.classList.add("taskDate")
            }
        }
        addTaskClick(loadAddTaskButton(), currentProj);
        submitTaskClick();
    }

    const deleteTaskHandler = (taskIndex) => {
        return () => {
          ToDo.projectsList[currentProj].tasks.splice(taskIndex, 1);
          loadTasks();
        };
      };
      
    

    const loadAddTaskButton = () => {
        removeChildren(addTaskButtonDiv);
        const addTaskButton = document.createElement("div");
        addTaskButton.innerHTML = "+ Add Task";
        addTaskButton.style.cursor = "pointer";
        addTaskButtonDiv.appendChild(addTaskButton);
        return addTaskButton;
    }

    const addTaskClick = (taskButton) => {
        taskButton.addEventListener("click", () => {
          boxOn(addTaskBox);
        });
      };

      const submitTaskClick = () => {
        const submitTaskHandler = () => {
          if (taskNameInput.value === "") {
            console.log("must have name");
          } else {
            ToDo.addTask(ToDo.projectsList[currentProj], taskNameInput.value, taskDateInput.value, taskDetailInput.value, false);
            boxOff(addTaskBox);
            loadTasks();
          }
        };
        submitTask.removeEventListener("click", submitTaskHandler);
        submitTask.addEventListener("click", submitTaskHandler);
      };

    return {addProjClick, xClicks, submitProjClick, loadProjects};
})();


const buttonFunctionality = () => {
    DOM.addProjClick();
    DOM.xClicks()
    DOM.submitProjClick();
    DOM.loadProjects();
}



export {buttonFunctionality};




