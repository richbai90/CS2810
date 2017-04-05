#include <OneWire.h>
#include <DallasTemperature.h>
 
// Data wire is plugged into pin 7 on the Arduino
#define ONE_WIRE_BUS_GREEN 7
#define ONE_WIRE_BUS_ORANGE 6
#define ONE_WIRE_BUS_BLUE 5
#define ONE_WIRE_BUS_ORANGE_WHITE 4
 
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire oneWireGreen(ONE_WIRE_BUS_GREEN);
OneWire oneWireOrange(ONE_WIRE_BUS_ORANGE);
OneWire oneWireBlue(ONE_WIRE_BUS_BLUE);
OneWire oneWireOrangeWhite(ONE_WIRE_BUS_ORANGE_WHITE);
 
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensorGreen(&oneWireGreen);
DallasTemperature sensorOrange(&oneWireOrange);
DallasTemperature sensorBlue(&oneWireBlue);
DallasTemperature sensorOrangeWhite(&oneWireOrangeWhite);
 
void setup(void)
{
  // start serial port
  Serial.begin(9600);
  Serial.println("Dallas Temperature IC Control Library Demo");

  // Start up the library
  sensorGreen.begin();
  sensorOrange.begin();
  sensorBlue.begin();
  sensorOrangeWhite.begin();
}
 
 
void loop(void)
{
  // call sensors.requestTemperatures() to issue a global temperature
  // request to all devices on the bus
  //Serial.print(" Requesting temperatures...");
  sensorGreen.requestTemperatures();
  sensorOrange.requestTemperatures();// Send the command to get temperatures
  //erial.println("DONE");

  // Serial.print("Temperature for Device 1 is: ");
 float tempGreen = sensorGreen.getTempCByIndex(0); // Why "byIndex"? 
    // You can have more than one IC on the same bus. 
    // 0 refers to the first IC on the wire

float tempOrange = sensorOrange.getTempCByIndex(0);
float tempBlue = sensorBlue.getTempCByIndex(0);
float tempOrangeWhite = sensorOrangeWhite.getTempCByIndex(0);

    Serial.print(tempGreen);
    Serial.print("|");
    Serial.print(tempOrange);
    Serial.print("|");
    Serial.print(tempBlue);
    Serial.print("|");
    Serial.println(tempOrangeWhite);
    delay(500);
 
}
