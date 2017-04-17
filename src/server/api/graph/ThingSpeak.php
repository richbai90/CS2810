<?php

/**
 * Created by PhpStorm.
 * User: rich
 * Date: 4/15/17
 * Time: 7:19 PM
 */

define('READ', 1);
define('WRITE', 2);

class ThingSpeak
{

    function __construct($channelId, $readKey = null, $writeKey = null)
    {
        $this->channelId = $channelId;
        $this->readKey = $readKey;
        $this->writeKey = $writeKey;
        $this->data = null;
    }

    function getData($timeframe = [])
    {

        $ch = curl_init($this->buildUrl(READ, $timeframe));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_CAINFO, realpath(getcwd() . "/../../keychain/ca-bundle.crt"));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);

        if ($errno = curl_errno($ch)) {
            $this->data = curl_strerror($errno);
            return false;
        }

        curl_close($ch);
        $this->data = json_decode($output);
        return true;
    }

    private function buildUrl($opt = 1, $timeFrame = [])
    {
        if ($opt == READ) {
            $api_key = $this->readKey;
        } elseif ($opt = WRITE) {
            $api_key = $this->writeKey;
        } else {
            throw new InvalidArgumentException('opt must be 1 or 2 for write or read got ' . $opt);
        }

        $params = ['api_key' => $api_key];

        if (count($timeFrame) == 2) {
            $params['start'] = $timeFrame[0];
            $params['end'] = $timeFrame[1];
        }

        $queryStringArr = [];
        foreach ($params as $param => $value) {
            if ($value instanceof DateTime) {
                $value = $value->format('YYYY-MM-DD%20HH:NN:S');
            }
            $queryStringArr[] = $param . '=' . $value;
        }

        $queryString = implode('&', $queryStringArr);


        return 'https://api.thingspeak.com/channels/' . $this->channelId . '/feeds.json?' . $queryString;
    }
}