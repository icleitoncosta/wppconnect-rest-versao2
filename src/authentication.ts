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
                3, 
                "Token is not present. Check your header and try again",
                132000
            ));
        }
        let tokenDecrypt = '';
        tokenDecrypt = token?.replace(/_/g, '/').replace(/-/g, '+') as string;
        clientsArray.forEach( (session) => {
            if (session.token === tokenDecrypt) {
                bcrypt.compare(session.session + config.secretKey, tokenDecrypt, (err, same) => {
                    if(err) {
                        reject(new ServerError(
                            "Token error", 
                            "error_request", 
                            3, 
                            err,
                            132000
                        ));
                    }
                    if(same) {
                        resolve();
                        request.session = session.session;
                        request.token = session.token;
                        request.data = [];
                        request.client = session.client as ClientWhatsApp;
                        resolve();
                    }
                });
            }
        });
    })
}
