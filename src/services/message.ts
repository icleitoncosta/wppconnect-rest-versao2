import { Message, ReturnSendedMessage } from 'src/models/Messages';
import { RequestEx } from '../models/Request';

export class MessagesService {
    public get(req: RequestEx, id: string): Message {
        console.log(req);
        return {
            messaging_product: "whatsapp",
            type: "text",
            to: id,
        }
    }
    public create(req: RequestEx, payload: Message): ReturnSendedMessage {
        console.log(req);
        return {
            messaging_product: "whatsapp",
            contacts: {
                input: payload.to,
                wa_id: payload.to,
            },
            messages: {
                id: "string",
            }
        }
    }
}