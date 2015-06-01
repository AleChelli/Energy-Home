var request = require("request");
var Apio = require("../../../apio.js");

module.exports = {
    send : function(apioUpdateObject) {
        Apio.Database.db.collection("Objects").find({objectId: apioUpdateObject.objectId}).toArray(function(err, result){
            if(err) {
                Apio.Util.debug("Unable to find Object: "+err);
                throw new Apio.Database.Error("Unable to find Object");
            }
            else if (result) {
                var r = result[0];
                var encoded_message = "ZigBee:"+r.name+":"+apioUpdateObject.address;

                for (var k in apioUpdateObject.properties)
                    break;

                var operationName = "";
                var HttpMethod = "";
                var functionName = "";
                var args = "";

                switch(k) {
                    case "execcycle" :
                        HttpMethod = "POST";
                        functionName = "WashingMachine";
                        if (apioUpdateObject.properties[k] === "1")
                            operationName = "execStartCycle";
                        else if (apioUpdateObject.properties[k] === "0")
                            operationName = "execPauseCycle";
                        console.log(functionName);
                        break;
                    case "cycle" :
                        functionName = "WashingMachine";
                        HttpMethod = "POST";
                        operationName = "setCycle";
                        args = [{"type" : "java.lang.Short", "value" : apioUpdateObject.properties.cycle}];
                        break;
                }

                encoded_message += ":"+functionName;
                console.log("url vale:");
                console.log("http://"+r.gatewayIP+"/api/functions/"+encoded_message);
                if(args){
                    var req_data = {
                        json : true,
                        uri : "http://"+r.gatewayIP+"/api/functions/"+encoded_message,
                        method : HttpMethod,
                        body : {
                            operation : operationName,
                            arguments : args
                        }
                    }
                }
                else{
                    var req_data = {
                        json : true,
                        uri : "http://"+r.gatewayIP+"/api/functions/"+encoded_message,
                        method : HttpMethod,
                        body : {
                            operation : operationName
                        }
                    }
                }
                console.log("Jemma Adapter: Sending the following HTTP request :\n");
                console.log(req_data);
                console.log("\n\n");

                var req = request(req_data,function(error,response,body){
                    console.log("Jemma Adapter: The Jemma server responded with:");
                    console.log(body);
                    if ("200" === response.statusCode || 200 === response.statusCode){
                        console.log("ok");
                        return true;
                    }
                    else{

                        console.log("no");
                        return false;
                    }
                })
            }
        });
    }
};
