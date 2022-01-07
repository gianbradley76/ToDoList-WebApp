import UI from "./UI";
import Tasks from "./tasks";

export default class Controller {
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
			const newTask = new Tasks(taskTitle, taskDue, projGroup, taskStatus);

			Controller.addTask(newTask);
			UI.displayTaskToList(newTask);
			UI.clearInputs();
			UI.modalClose();
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
					UI.displayTasks(task);
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
		UI.deleteTask(e);
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
