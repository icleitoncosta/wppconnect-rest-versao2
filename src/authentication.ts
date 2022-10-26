import { Whatsapp } from "@wppconnect-team/wppconnect";
import bcrypt from "bcrypt";
import config from "./config";
import { RequestEx } from "./models/Request";
import { ServerError } from "./services/server-error";
import { clientsArray } from "./utils/session";

export async function expressAuthentication(
  request: RequestEx,
  securityName: string,
  scopes?: string[]
): Promise<any> {
    console.log(securityName); //fix it
    console.log(scopes); //fix it
    const secret  = config.secretKey;
    let tokenDecrypt = '';

    const { authorization: token } = request.headers; 

    try {
        if (token && token !== '' && (token as string).split(' ').length > 0) {
            const token_value = (token as string).split(' ')[1];
            if (token_value) tokenDecrypt = token_value.replace(/_/g, '/').replace(/-/g, '+');
        } else {
            return Promise.reject(new ServerError(
                "Token in not present", 
                "invalid_request", 
                3, 
                "Token is not present. Check your header and try again",
                132000
                ));
        }

        for (const session of clientsArray) {
            if (session.token === token) {
                try {
                    await bcrypt.compare(session.session + secret, tokenDecrypt);
                    request.session = session.session;
                    request.token = tokenDecrypt;
                    request.client = session as Whatsapp;
                } catch (err: any) {
                    
                return Promise.reject(new ServerError(
                    "Validation Failed", 
                    "invalid_request", 
                    3, 
                    "Token is incorrect. Check your header and try again",
                    132000
                    ));
                }
            }
        }
        return Promise.resolve();
        
    } catch (error) {
        return Promise.reject(error);
    }
}
