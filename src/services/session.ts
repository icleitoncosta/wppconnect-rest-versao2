import { RequestEx } from "../models/Request";
import QRCode from "qrcode";
import { version } from '../../package.json';
import { ServerError } from "./server-error";
import CreateSessionUtil from "../utils/create-session";
import api from "axios";
import FileTokenStore from "../stores/FileTokenStore";
import config from "../config";
import archiver  from "archiver";
import fileSystem from "fs";
import unzipper from "unzipper";
import { logger } from "../app";

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

    public async startAllSessions(config: any, logger: any) {
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

    public async restoreSessionByUpload(_req: RequestEx, SECRET_KEY: string, file: Express.Multer.File): Promise<{ success: true } | ServerError> {
      if(!file.mimetype.includes("zip")) {
        return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            "The filetype is invalid",
            133000
        );
      }
      if(SECRET_KEY !== config.secretKey) {
        return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            "Secret KEY is invalid!",
            132000
        );
      }else {
        try {    
          const path = __dirname + "/../../uploads/restore.zip";

          await this.downloadZIPFileForRestore(file.buffer, path);
          
          const extract = fileSystem.createReadStream(path).pipe(unzipper.Extract({ path: 'restore' }));
          extract.on("close", () => {
            fileSystem.cpSync("restore/tokens", "tokens", { force: true, recursive: true });
            fileSystem.cpSync("restore/userDataDir", config.customUserDataDir, { force: false, recursive: true });
            this.startAllSessions(config, logger);
          })
          
          return { success: true };
        } catch (error) {
            return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            error,
            139000
          );
        }
      }
    }

    private async downloadZIPFileForRestore(file: Buffer, path: string): Promise<string | ServerError> {
      try {
        await fileSystem.promises.writeFile(path, file);
        return path;
      } catch (error) {
        console.log(error);
        return new ServerError(
          "Internal error", 
          "invalid_request", 
          3, 
          error,
          139000
        );
      } 
    }

    public async backupAllSessions(_req: RequestEx, SECRET_KEY: string): Promise<any> {
      if(SECRET_KEY !== config.secretKey) {
        return new ServerError(
            "Internal error", 
            "invalid_request", 
            3, 
            "Secret KEY is invalid!",
            132000
        );
      }else {
        try {    
          return await this.backupFolders(_req);
        } catch (error) {return new ServerError(
          "Internal error", 
          "invalid_request", 
          3, 
          error,
          139000
      );
        }
      }
    }
    private backupFolders(req: RequestEx) : Promise<any> {
      return new Promise((resolve, reject) => {
        const output = fileSystem.createWriteStream(__dirname + '/../backupSessions.zip');
        const archive = archiver('zip', {
          zlib: { level: 9 } // Sets the compression level.
        });
        archive.on('error', function(err) {
          reject(err);
          req.logger.error(err);
        });
        archive.pipe(output);
        archive.directory(__dirname + '/../../tokens', "tokens");
        fileSystem.cpSync(config.customUserDataDir, __dirname + "/../../backupFolder", { force: true, recursive: true});
        
        archive.directory(__dirname + "/../../backupFolder", "userDataDir");
        archive.finalize();
        
        output.on('close', () => {
          fileSystem.rmSync(__dirname + "/../../backupFolder", { recursive: true })
          const myStream = fileSystem.createReadStream(__dirname + "/../backupSessions.zip");
          myStream.on("end", () => {
            req.res?.end();
            myStream.pipe(req.res as any);
          });
          myStream.on('error', function(err: any) {
            console.log(err);
            reject(err);
          });
          resolve(myStream);
        });
      })
    }
}