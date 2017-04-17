import requests


class thingspeak():
    def __init__(self, channelID, writeAPIKey=None, readAPIKey=None):
        # Prepare API connection parameters
        self.writeAPIkey = writeAPIKey
        self.readAPIKey = readAPIKey
        self.channelID = channelID
        self.url = "https://api.thingspeak.com/update.json"  # ThingSpeak server settings
        self.messageBuffer = []  # Buffer to hold the data

    def update(self, data):
        # Function to send the POST request to
        # ThingSpeak channel for bulk update.

        if self.writeAPIkey is None:
            print 'Cannot Update without writeAPIKey'
            return

        params = {'api_key': self.writeAPIkey}  # Format the json data buffer

        for i, field in enumerate(data):
            params['field%d' % (i + 1)] = float(field)

        r = requests.post(url=self.url, params=params)
        if r.status_code is not 200:
            print r.status_code

