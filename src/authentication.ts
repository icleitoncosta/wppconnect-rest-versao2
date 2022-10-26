import bcrypt from "bcrypt";
import config from "./config";
import { RequestEx } from "./models/Request";
import { clientsArray } from "./utils/session";

export async function expressAuthentication(
  request: RequestEx,
  securityName: string,
  scopes?: string[]
): Promise<any> {
    console.log(securityName); //fix it
    console.log(scopes); //fix it
    const secret  = config.secretKey;
    const { PHONE_NUMBER_ID } = request.params as any;
    let tokenDecrypt = '';
    let sessionDecrypt = '';

    const { authorization: token } = request.headers;
    
    if (!PHONE_NUMBER_ID) return Promise.reject();

    try {
        sessionDecrypt = PHONE_NUMBER_ID.split(':')[0];
        tokenDecrypt = PHONE_NUMBER_ID.split(':')[1].replace(/_/g, '/').replace(/-/g, '+');
        
    } catch (error: any) {
        try {        
            if (token && token !== '' && token.split(' ').length > 0) {
            const token_value = token.split(' ')[1];
            if (token_value) tokenDecrypt = token_value.replace(/_/g, '/').replace(/-/g, '+');
            else return Promise.reject({ message: 'Token is not present. Check your header and try again' });
          } else {
            return Promise.reject({ message: 'Token is not present. Check your header and try again' });
          }
        } catch (error) {
            Promise.reject(error);
        }
    }   

    try {
        const result = await bcrypt.compare(sessionDecrypt + secret, tokenDecrypt);
        request.session = PHONE_NUMBER_ID.split(':')[0];
        request.token = tokenDecrypt;
        request.client = clientsArray[PHONE_NUMBER_ID];
        return Promise.resolve(result);
        
    } catch (error) {
        return Promise.reject(error);
    }
}
