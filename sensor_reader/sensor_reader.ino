#include <OneWire.h>
#include <DallasTemperature.h>
 
// Data wire is plugged into pin 7 on the Arduino
#define ONE_WIRE_BUS_GREEN 7
 
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire oneWireGreen(ONE_WIRE_BUS_GREEN);
 
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensorGreen(&oneWireGreen);
 
void setup(void)
{
  // start serial port
  Serial.begin(9600);
  Serial.println("Dallas Temperature IC Control Library Demo");

  // Start up the library
  sensorGreen.begin();

}
 
 
void loop(void)
{
  // call sensors.requestTemperatures() to issue a global temperature
  // request to all devices on the bus
  //Serial.print(" Requesting temperatures...");
  sensorGreen.requestTemperatures();

  //erial.println("DONE");

  // Serial.print("Temperature for Device 1 is: ");
 float tempGreen = sensorGreen.getTempCByIndex(0); // Why "byIndex"? 
    // You can have more than one IC on the same bus. 
    // 0 refers to the first IC on the wire


float tempOrange = sensorGreen.getTempCByIndex(1);
float tempBlue = sensorGreen.getTempCByIndex(2);
float tempWhite = sensorGreen.getTempCByIndex(3);

    Serial.print(tempGreen);
    Serial.print("|");
    Serial.print(tempOrange);
    Serial.print("|");
    Serial.print(tempBlue);
    Serial.print("|");
    Serial.print(tempWhite);
    Serial.println();
    delay(1000);
 
}
