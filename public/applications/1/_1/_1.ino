
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

#include <Servo.h>
Servo myservo; // create servo object to control a servo
int val;
void setup() {
	generalSetup();
	apioSetup(11);
    myservo.attach(9); // attaches the servo on pin 9 to the servo object
}

void loop(){
	apioLoop();
	if(property=="position"){
			//Do Something
			//179 must become the value of property position
			val = map(val, 0, 1023, 0, 179);  
			//scale it to use it with the servo (value between 0 and 180)
            myservo.write(val); // sets the servo position according to the scaled value
            //delay(15)
			
    }
	if(property=="speed"){
			//Do Something
	}
}


