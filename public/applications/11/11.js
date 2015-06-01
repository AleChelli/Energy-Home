var app = angular.module("ApioApplication11", ["apioProperty"]);
app.controller("defaultController", ["$scope", "currentObject", "sweet", function($scope, currentObject, sweet){
	console.log("Sono il defaultController e l'oggetto è");
	console.log(currentObject.get());

    $scope.showFunzionalita = false;
    $scope.showInfo = false;
    $scope.showSimulatore = false;

    window.addEventListener("orientationchange", function() {
        var nodes = document.getElementById("ApioApplication11").childNodes.item(3).childNodes;
        setTimeout(function(){
            if((window.orientation === 0 || window.orientation === 180) && window.innerWidth > 380) {
                sweet.show({
                    title : "Per una migliore esperienza utente orientare il tablet in orizzontale",
                    type : "warning",
                    showCancelButton : false,
                    confirmButtonClass : "btn-success",
                    closeOnConfirm : false
                });
                $(".confirm.btn.btn-lg.btn-success").css("display", "none");
                for(var i = 1;i <= 7;i += 2){
                    nodes.item(i).classList.add("ng-hide");
                }
            }
            //else if(window.innerWidth >= 967 && window.innerWidth <= 1199){
            else{
                $(".confirm.btn.btn-lg.btn-success").trigger("click");
                if(!$scope.showSimulatore && !$scope.showFunzionalita && !$scope.showInfo){
                    nodes.item(1).classList.remove("ng-hide");
                }
                else if($scope.showInfo && !$scope.showSimulatore){
                    nodes.item(3).classList.remove("ng-hide");
                }
                else if($scope.showFunzionalita && !$scope.showSimulatore){
                    nodes.item(5).classList.remove("ng-hide");
                }
                else if($scope.showSimulatore){
                    nodes.item(7).classList.remove("ng-hide");
                }
            }
        }, 200);

    });

    window.onload = function(){
        document.getElementById("ApioApplicationContainer").classList.add('fullscreen');
    }();

    $scope.isPortrait = function(){
        var portrait = false;
        if((window.orientation === 0 || window.orientation === 180) && window.innerWidth > 380) {
            sweet.show({
                title : "Per una migliore esperienza utente orientare il tablet in orizzontale",
                type : "warning",
                showCancelButton : false,
                confirmButtonClass : "btn-success",
                closeOnConfirm : false
            });
            $(".confirm.btn.btn-lg.btn-success").css("display", "none");
            portrait = true;
        }
        return portrait;
    };

    $scope.showFunctionality = function(){
        $scope.showFunzionalita = true;
    };

    $scope.showInformation = function(){
        $scope.showInfo = true;
    };

    $scope.showSimulator = function(){
        $scope.showSimulatore = true;
    };
}]);

app.controller("controllerSimulatore", ["$scope", "currentObject", "JSONToArray", "socket", "$window", function($scope, currentObject, JSONToArray, socket, $window){
    $scope.object = currentObject.get();
    $scope.materassi = JSONToArray($scope.object.db.materassi);
    $scope.materassi_value = $scope.object.properties.materassi;
    $scope.move = 0;
    $scope.isLiked = false;
    $scope.flag = true;
    $scope.flagName = false;
    $scope.showSchede = 0;

    console.log("materassi vale:");
    console.log($scope.materassi);

    socket.on("apio_server_update", function(data){
        $scope.move = parseInt(data.properties.move);
        console.log($scope.move);
        if($scope.move === 0){
            document.getElementById('materassi'+$scope.materassi_value).classList.remove('materassoInPosizione');
        }
    });

    $scope.$watch('object.properties.materassi', function(newValue, oldValue) {
        if(typeof newValue === "undefined"){
            $scope.object.properties.materassi = oldValue;
        }
        else{
            $scope.materassi_value = newValue;
            if(document.getElementById('materassi'+$scope.materassi_value) && typeof oldValue !== "undefined"){
                document.getElementById('materassi'+$scope.materassi_value).classList.add('materassoInPosizione');
            }
        }
    });

    $scope.camelize = function(str) {
        if(str.indexOf("Bios") > -1){
            str = str.split(" ");
            str = str[0];
        }
        str = str.replace("'", "");
        str = str.replace(/ù/g, "u");
        str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter) {
            return letter.toUpperCase();
        }).replace(/\s+/g, '');
        return str.split("/");
    };


    $scope.getIndex = function(profile){
        for(var i in $scope.materassi){
            if($scope.materassi[i] == profile){
                return i;
            }
        }
    };

    $scope.isMobile = function(){
        var flag = false;
        if(window.innerWidth < 768){
            flag = true;
        }
        return flag;
    };

    $scope.mostraSimulatore = function(){
        $scope.$parent.showSimulatore = true;
        $scope.showSchede = 0;
        if(window.innerWidth < 768){
            var elem1 = document.getElementsByClassName("Height");
            var elem2 = document.getElementsByClassName("maxHeight");
            for(var i in elem1){
                elem1.item(1).style.height = "";
            }
            for(var i in elem2){
                elem2.item(i).style.height = "";
            }
        }
        /* FIX BY DISA, DA TESTARE*/
        else{
            var elem1 = document.getElementsByClassName("space-left-previous");
            var elem2 = document.getElementsByClassName("space-left-forward");
            for(var i in elem1){
                elem1.item(i).style.display = "none";
            }
            for(var i in elem2){
                elem2.item(i).style.display = "block";
            }
            document.getElementById("schedeMaterassi5").src = "applications/11/img/schede/LadySoftZip.jpg";
            document.getElementById("schedeMaterassi10").src = "applications/11/img/schede/LadyPiuZip.jpg";
            document.getElementById("schedeMaterassi11").src = "applications/11/img/schede/Memory.jpg";
            document.getElementById("schedeMaterassi14").src = "applications/11/img/schede/Fitness.jpg";
        }
    };

    $scope.normalize = function(str){
        str = str.toLocaleLowerCase();
        str = str.replace(/ /g, "_");
        str = str.replace(/\//g, "_");
        str = str.replace(/'/g, "");
        str = str.replace(/ù/g, "u");
        if(window.innerWidth < 768){
            str += "_mobile";
        }
        return str;
    };

    $scope.reset = function(){
        console.log(window.scrollX);
        console.log(window.scrollY);
        for(var i = 0;i <= 13;i++){
            $scope.object.properties["like"+i] = "0";
        }
        currentObject.update("materassi", "0");
        $scope.setIndex("Nuvola");
        currentObject.update("move", "1", true, false);
        if(window.innerWidth < 768){
            $window.scrollTo(0, 0);
            window.scrollTo(0, 0);
            console.log(window.scrollX);
            console.log(window.scrollY);
            //$location.hash("top");
            //$anchorScroll();
            //window.scrollY = window.scrollX = 0;
        }
    };

    $scope.schedeProdotto = function(val){
        $scope.flag = false;
        $scope.flagName = false;
        $scope.showSchede = parseInt(typeof val !== "undefined" ? val : $scope.materassi_value)+1;
        if(window.innerWidth < 768){
            var elem1 = document.getElementsByClassName("Height");
            var elem2 = document.getElementsByClassName("maxHeight");
            for(var i in elem1){
                elem1.item(1).style.height = "90%";
            }
            for(var i in elem2){
                elem2.item(i).style.height = "100%";
            }
        }
    };

    $scope.send = function(){
        if(typeof $scope.materassi_value !== "undefined" && !$scope.isLiked && $scope.flag){
            if($scope.move === 1){
                alert("Impossibile selezionare il profilo in quanto quello precedentemente selezionato non ha ancora terminato le sue impostazioni. Attendere che il profilo termini i suoi settaggi e poi riprovare.")
            }
            else{
                $scope.move = 1;
                currentObject.update("materassi", $scope.materassi_value);
                if(!document.getElementById('materassi'+$scope.materassi_value).classList.contains('materassoInPosizione')){
	                document.getElementById('materassi'+$scope.materassi_value).classList.add('materassoInPosizione');
                }
                currentObject.update("move", "1", true, false);
            }
        }
        else{
            $scope.isLiked = false;
            $scope.flag = true;
        }
    };

    $scope.setIndex = function(profile){
        if($scope.move === 0){
            for(var i in $scope.materassi){
                if($scope.materassi[i] == profile){
                    $scope.materassi_value = i;
                    break;
                }
            }
        }
    };

    $scope.setLike = function(index){
        $scope.isLiked = true;
        for(var i in $scope.object.properties){
            if(i.indexOf("like") > -1){
                var index_ = parseInt(i.substring(4));
                if(index === index_){
                    $scope.object.properties[i] = $scope.object.properties[i] == "0" ? "1" : "0";
                    break;
                }
            }
        }
    };

    /*$scope.showFirstDouble = function(m){
        $scope.flagName = false;
        var elem = document.getElementsByClassName("class_"+m+"_zip").item(0);
        elem.classList.add("class_"+m);
        elem.classList.remove("class_"+m+"_zip");
    };

    $scope.showSecondDouble = function(m){
        $scope.flagName = true;
        var elem = document.getElementsByClassName("class_"+m).item(0);
        elem.classList.add("class_"+m+"_zip");
        elem.classList.remove("class_"+m);
    };*/

    $scope.showFirstDouble = function(m){
        $scope.flagName = false;
        if(window.innerWidth > 767){
            $("#schedeMaterassi"+m+".viewMobileOk").next().children(0).first().css("display", "none");
            $("#schedeMaterassi"+m+".viewMobileOk").next().children(0).first().next().css("display", "block");
            //document.getElementsByClassName("space-left-previous").item(0).style.display = "none";
            //document.getElementsByClassName("space-left-forward").item(0).style.display = "block";
        }
        var elem = document.getElementById("schedeMaterassi"+m);
        if(m === 5){
            elem.src = "applications/11/img/schede/LadySoftZip.jpg";
        }
        else if(m === 10){
            elem.src = "applications/11/img/schede/LadyPiuZip.jpg";
        }
        else if(m === 11){
            elem.src = "applications/11/img/schede/Memory.jpg";
        }
        else if(m === 14){
            elem.src = "applications/11/img/schede/Fitness.jpg";
        }
    };

    $scope.showSecondDouble = function(m){
        $scope.flagName = true;
        if(window.innerWidth > 767){
            $("#schedeMaterassi"+m+".viewMobileOk").next().children(0).first().css("display", "block");
            $("#schedeMaterassi"+m+".viewMobileOk").next().children(0).first().next().css("display", "none");
            //document.getElementsByClassName("space-left-previous").item(0).style.display = "block";
            //document.getElementsByClassName("space-left-forward").item(0).style.display = "none";
        }
        var elem = document.getElementById("schedeMaterassi"+m);
        if(m === 5){
            elem.src = "applications/11/img/schede/LadySoft.jpg";
        }
        else if(m === 10){
            elem.src = "applications/11/img/schede/LadyPiu.jpg";
        }
        else if(m === 11){
            elem.src = "applications/11/img/schede/Aquasan.jpg";
        }
        else if(m === 14){
            elem.src = "applications/11/img/schede/Marianas.jpg";
        }
    };

    $scope.splitMaterasso = function(m){
        m = m.split("/");
        if(m[0] === "Bliss"){
            m[0] += "\nindip/waterform";
        }
        return m;
    };

    $scope.tornaAllaHome = function(){
        $scope.$parent.showFunzionalita = false;
        $scope.$parent.showInfo = false;
        $scope.$parent.showSimulatore = false;
    };

    $scope.tornaAlSimulatore = function(){
        $scope.showSchede = 0;
    };
}]);

app.controller("controllerFunzionalita", ["$scope", function($scope){
    $scope.mostraSimulatore = function(){
        $scope.$parent.showSimulatore = true;
    };

    $scope.tornaAllaHome = function(){
        $scope.$parent.showFunzionalita = false;
    };
}]);

app.controller("controllerInfo", ["$scope", function($scope){
    $scope.mostraSimulatore = function(){
        $scope.$parent.showSimulatore = true;
    };

    $scope.tornaAllaHome = function(){
        $scope.$parent.showInfo = false;
    };
}]);

app.service('JSONToArray', function(){
    return function(obj){
        var arr = [];
        for(var i in obj){
            if(isNaN(i)){
                throw new Error("All indexes of JSON must be numbers");
            }
            else{
                arr[parseInt(i)] = obj[i];
            }
        }
        return arr;
    }
});

setTimeout(function(){
	angular.bootstrap(document.getElementById("ApioApplication11"), ["ApioApplication11"]);
}, 10);