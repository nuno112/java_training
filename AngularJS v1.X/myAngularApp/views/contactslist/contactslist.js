var contactsList_ = angular.module('contactsList', []);

contactsList_.controller("contactsListController",["$scope", "$window", function ($scope, $window) {
	$scope.inputC ={};
	$scope.mode = "searchContact";
	$scope.editFlag = false;
	$scope.filterMode= "";
	$scope.contacts = [
		{
			name:"nuno",
			email:"nuno@a.com",
			phone:"555-666",
			zip: "666-666",
			status: false,
		},
		{
			name:"ze",
			email:"ze@a.com",
			phone:"444-666",
			zip: "444-666",
			status: false,
		}
	];

	$scope.addContact = function () {
		$scope.inputC.status = false;
		if ($scope.inputC.hasOwnProperty("name") && $scope.inputC.hasOwnProperty("email")) {
			$scope.contacts.push($scope.inputC);
		} else {
			$window.alert("Please fill in the name and email at least");
		};
		$scope.inputC={};
	};

	$scope.switchMode = function () {
		if ($scope.mode === "addContact") {
			$scope.mode = "searchContact";
		} else {
			$scope.mode = "addContact";
		};
	};

	$scope.delete = function () {
		for (contact of $scope.contacts) {
			if (contact.status) {
				$scope.contacts.splice($scope.contacts.indexOf(contact),1);
			};
		};
		$scope.delete();
	};

	$scope.match = function (contact) {
		if (!angular.equals($scope.inputC, {}) && $scope.mode ==="searchContact") {
			if ($scope.filterMode === "name") {
				if (contact.name.includes($scope.inputC.name)) {
					return true;
				} else {
					return false;
				};
			} else if ($scope.filterMode === "email") {
				if (contact.email.includes($scope.inputC.email)) {
					return true;
				} else {
					return false;
				};
			} else if ($scope.filterMode === "phone") {
				if (contact.phone.includes($scope.inputC.phone)) {
					return true;
				} else {
					return false;
				};
			} else if ($scope.filterMode === "zip") {
				if (contact.zip.includes($scope.inputC.zip)) {
					return true;
				} else {
					return false;
				};
			} else {
				if (contact.email.includes($scope.inputC.email) || contact.name.includes($scope.inputC.name) || contact.phone.includes($scope.inputC.phone) || contact.zip.includes($scope.inputC.zip)) {
					return true;
				} else {
					return false;
				};
			};
		} else {
			return true;
		};
	};

	$scope.clearSearch = function () {
		$scope.inputC = {};
	};
}]);
