var app = angular.module("app", ["ngRoute", "orderFromApp", "shopCartApp", "toDoListApp", "contactsList"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/Home", {
		templateUrl:"views/home/home.html"
	})
	.when("/OrderFrom", {
		templateUrl: "views/orderfrom/orderfrom.html",
		controller: "orderFromController"
	})
	.when("/ShoppingCart", {
		templateUrl:"views/shoppingcart/shoppingcart.html",
		controller: "shopCartController"
	})
	.when("/ToDoList", {
		templateUrl:"views/todolist/todolist.html",
		controller: "toDoListController"
	})
	.when("/ContactsList", {
		templateUrl:"views/contactslist/contactslist.html",
		controller: "contactsListController"
	})
	.otherwise({
		redirectTo: '/Home'
	})
})