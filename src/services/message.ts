import { Message, ReturnSendedMessage } from 'src/models/Messages';

export class MessagesService {
    public get(id: string): Message {
        return {
            messaging_product: "whatsapp",
            type: "text",
            to: id,
        }
    }
    public create(payload: Message): ReturnSendedMessage {
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