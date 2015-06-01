var app = angular.module('ApioApplication6', ['apioProperty']);
app.controller('defaultController',['$scope', 'currentObject','$http', function($scope, currentObject,$http){
	console.log("Sono il defaultController e l'oggetto è");
	console.log(currentObject.get());
	$scope.object = currentObject.get();

    $scope.chiudiPorta = function() {
        currentObject.update("status", "0", true, true);
    };

	$scope.apriPorta = function() {
		currentObject.update("status", "1", true, true);
	};

	$scope.getStat = function() {
		var _url = "http://"+$scope.object.gatewayIP+"/api/functions/ZigBee:"+$scope.object.name+":"+$scope.object.address+":DoorLock";
		$http({
			method : "POST",
			url : '/apio/adapter',
			data : {
				url : _url,
				method : 'POST',
				data : {operation : 'getStatus'}
			}
		}).success(function(data) {
			currentObject.update('getStatus', data.result.status, true, false);
		}).error(function(data) {
			console.log(data);
			alert("ERROR")
		});
	};

    $scope.getStat();
}]);

setTimeout(function(){
	angular.bootstrap(document.getElementById('ApioApplication6'), ['ApioApplication6']);
}, 10);