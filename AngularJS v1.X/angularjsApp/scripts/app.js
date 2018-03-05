var mainApp = angular.module('mainApp', ['ngRoute', 'routeStyles', 'orderApp', 'shopCartApp', 'toDoApp']);


mainApp.config( function($routeProvider) {
	$routeProvider
	.when('/home', {
		url: '/home',
		templateUrl: 'views/home/Home.html',
	})
	.when('/ExerciseToDoList', {
		url: '/ExerciseToDoList',
		templateUrl: 'views/examples/toDoList/ExerciseToDoList.html',
		controller: 'toDoController',
		css: 'views/examples/toDoList/toDo.css'
	})
	.when('/ExerciseOrderFrom', {
		url: '/ExerciseOrderFrom',
		templateUrl: 'views/examples/orderFrom/ExerciseOrderFrom.html',
		controller: 'orderController',
		css: 'views/examples/orderFrom/orderFrom.css'
	})
	.when('/ExerciseShopCart', {
		url: '/ExerciseShopCart',
		templateUrl: 'views/examples/shopCart/ExerciseShopCart.html',
		controller: 'shopCartController',
		css: 'views/examples/shopCart/shopCart.css'
	})
	.when('/ExerciseContactsList', {
		url: '/ExerciseContactsList',
		templateUrl: 'views/exercises/contactsList/ExerciseContactsList.html',
		css: 'views/exercises/contactsList/contactsList.css'
	})
	.when('/Project', {
		url: '/Project',
		templateUrl: 'views/project/Project.html',
		//css: 'views/project/project.css'
	})
	.when('/Learning', {
		url: '/Learning',
		templateUrl: 'views/learning/Learning.html',
		css: 'views/learning/learning.css'
	})
	.otherwise({
		redirectTo: '/home'
	})
	
});