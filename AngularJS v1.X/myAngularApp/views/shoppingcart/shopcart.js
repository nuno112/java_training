var shopCartApp = angular.module("shopCartApp", []);

shopCartApp.controller("shopCartController", function($scope) {
	$scope.display = "list";
	$scope.services = [
	{
		name: "Tutorials Development",
		price: 500,
		quantity: 0,
		active: false
	},{
		name: "Tutorials Design",
		price: 300,
		quantity: 0,
		active: false
	},{
		name: "Code Integration",
		price: 250,
		quantity: 0,
		active: false
	},{
		name: "Training",
		price: 220,
		quantity: 0,
		active: false
	},{
		name: "Training 2",
		price: 333,
		quantity: 0,
		active: false
	},{
		name: "Training 3",
		price: 444,
		quantity: 0,
		active: false
	},{
		name: "Training 4",
		price: 555,
		quantity: 0,
		active: false
	},{
		name: "Training 5",
		price: 666,
		quantity: 0,
		active: false
	},
	];

	$scope.plus = function(service) {
		++service.quantity;
	}

	$scope.minus = function(service) {
		--service.quantity;
	}

	$scope.clearS = function(service) {
		service.quantity = 0;
		$scope.active(service);
	}

	$scope.clearCart = function() {
		for (var i = 0; i < $scope.services.length; i++) {
			$scope.services[i].quantity = 0;
			$scope.services[i].active = false;
		}
		$scope.total();
	};

	$scope.active = function(service) {
		if (service.quantity > 0) {
			service.active = true;
			return true
		} else {
			service.active = false;
			return false
		}
	}

	$scope.total = function() {
		var total = 0;
		for (var i = 0; i < $scope.services.length; i++) {
			total += $scope.services[i].quantity * $scope.services[i].price;
		}
		return total;
	}
});