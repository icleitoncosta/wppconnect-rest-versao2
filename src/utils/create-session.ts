import { Ack, create, SocketState, Message, ParticipantEvent, CreateOptions, Whatsapp, defaultLogger } from "@wppconnect-team/wppconnect";
import FileTokenStore from "../stores/FileTokenStore";
import config from "../config";
import { ClientWhatsApp, RequestEx } from "../models/Request";
import { clientsArray } from "./session";
import { Webhook } from "../services/webhook";
import { logger } from "./defaultLogger";
import { plugins } from "../plugins";
import { EventTypes } from "../services/plugin";

export default class CreateSessionUtil {
    async create(req: RequestEx, clientsArray: Array<any>, session: any) {
      try {
        defaultLogger.level = config.log.level;
        req.logger = logger.child({session});
        let client = this.getClient(session, req);
        if (client.status != null && client.status !== 'CLOSED') return;
        client.status = 'INITIALIZING';
  
        const myTokenStore = new FileTokenStore(client).tokenStore;
  
        const myToken = await myTokenStore.getToken(session);
        if(myToken) {
          client.config = myToken;
        } else {
          myTokenStore.setToken(session, client.config);
        }
  
        if (config.customUserDataDir) {
            config.createOptions.puppeteerOptions = {
            userDataDir: config.customUserDataDir + session,
          };
        }

        const wppClient = await create(
                Object.assign({}, { tokenStore: myTokenStore, config: myToken }, config.createOptions, {
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
                      //clientsArray[session] = undefined;
                    }
                    new Webhook().send(client, "status-find", statusFind);
                    req.logger.info(statusFind);
                  } catch (error) {}
                },
              }) as unknown as CreateOptions
        );
        for(const ses of clientsArray) {
          if(ses.session == session) {
            ses.client = wppClient;
            client = wppClient;
            ses.token = client.token;
            ses.client.config = myToken;
          }
        }
        await this.start(req, client);
  
        if (config.webhook.participants_changed_group) {
          await this.onParticipantsChanged(req, client as Whatsapp);
        }
  
        if (config.webhook.reactions) {
          await this.onReactionMessage(client as Whatsapp, req);
        }
      } catch (e) {
        req.logger.error(e);
      }
    }
  
    async opendata(req: RequestEx, session: string) {
      await this.create(req, clientsArray, session);
    }
  
    exportQR(_req: RequestEx, qrCode: string, urlCode: string, client: ClientWhatsApp) {
      //eventEmitter.emit(`qrcode-${client.session}`, qrCode, urlCode, client);]
      client.qrcode = qrCode;
      client.status = 'QRCODE';
      client.urlcode = urlCode;
      qrCode = qrCode.replace('data:image/png;base64,', '');
      //const imageBuffer = Buffer.from(qrCode, 'base64');

      return { status: 'qrcode', qrcode: qrCode, urlcode: urlCode };
    }
  
    async onParticipantsChanged(_req: RequestEx, client: Whatsapp) {
      await client.isConnected();
      client.onParticipantsChanged((_ParticipantEvent: ParticipantEvent) => {
        new Webhook().send(client, "participantsChangeGroup", _ParticipantEvent);
        // Logica aqui
      });
    }
  
    async start(req: RequestEx, client: ClientWhatsApp) {
      try {
        await client?.isConnected();
        client.status = "CONNECTED";
        client.qrcode = null;
  
        req.logger.info(`Started Session: ${client.session}`);
        new Webhook().send(client, "status-find", "CONNECTED");
        //req.io.emit('session-logged', { status: true, session: client.session });
      } catch (error) {
        req.logger.error(error);
        //req.io.emit('session-error', client.session);
      }
  
      await this.checkStateSession(client as ClientWhatsApp, req);
      await this.listenMessages(client as ClientWhatsApp, req);
  
      if (config.webhook.acks) {
        await this.listenAcks(client as ClientWhatsApp, req);
      }
  
      if (config.webhook.presence) {
        await this.onPresenceChanged(client as ClientWhatsApp, req);
      }
    }
  
    async checkStateSession(client: ClientWhatsApp, req: RequestEx) {
      client.onStateChange((state) => {
        req.logger.info(`State Change ${state}: ${client.session}`);
        const conflits = [SocketState.CONFLICT];
  
        if (conflits.includes(state)) {
          client.useHere();
        }
      });
    }
  
    async listenMessages(client: ClientWhatsApp, _req: RequestEx) {
      client.onMessage((message: any) => {
        message.session = client.session;
        plugins.call(EventTypes.onMessage, client, message);
        new Webhook().send(client, "message", message);
      });
  
      client.onAnyMessage(async (_message: Message) => {
        //new Webhook().send(client, "message", message);
      });
  
      client.onIncomingCall(async (call: any) => {
        new Webhook().send(client, "call", call);
        if(client.config.refuseCall) {
          await client.rejectCall(call.id);
          if(client.config.msgRefuseCall) {
            await client.sendText(call.peerJid, client.config.msgRefuseCall)
          }
        }
      });
    }
  
    async listenAcks(client: ClientWhatsApp, _req: RequestEx) {
      client.onAck(async (ack: Ack ) => {
        new Webhook().send(client, "ack", ack);
        //req.io.emit('onack', ack);
      });
    }
  
    async onPresenceChanged(client: ClientWhatsApp, _req: RequestEx) {
      client.onPresenceChanged(async (_presenceChangedEvent: any) => {
        _presenceChangedEvent.session = client.session;
        new Webhook().send(client, "presence", _presenceChangedEvent);
      });
    }
  
    async onReactionMessage(client: ClientWhatsApp, _req: RequestEx) {
      await client.isConnected();
      client.onReactionMessage(async (reaction: any) => {
        reaction.session = client.session;
        new Webhook().send(client, "reaction", reaction);
        //req.io.emit('onreactionmessage', reaction);
      });
    }
  
    getClient(session: string, req?: RequestEx): ClientWhatsApp {
      let client = null;
      if(req?.client && req.client.session) {
        client = req?.client;
      }else {
        for(const cli of clientsArray) {
          if(cli.session === session) {
            client = cli.client;
          }
        }
      }
  
      if (!client) {
        clientsArray.push(
          { 
            status: "CLOSED",
            session: session,
            client: {
              status: "CLOSED",
              session: session
            },
          })
        for(const arrItem of clientsArray) {
          if(arrItem.session === session) {
            client = arrItem.client;
          }
        }
      }
      return client as ClientWhatsApp;
    }
  }