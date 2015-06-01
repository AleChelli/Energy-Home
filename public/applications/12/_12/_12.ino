
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
void setup() {
	generalSetup();
	apioSetup(99);
	apioSend("99:hi::-");
}

void loop(){
	apioLoop();
	if(property=="materassi"){
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
		if(value=="5"){
			//Do Something
		}
		if(value=="6"){
			//Do Something
		}
		if(value=="7"){
			//Do Something
		}
		if(value=="8"){
			//Do Something
		}
		if(value=="9"){
			//Do Something
		}
		if(value=="10"){
			//Do Something
		}
		if(value=="11"){
			//Do Something
		}
		if(value=="12"){
			//Do Something
		}
		if(value=="13"){
			//Do Something
		}
			property=="";
		
	}
}