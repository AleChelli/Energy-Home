
#include "apioGeneral.h"

#include "atmegarfr2.h"
#include "config.h"
#include "hal.h"
#include "halTimer.h"
#include "nwk.h"
#include "nwkCommand.h"
#include "nwkDataReq.h"
#include "nwkFrame.h"
#include "nwkGroup.h"
#include "nwkRoute.h"
#include "nwkRouteDiscovery.h"
#include "nwkRx.h"
#include "nwkSecurity.h"
#include "nwkTx.h"
#include "phy.h"
#include "sys.h"
#include "sysConfig.h"
#include "sysEncrypt.h"
#include "sysTimer.h"
#include "sysTypes.h"

#include "ApioLwm.h"
#include "sensors.h"
ApioList umidita= new ApioListNode;
//You can use this variable for store the value of sensors
int umiditaVal;

String lastValueumidita = "";
int pinA7=A7;
void setup() {
	generalSetup();
	apioSetup(21);
	apioSend("21:hi::-");
	pinMode(pinA7,INPUT);
}

void loop(){
	apioLoop();
	//Use the function for the read data from Sensor and save it in
	//umiditaVal
 	umiditaVal = analogRead(pinA7);
	if (lastValue !=  String(umiditaVal)) {
		lastValue = String(umiditaVal);
		if(exists(umidita, "umidita", String(umiditaVal), 1)){
			apioSend("135:update:umidita:"+String(umiditaVal)+"-");
		}
	}
	if(property=="umidita"){
		if(value=="/"){
			apioSend("135:update:umidita:"+String(umiditaVal)+"-");
		} else if(!exists(umidita, property, value, 0)){
				insert(&umidita, property, value);
		}else{
			deleteItem(&umidita, property, value);
			}
		property="";
		
	}
}