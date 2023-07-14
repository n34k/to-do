/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add.js":
/*!********************!*\
  !*** ./src/add.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buttonFunctionality: () => (/* binding */ buttonFunctionality)\n/* harmony export */ });\nconst ToDo = (() => {\n    const projectsList = [];\n    function Project(name) {\n        this.name = name;\n        this.tasks = [];\n    }\n\n    const addProj = (name) => {\n        const project = new Project(name);\n        projectsList.push(project);    \n    } \n\n    function Task(title, dueDate, details, done) {\n        this.title = title;\n        this.dueDate = dueDate;\n        this.details = details;\n        this.done = done;\n    }\n \n    const addTask = (project, title, dueDate, details, done) => {\n        const task = new Task(title, dueDate, details, done);\n        project.tasks.push(task);\n    }\n\n    return {projectsList, addProj, addTask};\n})();\n\nconst DOM = (() => {\n    let currentProj = 0;\n    const addProjButton = document.querySelector(\".add-button\");\n    const projBox = document.querySelector(\".projects\");\n    const tasks = document.querySelector(\".tasks\");\n    const addProjBox = document.querySelector(\".add-proj-box\")\n    const x1 = document.getElementById(\"x1\");\n    const x2 = document.getElementById(\"x2\");\n    const submitProj = document.getElementById(\"add1\");\n    const submitTask = document.getElementById(\"add2\");\n    const projInput = document.querySelector(\".project-input\");\n    const addTaskBox = document.querySelector(\".add-task-box\");\n    const overlay = document.querySelector('.overlay');\n    const taskNameInput = document.getElementById(\"task-name\");\n    const taskDateInput = document.getElementById(\"task-date\");\n    const taskDetailInput = document.getElementById(\"task-detail\");\n    const addTaskButtonDiv = document.querySelector(\".add-task\");\n    \n\n    const removeChildren = (element) => {\n        while (element.firstChild) {\n            element.removeChild(element.firstChild);\n        }\n    }\n\n    const boxOn = (box) => {\n        box.style.display = \"flex\";\n        overlay.style.display = 'block';\n    }\n\n    const boxOff = (box) => {\n        box.style.display = \"none\";\n        overlay.style.display = 'none';\n    }\n\n    const addProjClick = () => {\n        addProjButton.addEventListener(\"click\", () => {\n            boxOn(addProjBox);\n        })\n    }\n\n    const xClick = (x, box) => {\n        x.addEventListener('click', () => {\n            boxOff(box);\n        })\n    }\n\n    const xClicks = () => {\n        xClick(x1, addProjBox);\n        xClick(x2, addTaskBox);\n    }\n\n    const submitProjClick = () => {\n        submitProj.addEventListener(\"click\", () => {\n            if(projInput.value == \"\") {\n                console.log(\"bruh\");\n            }\n            else {\n                const projectName = projInput.value;\n                ToDo.addProj(projectName);           \n                boxOff(addProjBox);\n                projInput.value = '';\n                loadProjects();  // HERE THIS IS THE DANGER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n            }\n        })\n    }\n\n    const deleteProjectHandler = (projectIndex) => {\n        ToDo.projectsList.splice(projectIndex, 1);\n        loadProjects();\n      };\n\n    const loadProjects = ()  => {\n        removeChildren(projBox);\n        for (let i = 0; i < ToDo.projectsList.length; i++) {\n            const projectName = document.createElement(\"h3\");\n            projectName.classList.add(\"project-name\")\n            projectName.innerHTML = `${i + 1}. ${ToDo.projectsList[i].name}`;\n            projBox.appendChild(projectName);\n            const trashCan = document.createElement(\"img\");\n            trashCan.src = \"images/trash.png\"\n            trashCan.classList.add(\"trash\")\n            trashCan.addEventListener(\"click\", () => deleteProjectHandler(i));\n            projectName.appendChild(trashCan);\n            projectNameClick(projectName);\n        }\n    }\n\n    const projectNameClick = (projectName) => {\n        const projectNameHandler = () => {\n            currentProj = parseInt(projectName.innerHTML[0] - 1);\n            console.log(currentProj);\n            loadTasks();\n        }  \n        projectName.removeEventListener(\"click\", projectNameHandler);\n        projectName.addEventListener(\"click\", projectNameHandler);   \n    }\n\n    const loadTasks = () => {\n        taskNameInput.value = \"\";    // Clear task input values\n        taskDateInput.value = \"\";\n        taskDetailInput.value = \"\";\n        removeChildren(tasks);\n        const projName2 = document.createElement(\"h1\");\n        projName2.innerHTML = ToDo.projectsList[currentProj].name;\n        tasks.appendChild(projName2);\n        for(var k = 0; k < ToDo.projectsList[currentProj].tasks.length; k++) {\n            const taskInfo = document.createElement(\"div\");\n            tasks.appendChild(taskInfo);\n            taskInfo.classList.add(\"taskInfo\");\n\n            const circle = document.createElement(\"div\");\n            circle.classList.add(\"circle\");\n            taskInfo.appendChild(circle);\n            circle.addEventListener(\"click\", deleteTaskHandler(k));\n\n            const taskName = document.createElement(\"h2\");\n            taskInfo.appendChild(taskName);\n            taskName.innerHTML = ToDo.projectsList[currentProj].tasks[k].title;\n\n            if(ToDo.projectsList[currentProj].tasks[k].details != \"\") {\n                const taskDetails = document.createElement(\"p\");\n                taskDetails.classList.add(\"task-details\")\n                taskInfo.appendChild(taskDetails);\n                taskDetails.innerHTML = \"Details: \" + ToDo.projectsList[currentProj].tasks[k].details;\n            }\n            \n            if(ToDo.projectsList[currentProj].tasks[k].dueDate != \"\") {\n                const taskDate = document.createElement(\"h4\");\n                taskInfo.appendChild(taskDate);\n                taskDate.innerHTML = \"Due: \" + ToDo.projectsList[currentProj].tasks[k].dueDate;\n                taskDate.classList.add(\"taskDate\")\n            }\n        }\n        addTaskClick(loadAddTaskButton(), currentProj);\n        submitTaskClick();\n    }\n\n    const deleteTaskHandler = (taskIndex) => {\n        return () => {\n          ToDo.projectsList[currentProj].tasks.splice(taskIndex, 1);\n          loadTasks();\n        };\n      };\n      \n    \n\n    const loadAddTaskButton = () => {\n        removeChildren(addTaskButtonDiv);\n        const addTaskButton = document.createElement(\"div\");\n        addTaskButton.innerHTML = \"+ Add Task\";\n        addTaskButton.style.cursor = \"pointer\";\n        addTaskButtonDiv.appendChild(addTaskButton);\n        return addTaskButton;\n    }\n\n    const addTaskClick = (taskButton) => {\n        taskButton.addEventListener(\"click\", () => {\n          boxOn(addTaskBox);\n        });\n      };\n\n      const submitTaskClick = () => {\n        const submitTaskHandler = () => {\n          if (taskNameInput.value === \"\") {\n            console.log(\"must have name\");\n          } else {\n            ToDo.addTask(ToDo.projectsList[currentProj], taskNameInput.value, taskDateInput.value, taskDetailInput.value, false);\n            boxOff(addTaskBox);\n            loadTasks();\n          }\n        };\n        submitTask.removeEventListener(\"click\", submitTaskHandler);\n        submitTask.addEventListener(\"click\", submitTaskHandler);\n      };\n\n    return {addProjClick, xClicks, submitProjClick, loadProjects};\n})();\n\n\nconst buttonFunctionality = () => {\n    DOM.addProjClick();\n    DOM.xClicks()\n    DOM.submitProjClick();\n    DOM.loadProjects();\n}\n\n\n\n\n\n//# sourceURL=webpack://to-do/./src/add.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add */ \"./src/add.js\");\n\n(0,_add__WEBPACK_IMPORTED_MODULE_0__.buttonFunctionality)();\n\n//# sourceURL=webpack://to-do/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;