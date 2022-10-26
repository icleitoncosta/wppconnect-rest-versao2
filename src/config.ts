const config = {
  // Devices
  "secretKey": "THISISMYSECURETOKEN", // Secret key for generate acess token
  "host": "http://localhost", // HOST for connect, localhost or IP of your server
  "port": "21465",
  "deviceName": "WppConnect", // Name for display on smartphone
  "poweredBy": "WPPConnect-Server",
  "startAllSession": true, // Start All Sessions on server startup

  // Webhook
  "webhook": {
      "url": null, // URL for send all webhooks
      "autoDownload": true, //Auto download files received
      "acks": true, // Read confirmation, audio listening, contacts and groups
      "presence": true, // Contacts online and offile
      "participants_changed_group": true, // Group member changes
      "reactions": true // Receive reactions that contacts give in messages
    }
}
export default config;