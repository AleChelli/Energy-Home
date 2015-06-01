
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
int pin20=20;
int pin21=21;
void setup() {
	generalSetup();
	apioSetup(567);
	apioSend("567:hi::-");
	pinMode(pin20,OUTPUT);
	pinMode(pin21,OUTPUT);
}

void loop(){
	apioLoop();
	if(property=="onoff"){
		if(value=="1"){
			digitalWrite(pin20,HIGH);
			//Do Something
		}
		if(value=="0"){
			digitalWrite(pin20,LOW);
			//Do Something
		}
			property=="";
		
	}
	if(property=="onoff1"){
		if(value=="1"){
			digitalWrite(pin21,HIGH);
			//Do Something
		}
		if(value=="0"){
			digitalWrite(pin21,LOW);
			//Do Something
		}
			property=="";
		
	}
}