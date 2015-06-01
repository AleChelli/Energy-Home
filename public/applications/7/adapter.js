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
                var HttpMethod = "";
                var functionName = "";
                var args = "";

                switch(k) {
                    case "onoff" :
                        HttpMethod = "POST";
                        functionName="OnOff";
                        if (apioUpdateObject.properties[k] === "1")
                            operationName = "setTrue";
                        else if (apioUpdateObject.properties[k] === "0")
                            operationName = "setFalse";
                        console.log(functionName);

                        break;
                    case "HUE" :
                        functionName="ColorControl";
                        HttpMethod = "POST";
                        operationName = "setHS";
                        args = [{"type" : "java.lang.Short", "value" : String(parseInt(254*parseInt(apioUpdateObject.properties.HUE)/360))}, {"type" : "java.lang.Short", "value" : String(parseInt(254*parseInt(r.properties.Saturation)/100))}];
                        break;

                    case "Saturation" :
                        functionName="ColorControl";
                        HttpMethod = "POST";
                        operationName = "setHS";
                        args = [{"type" : "java.lang.Short", "value" : String(parseInt(254*parseInt(r.properties.HUE)/360))}, {"type" : "java.lang.Short", "value" : String(parseInt(254*parseInt(apioUpdateObject.properties.Saturation)/100))}];
                        break;

                    case "Intensity" :
                        functionName="MultiLevelControl";
                        HttpMethod = "POST";
                        operationName = "setData";
                        args = [{"type" : "java.math.BigDecimal", "value" : apioUpdateObject.properties.Intensity}];
                        break;

                }

                encoded_message += ":"+functionName;
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
