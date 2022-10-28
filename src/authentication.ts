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

    return new Promise(async (resolve, reject)=> {
        let tokenDecrypt = '';
        try {
            if (token && token !== '' && (token as string).split(' ').length > 0) {
                const token_value = (token as string).split(' ')[1];
                if (token_value) tokenDecrypt = token_value.replace(/_/g, '/').replace(/-/g, '+');
    
                let sessionOcurr = false;
                clientsArray.forEach(async (session) => {
                    console.log(token);
                    if (session.token == token) {
                        try {
                            console.log('sessao correta... vamos setar');
                            sessionOcurr = true;
                            await bcrypt.compare(session.session + secret, tokenDecrypt);
                            request.session = session.session;
                            request.token = tokenDecrypt;
                            request.data = session as ClientWhatsApp;
                            request.client = session.client;
                            resolve();
                        } catch (err: any) {
                            console.log(err);
                            reject(new ServerError(
                                "Validation Failed", 
                                "invalid_request", 
                                3, 
                                err,
                                132000
                            ));
                        }
                    }
                });
                if(!sessionOcurr) {
                    reject(new ServerError(
                        "Validation Failed", 
                        "invalid_request", 
                        3, 
                        "Token is incorrect. Check your header and try again",
                        132000
                    ));
                    console.log('erro de sessao nao encontrada"');
                    console.log(clientsArray);
                }
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
            return reject(error);
        }
    })
}
