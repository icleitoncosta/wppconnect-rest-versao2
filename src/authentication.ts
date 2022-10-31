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
    const secret  = config.secretKey;

    const { authorization: token } = request.headers; 
    let sessionOcurr = false;

    return new Promise(async (resolve, reject)=> {
        let tokenDecrypt = '';
        try {
            if (token && token !== '' && (token as string).split(' ').length > 0) {
                const token_value = (token as string).split(' ')[1];
                if (token_value) tokenDecrypt = token_value.replace(/_/g, '/').replace(/-/g, '+');
    
                clientsArray.forEach( async (session) => {
                    if (session.token === token.toString()) {
                        await bcrypt.compare(session.session + secret, tokenDecrypt);
                        sessionOcurr = true;
                        request.session = session.session;
                        request.token = tokenDecrypt;
                        request.data = session as ClientWhatsApp;
                        request.client = session.client;
                        resolve();
                    }
                });
            } else {
                reject(new ServerError(
                    "Token in not present", 
                    "invalid_request", 
                    3, 
                    "Token is not present. Check your header and try again",
                    132000
                    ));
            }
        } catch (error) {
            reject(new ServerError(
                "Validation Failed", 
                "token_error", 
                3, 
                error,
                132000
            ));
            return reject(error);
        } finally {
            if(!sessionOcurr) {
                reject(new ServerError(
                    "Validation Failed", 
                    "invalid_request", 
                    3, 
                    "Token is incorrect. Check your header and try again",
                    132000
                ));
            }
        }
    })
}
