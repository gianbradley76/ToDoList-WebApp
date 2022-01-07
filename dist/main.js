/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



class UI {
	static loadHomePage() {
		UI.displayTasks();
		UI.setMainTitle(document.querySelector(".active").innerText);
		UI.initButtons();
	}

	static displayTasks() {
		//get Tasks from Local Storage
		const storedTasks = _controller__WEBPACK_IMPORTED_MODULE_0__.default.getTasks();
		console.log(storedTasks);
		let sortedTasks = storedTasks.sort((a, b) => {
			return new Date(a.dueDate) - new Date(b.dueDate);
		});
		console.log("sortedTasks", sortedTasks);
		sortedTasks.forEach((task) => {
			UI.displayTaskToList(task);
		});
	}

	static displayTaskToList(task) {
		const taskStatus = _controller__WEBPACK_IMPORTED_MODULE_0__.default.checkTaskStatus(task.status);

		const taskText = document.createElement("p");
		taskText.innerText = task.task;

		const dueDateText = document.createElement("p");
		dueDateText.classList.add("due-date");
		dueDateText.innerText = task.dueDate;

		const toggleBtn = document.createElement("button");
		if (taskStatus === "unfinished") {
			toggleBtn.classList.add("toggle-unfinished");
		} else if (taskStatus === "finished") {
			toggleBtn.classList.add("toggle-finished");
		}

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-task");

		const taskItemDiv = document.createElement("div");
		taskItemDiv.classList.add("task-item");
		taskItemDiv.appendChild(toggleBtn);
		taskItemDiv.appendChild(taskText);
		taskItemDiv.appendChild(dueDateText);
		taskItemDiv.appendChild(deleteBtn);

		// Append item to corresponding container
		const unfinishedTaskContainer = document.querySelector(
			".unfinished-tasks-container"
		);
		const finishedTaskContainer = document.querySelector(
			".finished-tasks-container"
		);
		if (taskStatus === "unfinished") {
			unfinishedTaskContainer.insertBefore(
				taskItemDiv,
				unfinishedTaskContainer.lastElementChild
			);
		} else if (taskStatus === "finished") {
			finishedTaskContainer.appendChild(taskItemDiv);
		}
	}

	// Display deadline of Projects
	static displayTitleDuration() {
		const taskDuration = document.querySelector(".task-duration");
		const date = new Date();
		let newDayNum = date.getDate();

		// Adds "0" to single digit dates
		if (newDayNum < 10) {
			newDayNum = "0" + newDayNum;
		}

		const displayedDate =
			_controller__WEBPACK_IMPORTED_MODULE_0__.default.getWeekday(date.getDay()) +
			" " +
			_controller__WEBPACK_IMPORTED_MODULE_0__.default.getMonthName(date.getMonth()) +
			" - " +
			newDayNum;
		taskDuration.innerText = displayedDate;
	}

	static initButtons() {
		//  Buttons for Task Today, Wekkly, and All Tasks
		const taskLinks = document.querySelectorAll(".task-link");
		taskLinks.forEach((taskLink) => {
			taskLink.addEventListener("click", (el) => {
				UI.setActiveTask(el);
				UI.setMainTitle(el.target.innerText);
			});
		});

		// Buttons for Project grouped tasks
		const projectLinks = document.querySelectorAll(".project-link");
		projectLinks.forEach((projectLink) => {
			projectLink.addEventListener("click", (el) => {
				UI.setActiveTask(el);
				UI.setMainTitle(el.target.innerText);
			});
		});

		// Buttons for changing task status and deleting tasks
		document
			.querySelector(".tasks-container")
			.addEventListener("click", (e) => {
				_controller__WEBPACK_IMPORTED_MODULE_0__.default.changeStatus(e);
			});

		// Opens modal for adding tasks
		document
			.getElementById("addTask")
			.addEventListener("click", UI.openAddTask);

		// Close modal for adding tasks
		document
			.querySelector(".modal-close")
			.addEventListener("click", UI.modalClose);

		// Button for submitting new task
		document.querySelector("#taskForm").addEventListener("submit", (e) => {
			// Prevent actual submit
			e.preventDefault();
			_controller__WEBPACK_IMPORTED_MODULE_0__.default.createNewTask();
		});
	}

	static deleteTask(e) {
		// Remove task from display
		e.target.parentElement.remove();
	}

	static openAddTask() {
		document.querySelector(".modal-bg").classList.add("bg-active");
	}

	// Sets title in main window
	static setActiveTask(el) {
		const currentActiveTask = document.querySelector(".active");
		currentActiveTask.classList.remove("active");
		el.target.classList.add("active");
	}

	// Clears input fields after closing or adding new task
	static clearInputs() {
		document.getElementById("taskForm").reset();
	}

	static modalClose() {
		document.querySelector(".modal-bg").classList.remove("bg-active");
		UI.clearInputs();
	}

	// Sets the main header to respective category
	static setMainTitle(projectTitle) {
		const mainTitle = document.getElementById("mainTitle");
		mainTitle.innerText = projectTitle;
		UI.displayTitleDuration();
	}
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



class Controller {
	// Get Tasks in JSON format from local storage
	static getTasks() {
		let tasks;
		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}

		return tasks;
	}

	static createNewTask() {
		// Get form values
		const taskTitle = document.getElementById("taskTitle").value;
		let taskDue = document.getElementById("taskDue").value;
		const projGroup = document.getElementById("projGroup").value;
		const taskStatus = "unfinished";

		// Validate
		if (taskTitle === "" || taskDue === "") {
			alert("Task and Due Date should not be empty");
		} else {
			// Puts newly added task to local storage
			const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_1__.default(taskTitle, taskDue, projGroup, taskStatus);

			Controller.addTask(newTask);
			_UI__WEBPACK_IMPORTED_MODULE_0__.default.displayTaskToList(newTask);
			_UI__WEBPACK_IMPORTED_MODULE_0__.default.clearInputs();
			_UI__WEBPACK_IMPORTED_MODULE_0__.default.modalClose();
		}
	}

	static addTask(task) {
		const tasks = Controller.getTasks();
		tasks.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	static checkTaskStatus(status) {
		return status === "unfinished" ? "unfinished" : "finished";
	}

	static changeStatus(e) {
		if (e.target.classList.contains("delete-task")) {
			// Remove task from display
			Controller.deleteTask(e);
			// UI.deleteTask(e);
		} else if (e.target.classList.contains("toggle-unfinished")) {
			// Change status of "unfinished to finished"
			let storedTasks = Controller.getTasks();
			storedTasks.forEach((task) => {
				if (task.task === e.target.nextElementSibling.innerText) {
					task.status = "finished";
					e.target.classList = "toggle-finished";
					localStorage.setItem("tasks", JSON.stringify(storedTasks));
					_UI__WEBPACK_IMPORTED_MODULE_0__.default.displayTasks(task);
					e.target.parentElement.remove();
					return;
				}
			});
		} else if (e.target.classList.contains("toggle-finished")) {
			// Change status of "finished to unfinished"
			console.log(e.target.nextElementSibling.innerText);
		}
	}

	static deleteTask(e) {
		let storedTasks = Controller.getTasks();
		const taskName = e.target.parentElement.children[1].innerText;
		const taskDate = e.target.parentElement.children[2].innerText;

		storedTasks.forEach((task, index) => {
			if (task.task === taskName && task.dueDate === taskDate) {
				storedTasks.splice(index, 1);
			}
		});
		_UI__WEBPACK_IMPORTED_MODULE_0__.default.deleteTask(e);
		localStorage.setItem("tasks", JSON.stringify(storedTasks));
	}

	static getWeekday(weekNum) {
		const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
		return days[weekNum];
	}

	static getMonthName(monthNum) {
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Ap",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return months[monthNum];
	}
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tasks)
/* harmony export */ });
class Tasks {
	constructor(task, dueDate, projGroup, status) {
		this.task = task;
		this.dueDate = dueDate;
		this.projGroup = projGroup;
		this.status = status;
	}
}


/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const date = new Date();
console.log(date);
_UI__WEBPACK_IMPORTED_MODULE_0__.default.loadHomePage();

})();

/******/ })()
;