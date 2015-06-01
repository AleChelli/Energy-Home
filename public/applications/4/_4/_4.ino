
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
	apioSetup(12);
}

void loop(){
	apioLoop();
	if(property=="onoff"){
		if(value=="1"){
			//Do Something
		}
		if(value=="0"){
			//Do Something
		}
	}
	if(property=="red"){
			//Do Something
			}
	if(property=="green"){
			//Do Something
			}
	if(property=="blue"){
			//Do Something
			}
	if(property=="colors"){
		if(value=="0"){
			//Do Something
		}
		if(value=="1"){
			//Do Something
		}
		if(value=="2"){
			//Do Something
		}
		if(value=="3"){
			//Do Something
		}
		if(value=="4"){
			//Do Something
		}
	}
}