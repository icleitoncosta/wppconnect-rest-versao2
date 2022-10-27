import { Ack, create, SocketState, LiveLocation, Message, ParticipantEvent, PresenceEvent, CreateOptions, Whatsapp } from "@wppconnect-team/wppconnect";
import FileTokenStore from "../stores/FileTokenStore";
import config from "../config";
import { ClientWhatsApp, RequestEx } from "../models/Request";
import { clientsArray } from "./session";

export default class CreateSessionUtil {
    async create(req: RequestEx, clientsArray: Array<any>, session: any) {
      try {
        let client = this.getClient(session);
        if (client.status != null && client.status !== 'CLOSED') return;
        client.status = 'INITIALIZING';
        client.config = req.body;
  
        const myTokenStore = new FileTokenStore(client).tokenStore;
  
        await myTokenStore.getToken(session);
  
        if (config.customUserDataDir) {
            config.createOptions.puppeteerOptions = {
            userDataDir: config.customUserDataDir + session,
          };
        }
  
        let wppClient = await create(
                Object.assign({}, { tokenStore: myTokenStore }, config.createOptions, {
                session: session,
                deviceName: config.deviceName,
                poweredBy: config.poweredBy || 'WPPConnect-Server',
                
                catchQR: (base64Qr: string, _asciiQR: string, _attempt: string, urlCode: string) => {
                  this.exportQR(req, base64Qr, urlCode, client);
                },
                onLoadingScreen: (percent: string, message: string) => {
                  req.logger.info(`[${session}] ${percent}% - ${message}`);
                },
                statusFind: (statusFind: string) => {
                  try {
                    if (statusFind === 'autocloseCalled' || statusFind === 'desconnectedMobile') {
                      client.status = 'CLOSED';
                      client.qrcode = null;
                      client.close();
                      clientsArray[session] = undefined;
                    }
                    //callWebHook(client, req, 'status-find', { status: statusFind });
                    req.logger.info(statusFind + '\n\n');
                  } catch (error) {}
                },
              }) as unknown as CreateOptions
        );
  
        client = clientsArray[session] = Object.assign(wppClient, client);
        await this.start(req, client);
  
        if (config.webhook.participants_changed_group) {
          await this.onParticipantsChanged(req, client);
        }
  
        if (config.webhook.reactions) {
          await this.onReactionMessage(client, req);
        }
      } catch (e) {
        req.logger.error(e);
      }
    }
  
    async opendata(req: RequestEx, session: string) {
      await this.create(req, clientsArray, session);
    }
  
    exportQR(_req: RequestEx, qrCode: string, urlCode: string, client: Whatsapp) {
      //eventEmitter.emit(`qrcode-${client.session}`, qrCode, urlCode, client);
      Object.assign(client, {
        status: 'QRCODE',
        qrcode: qrCode,
        urlcode: urlCode,
      });
  
      qrCode = qrCode.replace('data:image/png;base64,', '');
      //const imageBuffer = Buffer.from(qrCode, 'base64');

      return { status: 'qrcode', qrcode: qrCode, urlcode: urlCode };
    }
  
    async onParticipantsChanged(_req: RequestEx, client: Whatsapp) {
      await client.isConnected();
      await client.onParticipantsChanged((_ParticipantEvent: ParticipantEvent) => {
        // Logica aqui
      });
    }
  
    async start(req: RequestEx, client: Whatsapp) {
      try {
        await client.isConnected();
        Object.assign(client, { status: 'CONNECTED', qrcode: null });
  
        req.logger.info(`Started Session: ${client.session}`);
        //callWebHook(client, req, 'session-logged', { status: 'CONNECTED'});
        //req.io.emit('session-logged', { status: true, session: client.session });
      } catch (error) {
        req.logger.error(error);
        //req.io.emit('session-error', client.session);
      }
  
      await this.checkStateSession(client, req);
      await this.listenMessages(client, req);
  
      if (config.webhook.acks) {
        await this.listenAcks(client, req);
      }
  
      if (config.webhook.presence) {
        await this.onPresenceChanged(client, req);
      }
    }
  
    async checkStateSession(client: Whatsapp, req: RequestEx) {
      await client.onStateChange((state) => {
        req.logger.info(`State Change ${state}: ${client.session}`);
        const conflits = [SocketState.CONFLICT];
  
        if (conflits.includes(state)) {
          client.useHere();
        }
      });
    }
  
    async listenMessages(client: Whatsapp, _req: RequestEx) {
      await client.onMessage(async (message: Message) => {
        
        if (message.type === 'location')
          client.onLiveLocation(message.sender.id._serialized, (_location: LiveLocation) => {
            //callWebHook(client, req, 'location', location);
          });
      });
  
      await client.onAnyMessage((message: any) => {
        message.session = client.session;
      });
  
      await client.onIncomingCall(async (_call: any) => {
        //req.io.emit('incomingcall', call);
      });
    }
  
    async listenAcks(client: Whatsapp, _req: RequestEx) {
      await client.onAck(async (_ack: Ack) => {
        //req.io.emit('onack', ack);
      });
    }
  
    async onPresenceChanged(client: Whatsapp, _req: RequestEx) {
      await client.onPresenceChanged(async (_presenceChangedEvent: PresenceEvent) => {
        //req.io.emit('onpresencechanged', presenceChangedEvent);
      });
    }
  
    async onReactionMessage(client: Whatsapp, _req: RequestEx) {
      await client.isConnected();
      await client.onReactionMessage(async (_reaction: any) => {
        //req.io.emit('onreactionmessage', reaction);
      });
    }
  
    getClient(session: any): ClientWhatsApp {
      let client = clientsArray[session];
  
      if (!client) client = clientsArray[session] = { status: undefined, session: session };
      return client as ClientWhatsApp;
    }
  }