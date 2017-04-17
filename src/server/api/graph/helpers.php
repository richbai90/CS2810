<?php
/**
 * Created by PhpStorm.
 * User: rich
 * Date: 4/15/17
 * Time: 9:29 PM
 */

function getLocalData($interval = [])
{
    $mysql = new mysqli('localhost', 'geo', 'geotherm', 'datalog');
    if ($mysql->connect_errno) {
        printf("Connect failed: %s\n", $mysql->connect_error);
        exit();
    }

    $query = 'SELECT * FROM tblData';
    if (count($interval) == 2) {
        $query .= ' WHERE `TimeStamp` BETWEEN "' . $interval[0]->format('YYYY-MM-DD%20HH:NN:S') . '"" AND "' . $interval[1]->format('YYYY-MM-DD%20HH:NN:S') . '"';
    }

    if ($result = $mysql->query($query)) {
        $data_set = [];
        $data = new stdClass();
        while($row = $result->fetch_row()) {
            $field_name = 'field'. $row[2];
            $data->created_at = $row[1];
            $data->entry_id = $row[0];
            $data->$field_name = $row[3];

            if($row[2] == 4) {
                //reset after the 4th sensor
                //todo update arduino code to send 5 sensors
                $data->field5 = null;
                $data_set[] = $data;
                $data = new stdClass();
            }
        }
    } else {
        printf('mysql query error: ' . $mysql->error . '\n');
        exit;
    }

    return $data_set;
}

;