import { RequestEx } from "../models/Request";
import QRCode from "qrcode";
import { version } from '../../package.json';
import { ServerError } from "./server-error";
import CreateSessionUtil from "../utils/create-session";
import { Logger } from "winston";
import api from "axios";
import FileTokenStore from "../stores/FileTokenStore";
import config from "../config";

export class SessionService {
    declare session;
    constructor(session: string) {
        this.session = session;
    }

    public async create(_req: RequestEx): Promise<{
        status: string,
        qrcode: string | null,
        urlcode: string | null,
        version: string
    }> {
        new CreateSessionUtil().opendata(_req, this.session);
        return this.getSessionState(_req);
    }

    public async getSessionState(_req: RequestEx): Promise<any> {
        try {
          const client = _req.client;
          const qr = client?.urlcode ? await QRCode.toDataURL(client.urlcode) : null;
          
          if ((client == null || client.status == null))
          {
            return {
                status: "CLOSED",
                qrcode: null,
                urlcode: null,
                version: version
            }
          }
          else if (client != null) {
            return {
              status: client.status as string,
              qrcode: qr,
              urlcode: client.urlcode as string,
              version: version,
            };
          }
        } catch (ex: any) {
            _req.logger.error(ex);
            return new ServerError(
                "Internal error", 
                "invalid_request", 
                3, 
                ex,
                132000
                );
        }
    }

    public async startAllSessions(config: any, logger: Logger) {
      try {
        await api.post(`${config.host}:${config.port}/${config.secretKey}/start-all`);
      } catch (error) {
        logger.error(error);
      }
    }

    public async startAll(req: RequestEx, secret: string): Promise<{ success: true } | ServerError> {
      try {
        if(config.secretKey !== secret) {
          return new ServerError(
              "Internal error", 
              "invalid_request", 
              3, 
              "Secret KEY is invalid!",
              132000
          );
        }
        const allSessions = await this.getAllTokens();

        if(allSessions.length > 0) {
          allSessions.map(async (session: any) => {
            const util = new CreateSessionUtil();
            await util.opendata(req, session);
          });
        }
        return { success: true }

      } catch (error) {
        return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            error,
            132000
        );
      }
    }

    private async getAllTokens() : Promise<any> {
      const tokenStore = new FileTokenStore(null);
      const myTokenStore = tokenStore.tokenStore;
      try {
        return await myTokenStore.listTokens();
      } catch (e) {
        return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            e,
            132000
        );
      }
    }
}