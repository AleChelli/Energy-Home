
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
void setup() {
	apioSetup(24);
	apioSend("24:hi::-");
}

void loop(){
	apioLoop();
	if(property=="onoff1"){
		if(value=="1"){
			//Do Something
		}
	}
	if(property=="onoff2"){
		if(value=="1"){
			//Do Something
		}
	}
	if(property=="onoff3"){
		if(value=="1"){
			//Do Something
		}
	}
	if(property=="onoff4"){
		if(value=="1"){
			//Do Something
		}
	}
}