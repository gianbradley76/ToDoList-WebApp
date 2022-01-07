import Controller from "./controller";
import Tasks from "./tasks";

export default class UI {
	static loadHomePage() {
		UI.displayTasks();
		UI.setMainTitle(document.querySelector(".active").innerText);
		UI.initButtons();
	}

	static displayTasks() {
		//get Tasks from Local Storage
		const storedTasks = Controller.getTasks();
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
		const taskStatus = Controller.checkTaskStatus(task.status);

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
			Controller.getWeekday(date.getDay()) +
			" " +
			Controller.getMonthName(date.getMonth()) +
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
				Controller.changeStatus(e);
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
			Controller.createNewTask();
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
