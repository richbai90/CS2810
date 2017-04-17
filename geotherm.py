import datetime

import pymysql
import serial

from thingspeak import thingspeak
from thingspeak import exceptions

# connect to Mysql
# We want to connect to the local database to keep a copy on disk
# Regardless of whether or not we can connect to the cloud
# This is per Don's request

connection = pymysql.connect(host='localhost',
                             user='geo',
                             password='geotherm',
                             db='DataLog',
                             cursorclass=pymysql.cursors.DictCursor)

# prepare the thingspeak api

api = thingspeak.thingspeak(258556, 'NF2F08CPDVH001LV')

with serial.Serial() as ser:
    ser.baudrate = 9600
    ser.port = '/dev/cu.usbmodem1421'
    ser.open()
    ser.flushInput()
    ser.flushOutput()

    # So long as we have data, we insert it into the database
    while True:
        data_raw = ser.readline()
        data_list = data_raw.split('|')
        temps = {}

        # Try and send the data to the cloud
        # if we can't just move on
        try:
            api.update(data_list)
        except exceptions.ConnectionError:
            pass

        for i, temp in enumerate(data_list):
            # make sure we don't have any new sensors

            with connection.cursor() as cursor:
                # Create a new record
                sql = "INSERT INTO `tblSensors` (SensorID, SensorType, SensorLocation) VALUES (%s, %s, %s) " \
                      "ON DUPLICATE KEY UPDATE SensorType=VALUES(SensorType), SensorLocation=VALUES(SensorLocation)"
                cursor.execute(sql, (i + 1, 'Temperature', 'Location',))
                connection.commit()

                # connection is not autocommit by default. So you must commit to save
                # your changes.

                with connection.cursor() as cursor:
                    # Create a new record
                    sql = "INSERT INTO `tblData` (`TimeStamp`, SensorID, Temp) VALUES (%s, %s, %s) "
                    cursor.execute(sql, (datetime.datetime.now(), i + 1, float(temp)))
                    connection.commit()
