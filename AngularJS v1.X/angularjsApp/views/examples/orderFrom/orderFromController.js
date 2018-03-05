var orderApp = angular.module('orderApp', []);

orderApp.controller('orderController',['$scope', function($scope){
	
	$scope.services = [
		{
			"name": "Tutorials Development",
			"price": 500,
			"status": false
		},
		{
			"name": "Tutorials Design",
			"price": 300,
			"status": false
		},
		{
			"name": "Code Integration",
			"price": 250,
			"status": false
		},
		{
			"name": "Training",
			"price": 220,
			"status": false
		}
	]

	$scope.changeStatus = function(item) {
		$scope.services[item].status = !$scope.services[item].status;
	}

	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.services, function(eachService) {
			if(eachService.status) {
				total += eachService.price
			}
		})

		return total;
		
	}


}])