var orderFromApp = angular.module('orderFromApp', []);

orderFromApp.controller("orderFromController", function($scope) {
	$scope.total = 0;
	$scope.services = [
	{"price":500,"state":false},
	{"price":300,"state":false},
	{"price":250,"state":false},
	{"price":220,"state":false}
	];
	$scope.change = function (service) {
		if($scope.services[service].state) {
			$scope.services[service].state = false;
			$scope.total -= $scope.services[service].price;
		} else {
			$scope.services[service].state = true;
			$scope.total += $scope.services[service].price;
		}
	};
});