
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
	apioSetup(11111);
	apioSend("11111:hi::-");
}

void loop(){
	apioLoop();
	if(property=="WaveIn"){
		if(value=="1"){
			//Do Something
		}
		if(value=="0"){
			//Do Something
		}
			property=="";
		
	}
	if(property=="WaveOut"){
		if(value=="1"){
			//Do Something
		}
		if(value=="0"){
			//Do Something
		}
			property=="";
		
	}
}