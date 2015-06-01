var app = angular.module("ApioApplication20", ["apioProperty"]);
app.controller("defaultController", ["$scope", "$http", "currentObject", "sweet", function($scope, $http, currentObject, sweet){
	console.log("Sono il defaultController e l'oggetto è");
	console.log(currentObject.get());
	$scope.object = currentObject.get();

    $scope.isAdmin = true;

    /*setTimeout(function(){
        $("#cocktail").find("select").bind("click", function(){
            currentObject.update("cocktail", "-1", true, false);
        });
    }, 100);*/

    /*setTimeout(function(){
        var val = $("#cocktail").find("select").val();
        alert(val === "?" ? "1" : "2");
    }, 200);*/
    /*$scope.isAdmin = false;

    sweet.show({
        cancelButtonText : "No thanks, just a drink...",
        confirmButtonText : "Enter admin mode",
        closeOnConfirm : true,
        confirmButtonClass : "btn-success",
        showCancelButton : true,
        title : "To enter the administrator mode please insert the password",
        type : "warning"
    }, function(isConfirm){
        if(isConfirm){
            if(document.getElementById("pwdinput").value === "admin"){
                $scope.isAdmin = true;
                $scope.$apply();
            }
            else{
                alert("Wrong password");
            }
        }
    });*/

    //Inserisce il campo per la password nello sweet alert
    document.getElementsByClassName("lead text-muted").item(0).innerHTML = "<input id=\"pwdinput\" type=\"text\" autofocus />";

	$scope.setOnoff = function(index){
        var drink = $scope.object.db["onoff"+index][$("#onoff"+index).find("select").val()];
        var send = {
            added_drinks : {},
            objectId : $scope.object.objectId
        };
        send.added_drinks[index] = drink;

        $http.post("/apio/updatedbfield", send).success(function(){
            $http.get("/apio/database/getObject/"+$scope.object.objectId).success(function(data){
                $scope.object = data;
            }).error(function(){
                console.log("Si è verificato un errore di sistema");
            });
            $http.get("/apio/getdatafromdb/cocktails/host/127.0.0.1/port/27017/collection/Cocktails").success(function(data) {
                var isCocktailAdded = function(name){
                    for(var i in $scope.object.db.cocktail){
                        if($scope.object.db.cocktail[i].toLowerCase() === name.toLowerCase()){
                            return true;
                        }
                    }
                    return false;
                };

                for(var i in data){
                    var counter = 0;
                    var position_and_volume = {};
                    var send_ = {
                        cocktail : $scope.object.db.cocktail,
                        doEmit : true,
                        objectId : $scope.object.objectId
                    };
                    for(var j in data[i].components){
                        for(var k in $scope.object.db.added_drinks){
                            if($scope.object.db.added_drinks[k].toLowerCase() === j.toLowerCase()){
                                counter++;
                                position_and_volume[k] = data[i].components[j];
                            }
                        }
                        if(counter === Object.keys(data[i].components).length && !isCocktailAdded(data[i].name)){
                            var getTime = function(volume){
                                //volume in centilitres
                                //discharge in cl/s
                                var discharge = 5/3;
                                return volume/discharge;
                            };

                            var index_for_cocktail = "";
                            index_for_cocktail += (typeof position_and_volume["1"] === "undefined" ? "0" : getTime(parseFloat(position_and_volume["1"])))+"/";
                            index_for_cocktail += (typeof position_and_volume["2"] === "undefined" ? "0" : getTime(parseFloat(position_and_volume["2"])))+"/";
                            index_for_cocktail += (typeof position_and_volume["3"] === "undefined" ? "0" : getTime(parseFloat(position_and_volume["3"])))+"/";
                            index_for_cocktail += (typeof position_and_volume["4"] === "undefined" ? "0" : getTime(parseFloat(position_and_volume["4"])))+"/";
                            index_for_cocktail = index_for_cocktail.replace(/\./g, ",");
                            send_.cocktail[index_for_cocktail] = data[i].name;
                            /*var send_ = {
                                cocktail : $scope.object.db.cocktail,
                                doEmit : true,
                                objectId : $scope.object.objectId
                            };
                            send_.cocktail[index_for_cocktail] = data[i].name;
                            $http.post("/apio/updatedbfield", send_).success(function(){}).error(function(){
                                console.log("Si è verificato un errore di sistema");
                            });*/
                        }
                    }
                }
                $http.post("/apio/updatedbfield", send_).success(function(){}).error(function(){
                    console.log("Si è verificato un errore di sistema");
                });
            }).error(function() {
                console.log("Error while getting data from the specified DB");
            });
        }).error(function(){
            console.log("Si è verificato un errore di sistema");
        });
	};
}]);

setTimeout(function(){
	angular.bootstrap(document.getElementById("ApioApplication20"), ["ApioApplication20"]);
}, 10);