var app = angular.module('ApioApplication8', ['apioProperty']);
app.controller('defaultController',['$scope', 'currentObject', '$http', function($scope, currentObject, $http){
    console.log("Sono il defaultController e l'oggetto è");
    console.log(currentObject.get());
    $scope.object = currentObject.get();

    $scope.getRemainingTime = function(){
        var _url = "http://"+$scope.object.gatewayIP+"/api/functions/ZigBee:"+$scope.object.name+":"+$scope.object.address+":WashingMachine";
        $http({
            method : "POST",
            url : '/apio/adapter',
            data : {
                url : _url,
                method : 'POST',
                data : {operation : 'getRemainingTime'}
            }
        }).success(function(data) {
            currentObject.update('remainingtime', data.result.timeAttribute.hours+":"+data.result.timeAttribute.minutes, true, false);
        }).error(function(data) {
            console.log(data);
            alert("ERROR");
        });
    };

    $scope.getTemperature = function(){
        var _url = "http://"+$scope.object.gatewayIP+"/api/functions/ZigBee:"+$scope.object.name+":"+$scope.object.address+":WashingMachine";
        $http({
            method : "POST",
            url : '/apio/adapter',
            data : {
                url : _url,
                method : 'POST',
                data : {operation : 'getTemperature'}
            }
        }).success(function(data) {
            currentObject.update('temperature', data.result.level+" "+data.result.unit, true, false);
        }).error(function(data) {
            console.log(data);
            alert("ERROR");
        });
    };
}]);

setTimeout(function(){
    angular.bootstrap(document.getElementById('ApioApplication8'), ['ApioApplication8']);
},10);
