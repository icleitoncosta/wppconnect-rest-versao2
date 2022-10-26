import config from "../config";

import bcrypt from "bcrypt";
import { RequestEx } from "../models/Request";

export class TokenService {
    public checkToken(token: string) {
        console.log(token);

    }
    public async create(req: RequestEx, PHONE_NUMBER_ID: string, SECRET_KEY: string): Promise<{status: string; token: string | null; data: any; }> {
        try {
            console.log(req);
            if (SECRET_KEY !== config.secretKey) {
                console.log('Token generation attempt without SECRET_KEY.')
                return {
                    status: "error",
                    token: null,
                    data: "The SECRET_KEY is incorrect"
                };
            }
            const hash = await bcrypt.hash(PHONE_NUMBER_ID + config.secretKey, 10);
            const hashFormat =  hash.replace(/\//g, '_').replace(/\+/g, '-');
            
            return {
                status: "sucess",
                token: hashFormat,
                data: null,
            };

        } catch (error: any) {
            return {
                status: "error",
                token: null,
                data: error,
            };
        }
    }
}