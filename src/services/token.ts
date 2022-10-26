import config from "../config";

import bcrypt from "bcrypt";
import { ClientWhatsApp, RequestEx } from "../models/Request";
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
                req.logger("warn", "Token generation attempt without SECRET_KEY.");
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

            const session: Partial<ClientWhatsApp> = {
                session: PHONE_NUMBER_ID,
                token: hash
            };

            clientsArray.push(session);
            console.log(clientsArray);
            
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