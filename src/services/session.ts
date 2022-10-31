import { RequestEx } from "../models/Request";
import QRCode from "qrcode";
import { version } from '../../package.json';
import { ServerError } from "./server-error";
import CreateSessionUtil from "../utils/create-session";

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

    private async getSessionState(_req: RequestEx): Promise<any> {
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
}