var app = angular.module("ApioApplication2", ["apioProperty"]);
app.controller("defaultController", ["$scope", "currentObject","$rootScope","$http", "socket", function($scope, currentObject, $rootScope, $http, socket){
	$scope.object = currentObject.get();
	$scope.back = function(){
		currentObject.update("indietro", "");
	};
	
	$scope.next = function(){
		currentObject.update("avanti", "");
	};
}]);

setTimeout(function(){
	angular.bootstrap(document.getElementById("ApioApplication2"), ["ApioApplication2"]);
}, 10);