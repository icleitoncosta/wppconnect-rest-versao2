import { FileTokenStore as FlTokenStore } from './FileTokenStore/FileTokenStore';
import { ClientWhatsApp } from '../models/Request';

export default class FileTokenStore {
    declare client: ClientWhatsApp | null;
    constructor (client: ClientWhatsApp | null) {
        this.client = client as ClientWhatsApp;
    }
    tokenStore = new FlTokenStore({
        encodeFunction: (data) => {
          return this.encodeFunction(data, this.client?.config);
        },
        decodeFunction: (text) => {
          return this.decodeFunction(text, this.client as ClientWhatsApp);
        },
      });
    
      encodeFunction = function (data: any, _config: any) {
        return JSON.stringify(data);
      };
    
      decodeFunction = function (text: string, client: ClientWhatsApp) {
        let object = JSON.parse(text);
        if (object.config && Object.keys(client.config).length === 0) client.config = object.config;
        if (object.webhook && Object.keys(client.config).length === 0) client.config.webhook = object.webhook;
        return object;
      };
}