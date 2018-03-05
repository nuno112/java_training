var toDoApp = angular.module('toDoApp', []);
//localStorage.clear();

toDoApp.controller('toDoController',['$scope', function($scope){
var oldContent;
	var addTaskMode = "addTask";
	var searchTaskMode = "searchTask";
	var defaultInputMode = addTaskMode;
	var inputMode = defaultInputMode;
	var taskData;
	var taskCount;

	$scope.tasks = [];
	$scope.counter = 0;
	$scope.taskFilter = "";

	// instantiate the vars taskData and taskCount and store
	//	var taskData = localStorage['tasksList'];
	//	var taskCount = localStorage['saveCount'];


	// function to switch between Add Task Mode and Search Task Mode when the button is clicked
	$scope.searchBtnToggle = function () {

		if (inputMode == addTaskMode) {
			inputMode = searchTaskMode;
		} else {
			inputMode = addTaskMode;
		};
		$scope.inputModeUpdate();
	};
	// function to update the behaviour of some elements waccording to the current inputMode
	$scope.inputModeUpdate = function () {
		var addTaskModeText = "'Add Task' Mode"; // text to show below the switch button when on Add Task Mode
		var searchTaskModeText = "'Filter Task' Mode"; // text to show below the switch button when on Filter Task Mode
		var inputPlaceholderSearch = "Type here to filter your tasks" // placeholder text to show on the input field when on Search Task Mode
		var inputPlaceholderAdd = "Type here to add your task" // placeholder text to show on the input field when on Add Task Mode

		// check if inputMode is addTask
		if (inputMode == addTaskMode) {

			$scope.searchAddTaskToggle = addTaskModeText;
			$scope.inputPlaceholder = inputPlaceholderAdd;
			$scope.taskFilter = ""; // if inputMode is addTask, clear the filter in order to show every task
		} else {
			$scope.searchAddTaskToggle = searchTaskModeText;
			$scope.inputPlaceholder = inputPlaceholderSearch;
			$scope.taskFilter = $scope.task; // if inputMode is addTask, make the filter equal to what's written on the input box
		}
	};

	// define the function to load the task list from localstorage
	$scope.loadLocalStorage = function () {
		taskData = localStorage['tasksList'];
		taskCount = localStorage['saveCount'];

		// if info in localstorage exists, convert it from JSON and save it to $scope.counter
		if (taskCount != undefined) {
			$scope.counter = JSON.parse(taskCount);
		}
		// if info in localstorage exists, convert it from JSON and save it to $scope.tasks
		if (taskData != undefined) {
			$scope.tasks = JSON.parse(taskData);
		}
	};

	//define the function to save the task list to localstorage
	$scope.saveLocalStorage = function () {
		localStorage['tasksList'] = JSON.stringify($scope.tasks);
		localStorage['saveCount'] = JSON.stringify($scope.counter);
		// console.log("save function called");
	};

	$scope.loadLocalStorage(); // load from localstorage when angular loads
	$scope.inputModeUpdate(); // update inputmode when angular loads

	// function run on keyup event. If inputMode is 'filter Task' update the taskFilter used on the ng-repeat attribute
	$scope.captureKeyPress = function () {
		if (inputMode == searchTaskMode) {
			$scope.taskFilter = $scope.task;
		};
	};

	//function run on keydown. If inputMode is Add Task, key pressed is Enter and the input box is not empty call add new task function
	$scope.searchEnter = function () {
		if (inputMode == addTaskMode && event.which == 13 && event.target.value != '') {
			event.preventDefault();
			$scope.addTask();
		};
	};

	$scope.addTask = function () {

		$scope.applySearchAll()
		$scope.tasks.push({
			'taskName': $scope.task,
			'status': false,
			'excludedByFilter': false
		});
		$scope.task = '';
		$scope.counter++;
		// console.log("addTask function will call:");
		$scope.saveLocalStorage();
	};

	$scope.delete = function (item) {

		if ($scope.tasks[item].status == false) {
			$scope.counter--;
		};

		$scope.tasks.splice(item, 1);
		// console.log("delete function will call:");
		$scope.saveLocalStorage();
	};


	$scope.checkStatus = function (item) {

		//console.log($scope.tasks[item].status);

		if ($scope.tasks[item].status) {
			$scope.counter--;
		} else {
			$scope.counter++;
		};
		// console.log("checkStatus function will call:");
		$scope.saveLocalStorage();
	};


	$scope.ondblclick = function (item) {
		//		taskTarget = event.target;
		//		console.log(event.target.parent)
		oldContent = event.target.innerHTML; // store the task in the var oldContent.

		// this if block will deselect tet selected on doubleclick
		if (window.getSelection) {
			//	window.getSelection().removeAllRanges();
			window.getSelection().collapseToStart();
		} else if (document.selection) {
			document.selection.empty();
		};

		// after storing the task in the var oldContent and deselecting any text it calls the function that enalbes editing
		$scope.editTaskToggle(arguments[0]); // whenever a function is called with arguments, it stores all its arguments in a array called "arguments". Here we want call the function $scope.editTaskToggle() and pass it the first (and only) argument of the function $scope.ondblclick() therefore we use arguments[0] (first object in the arguments array).
	};

	// function to switch the contentEditable atribute between true and false
	$scope.editTaskToggle = function (item) {
		//if the contentEditable property is false changes it to true, otherwise chenges it to false
		var editContent = event.target.contentEditable;
		editContent = editContent == "false" ? "true" : "false";
		event.target.contentEditable = editContent;
		oldContent = event.target.innerHTML; // store the task in the var oldContent.

		//		console.log(event.target.parent);
		// console.log("editTaskToggle function will call validateTask");


		$scope.validateTask(arguments[0]); // whenever a function is called with arguments, it stores all its arguments in a array called "arguments". Here we want call the function $scope.validateTask() and pass it the first (and only) argument of the function $scope.editTaskToggle() therefore we use arguments[0] (first object in the arguments array).

	};

	// disable the ability to edit
	$scope.disableTaskEdit = function (item) {
		// console.log("disableTaskEdit function will call validateTask");
		$scope.validateTask(arguments[0]); // whenever a function is called with arguments, it stores all its arguments in a array called "arguments". Here we want to call the function $scope.validateTask() and pass it the first (and only) argument of the function $scope.disableTaskEdit() therefore we use arguments[0] (first object in the arguments array).
		var editContent = event.target.contentEditable;
		editContent = "false";
		event.target.contentEditable = editContent;
	};

// function to check if the task is not empty, and restore the old value if it is empty
	$scope.validateTask = function (item) {
		//		console.log(item);
		//var taskTargetIndex = event.target.parent.index;
		var taskContent = event.target.innerHTML
		if (taskContent == "") {
			event.preventDefault();
			taskContent = oldContent; // restore the old value
			event.target.innerHTML = taskContent; // restore the old value
			alert("Please use the remove button to remove a task. Restoring your task.");
		} else if (taskContent != oldContent) {
			// console.log("task alterada: " + taskContent != oldContent);
			//		console.log($scope.tasks);
			$scope.tasks[item].taskName = taskContent; // update task


			//		console.log($scope.tasks);
			//		console.log($scope.counter);
			//		console.log($index);
			// console.log("validateTask function will call:");
			$scope.saveLocalStorage(); //save tasklist to localStorage
		};
	};

	$scope.pressEnterAgain = function (item) {
		if (event.which == 13) {
			event.preventDefault();
			//					console.log("pressed enter");
			$scope.disableTaskEdit(arguments[0]); // whenever a function is called with arguments, it stores all its arguments in a array called "arguments". Here we want call the function $scope.disableTaskEdit() and pass it the first (and only) argument of the function $scope.pressEnterAgain() therefore we use arguments[0] (first object in the arguments array).
		}
	};


	// function for All filter button:
	$scope.applySearchAll = function () {

		//Searches all the elements the list (one by one)
		angular.forEach($scope.tasks, function (singleTask) {
			singleTask.excludedByFilter = false; // means that no filter is aplied and all the items are shown
		});
	};

	// function for Active filter button:
	$scope.applySearchActive = function () {

		//Searches in the list (one by one)
		angular.forEach($scope.tasks, function (singleTask) {
			singleTask.excludedByFilter = false // means that no filter is aplied and all the items are shown (resets the list in order to apply new filter to all)

			// If the status of the item is TRUE
			if (singleTask.status) {
				// Then apply filter to this item
				singleTask.excludedByFilter = true;
			}
		});
	};

	// function for Completed filter button:
	$scope.applySearchCompleted = function () {

		//Searches in the list (one by one)
		angular.forEach($scope.tasks, function (singleTask) {
			singleTask.excludedByFilter = false // means that no filter is aplied and all the items are shown (resets the list in order to apply new filter to all)

			// If the status of the item is FALSE (or NOT TRUE)
			if (!singleTask.status) {

				// Then apply the filter to this item (other way to do this!)
				singleTask.excludedByFilter = (singleTask.taskName.indexOf(singleTask) === -1)
			}
			//console.log($scope.tasks.indexOf(singleTask));
		});
	};

	// function for Delete (all the completed items) button:
	$scope.deleteAll = function () {

		//Searches in the list (one by one)
		angular.forEach($scope.tasks, function (singleTask) {
			//console.log(singleTask);
			singleTask.excludedByFilter = false // means that no filter is aplied and all the items are shown (resets the list in order to apply new filter to all)

			// If the status of the item is TRUE
			if (singleTask.status) {

				// Then remove this item from the list (splice by the index of current item)
				$scope.tasks.splice($scope.tasks.indexOf(singleTask), 1);

				// Call the function again to reset the indexes of all the elements of the list
				$scope.deleteAll()
			}
		});

		// Save in local storage the changes to the list
		$scope.saveLocalStorage();
	};



}]);