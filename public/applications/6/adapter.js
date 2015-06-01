var request = require("request");
var Apio = require("../../../apio.js");

module.exports = {
	send : function(apioUpdateObject) {
        Apio.Database.db.collection("Objects").find({objectId: apioUpdateObject.objectId}).toArray(function(err, result) {
            if (err) {
                Apio.Util.debug("Unable to find Object: " + err);
                throw new Apio.Database.Error("Unable to find Object");
            }
            else if (result) {
                var r = result[0];

                var encoded_message = "ZigBee:"+r.name+":"+apioUpdateObject.address;
                for (var k in apioUpdateObject.properties)
                    break;
                var operationName = "";
                var functionName = "DoorLock";
                var HttpMethod = "";
                console.log("LA K vale "+k);
                switch(k) {
                    case "status" :
                        if (apioUpdateObject.properties[k] === "1")
                            operationName = "open";
                        else if (apioUpdateObject.properties[k] === "0")
                            operationName = "close";

                        encoded_message += ":"+functionName;
                        var req_data = {
                            json : true,
                            uri : "http://"+r.gatewayIP+"/api/functions/"+encoded_message,
                            method : "POST",
                            body : {
                                operation : operationName
                            }
                        };
                        console.log("encoded_message vale:");
                        console.log(encoded_message);
                        var req = request(req_data,function(error,response,body){
                            console.log("Jemma Adapter: I sent to Jemma the following request");
                            console.log(req_data);
                            console.log("Jemma Adapter: The Jemma server responded with:");
                            console.log(body);
                            if ("200" === response.statusCode || 200 === response.statusCode) {
                                console.log("ok");
                                return true;
                            }
                            else {
                                console.log("no");
                                return false;
                            }
                        });

                        break;
                }
            }
        });
	}
};
