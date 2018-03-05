var shopCartApp = angular.module("shopCartApp", []);

shopCartApp.controller('shopCartController', ['$scope', function ($scope) {
	$scope.layout = 'grid';
	$scope.services = [
		{
			name: 'Tutorials Development',
			value: 500,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Tutorials Design',
			value: 300,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Code Integration',
			value: 250,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Training',
			value: 220,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Training2',
			value: 333,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Training3',
			value: 444,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Training4',
			value: 555,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}, {
			name: 'Training5',
			value: 666,
			desc: 'description',
			image: "views/examples/shopCart/pic.jpg",
			count: 0,
			active: false
		}
	];
	$scope.active = function (s) {
		if (s.count >= 1) {
			s.active = true;
		}
		else s.active = false;
	}
	$scope.counter = function (s) {
		s.count += 1;
		$scope.active(s);
	};
	$scope.decounter = function (s) {
		if (s.count > 0) {
			s.count -= 1;
		}

		$scope.active(s);
	};
	$scope.nulify = function (s) {
		s.count = 0;
		$scope.active(s);
	};


	$scope.total = function () {
		var total = 0;

		angular.forEach($scope.services, function (s) {
			if (s.count > 0) {
				total += s.value * s.count;
			}
		});
		return total;
	};

	$scope.clearCart = function() {
		for(i=0 ; i< $scope.services.length; i++) {
			$scope.services[i].count = 0;
			$scope.services[i].active = false;
		};
		
	};
}]);

