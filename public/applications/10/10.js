var app = angular.module("ApioApplication10", ["apioProperty"]);
app.controller("defaultController",["$scope", "currentObject", "socket", function($scope, currentObject, socket){
	console.log("Sono il defaultController e l'oggetto è");
	console.log(currentObject.get());
	$scope.object = currentObject.get();

    socket.on("apio_event_new", function(){
        $scope.object.properties.fingerspread = "0";
        $scope.object.properties.fist = "0";
        $scope.object.properties.wavein = "0";
        $scope.object.properties.waveout = "0";
    });

    socket.on("apio_state_new", function(){
        $scope.object.properties.fingerspread = "0";
        $scope.object.properties.fist = "0";
        $scope.object.properties.wavein = "0";
        $scope.object.properties.waveout = "0";
    });

    $scope.fingerspread = function(){
        if(currentObject.isRecording()){
            $("#fingerspread").find("[propertyinput]").val("1");
        }
    };

    $scope.fist = function(){
        if(currentObject.isRecording()){
            $("#fist").find("[propertyinput]").val("1");
        }
    };

    $scope.wavein = function(){
        if(currentObject.isRecording()){
            $("#wavein").find("[propertyinput]").val("1");
        }
    };

    $scope.waveout = function(){
        if(currentObject.isRecording()){
            $("#waveout").find("[propertyinput]").val("1");
        }
    };
}]);

setTimeout(function(){
    angular.bootstrap(document.getElementById("ApioApplication10"), ["ApioApplication10"]);
}, 10);