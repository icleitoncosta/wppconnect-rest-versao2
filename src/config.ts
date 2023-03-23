const config = {
  // Devices
  "secretKey": "THISISMYSECURETOKEN", // Secret key for generate acess token
  "host": "http://localhost", // HOST for connect, localhost or IP of your server
  "port": "21465",
  "deviceName": "WppConnect", // Name for display on smartphone
  "poweredBy": "WPPConnect-Server",
  "startAllSession": true, // Start All Sessions on server startup
  "customUserDataDir": "./userDataDir/", // Folder for save sessions of whatsapp

  // Webhook
  "webhook": {
      "url": "", // URL for send all webhooks
      "acks": true, // Read confirmation, audio listening, contacts and groups
      "presence": true, // Contacts online and offile
      "participants_changed_group": true, // Group member changes
      "reactions": true, // Receive reactions that contacts give in messages
      "readMessage": true, // Send seen for contact
      "calls": true, // Send event calls for webhook
    },

  // Logs
  "log": {
    "level": "silly", // To not show too many logs, change 'silly' to 'error'
    "logger": ["console", "file"]
  },

  // Create Options for WhatsApp Start Session
  "createOptions": {
    "browserArgs": [
      "--disable-web-security",
      "--no-sandbox",
      "--disable-web-security",
      "--aggressive-cache-discard",
      "--disable-cache",
      "--disable-application-cache",
      "--disable-offline-load-stale-cache",
      "--disk-cache-size=0",
      "--disable-background-networking",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--disable-translate",
      "--hide-scrollbars",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-first-run",
      "--safebrowsing-disable-auto-update",
      "--ignore-certificate-errors",
      "--ignore-ssl-errors",
      "--ignore-certificate-errors-spki-list"
    ],
    "puppeteerOptions": {},
  },
}
export default config;