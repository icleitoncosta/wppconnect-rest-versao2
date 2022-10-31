import bcrypt from "bcrypt";
import config from "./config";
import { ClientWhatsApp, RequestEx } from "./models/Request";
import { ServerError } from "./services/server-error";
import { clientsArray } from "./utils/session";

export function expressAuthentication(
  request: RequestEx,
  _securityName: string,
  _scopes?: string[]
): Promise<void> {

    const { authorization: token } = request.headers; 

    return new Promise((resolve, reject)=> {
        if (!token && token == '') {
            reject(new ServerError(
                "Token in not present", 
                "invalid_request", 
                0, 
                "Token is not present. Check your header and try again",
                190
            ));
        }
        let tokenDecrypt = '';
        let clientFound = false;
        tokenDecrypt = token?.replace(/_/g, '/').replace(/-/g, '+') as string;
        clientsArray.forEach( (session) => {
            if (session.token === tokenDecrypt) {
                clientFound = true;
                bcrypt.compare(session.session + config.secretKey, tokenDecrypt, (err, same) => {
                    if(err) {
                        reject(new ServerError(
                            "Token error", 
                            "error_request", 
                            0, 
                            err,
                            190
                        ));
                    }
                    if(same) {
                        resolve();
                        request.session = session.session;
                        request.token = session.token;
                        request.client = session.client as Partial<ClientWhatsApp>;
                        resolve();
                    }
                });
            }
        });
        if(!clientFound) {
            reject(new ServerError(
                "Token is incorrect", 
                "invalid_request", 
                0, 
                "Token is incorrect. Check your header and try again",
                190
            ));
        }
    })
}
