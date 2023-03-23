import config from "../config";

import bcrypt from "bcrypt";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { clientsArray } from "../utils/session";
import FileTokenStore from "../stores/FileTokenStore";
interface ReturnToken {
    status: string; 
    token: string | null; 
    data: any; 
}
export class TokenService {
    public async create(req: RequestEx, PHONE_NUMBER_ID: string, SECRET_KEY: string, refuseCall?: boolean, msgRefuseCall?: string): Promise<Error | ReturnToken> {
        try {
            if (SECRET_KEY !== config.secretKey) {
                req.logger("warn", "Token generation attempt SECRET_KEY incorrectly.");
                return {
                    error: {
                    message: "Validation Failed",
                    type: "invalid_request",
                    code: 3,
                    error_data: {
                        messaging_product: "whatsapp",
                        details: "Check the SECRET KEY",
                    },
                    error_subcode: 132000,
                    fbtrace_id: undefined,
                  }};
            }
            const hash = await bcrypt.hash(PHONE_NUMBER_ID + config.secretKey, 10);
            const hashFormat =  hash.replace(/\//g, '_').replace(/\+/g, '-');

            let ocurr = null;
            for(let session of clientsArray) {
                if(session.session === PHONE_NUMBER_ID) {
                    session.qrcode = null;
                    session.urlcode = "";
                    ocurr = true;
                    const myTokenStore = new FileTokenStore(session.client as any).tokenStore;
                    const data = myTokenStore.getToken(session.session as any);
                    const newTokenStore = {
                        ...data,
                        token: hash,
                        refuseCall: refuseCall,
                        msgRefuseCall: msgRefuseCall,
                    }
                    myTokenStore.setToken(session.session as any, newTokenStore as any);
                    (session.client as any).config = newTokenStore;
                }
            }
            if(!ocurr) {
                clientsArray.push({
                    session: PHONE_NUMBER_ID,
                    token: hash,
                    qrcode: null,
                    urlcode: "",
                    client: {
                        session: PHONE_NUMBER_ID,
                        status: "CLOSED",
                        config: {
                            token: hash,
                            refuseCall: refuseCall ? refuseCall : false,
                            msgRefuseCall: msgRefuseCall ? msgRefuseCall : "",
                        },
                    }
                });
            }
            
            return {
                status: "sucess",
                token: hashFormat,
                data: null,
            };

        } catch (error: any) {
            return {
                error: {
                message: "Validation Failed",
                type: "invalid_request",
                code: 3,
                error_data: {
                    messaging_product: "whatsapp",
                    details: error,
                },
                error_subcode: 132000,
                fbtrace_id: undefined,
              }};
        }
    }
}