var toDoListApp = angular.module('toDoListApp', []);

toDoListApp.controller("toDoListController", function($scope) {
	$scope.mode = "addTask";
	$scope.taskFilter = "";
	$scope.tasks = [];
	$scope.tasksDone = 0;

	$scope.switchMode = function() {
		if ($scope.mode === "addTask") {
			$scope.mode = "filterTask";
			$scope.taskFilter = $scope.task;
		} else {
			$scope.taskFilter = "";
			$scope.mode = "addTask"
		};
	};

	$scope.filterUpdate =  function () {
		if ($scope.mode === "filterTask") {
			$scope.taskFilter = $scope.task;
		} else {
			$scope.taskFilter = "";
		};
	};

	$scope.checkEnter = function() {
		if ($scope.mode ==="addTask" && event.which === 13 && event.target.value !== "") {
			event.preventDefault();
			$scope.addTask();
		};
	};

	$scope.addTask = function() {
		$scope.tasks.push({
			task: $scope.task,
			done: false,
			filtered: false
		});
		$scope.tasksDone++;
	};

	$scope.showAll = function() {
		for (var i = 0;i < $scope.tasks.length;i++) {
			$scope.tasks[i].filtered = false;
		};
	};

	$scope.showActive = function() {
		for (var i = 0;i < $scope.tasks.length;i++) {
			if ($scope.tasks[i].done) {
				$scope.tasks[i].filtered = true;
			} else {
				$scope.tasks[i].filtered = false;
			};
		};
	};

	$scope.showCompleted = function() {
		for (var i = 0;i < $scope.tasks.length;i++) {
			if (!$scope.tasks[i].done) {
				$scope.tasks[i].filtered = true;
			} else {
				$scope.tasks[i].filtered = false;	
			};
		};
	};

	$scope.deleteCompleted = function() {
		for (var x of $scope.tasks) {
			if (x.done) {
				$scope.tasks.splice($scope.tasks.indexOf(x), 1);
				$scope.deleteCompleted();
			};
		};
	};

	$scope.deleteTask = function($index) {
		if (!$scope.tasks[$index].done) {
			$scope.tasksDone--;
		};
		$scope.tasks.splice($index, 1);
	};

	$scope.checkDone = function($index)  {
		if (!$scope.tasks[$index].done) {
			$scope.tasksDone++;
		} else {
			$scope.tasksDone--;
		};
	};
});