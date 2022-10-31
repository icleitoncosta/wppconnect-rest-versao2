import config from "../config";

import bcrypt from "bcrypt";
import { RequestEx } from "../models/Request";
import { Error } from "../models/Error";
import { clientsArray } from "../utils/session";
interface ReturnToken {
    status: string; 
    token: string | null; 
    data: any; 
}
export class TokenService {
    public async create(req: RequestEx, PHONE_NUMBER_ID: string, SECRET_KEY: string): Promise<Error | ReturnToken> {
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
            for(const session of clientsArray) {
                if(session.session === PHONE_NUMBER_ID) {
                    session.token = hashFormat;
                    session.qrcode = null;
                    session.urlcode = "";
                    ocurr = true;
                }
            }
            if(!ocurr) {
                clientsArray.push({
                    session: PHONE_NUMBER_ID,
                    token: hashFormat,
                    qrcode: null,
                    urlcode: "",
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