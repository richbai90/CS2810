<?php
/**
 *  Query a data sample given a starting time and a date range.
 *  This script will first attempt to curl the data from thingspeak
 *  And if that fails, will query the data from a local database
 */

include_once 'ThingSpeak.php';
include_once 'helpers.php';

$thingSpeak = new ThingSpeak(259671, 'EVHMI98M214INT1N');
$interval = [];



if(isset($_GET['date']) && isset($_GET['interval'])) {
    $dateInterval = new DateInterval($_GET['interval']);
    $toDate = new DateTime($_GET['date']);
    $fromDate = new DateTime($_GET['date']);
    $fromDate = $fromDate->sub($dateInterval);
    $interval = [$fromDate, $toDate];
}

if ($thingSpeak->getData($interval)) {
    echo json_encode($thingSpeak->data->feeds, JSON_PRETTY_PRINT);
} else {
    echo json_encode(getLocalData($interval), JSON_PRETTY_PRINT);
}