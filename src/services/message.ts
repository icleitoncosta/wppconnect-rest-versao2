import { Message, ReturnSendedMessage, MessageType } from '../models/Messages';
import { ClientWhatsApp, RequestEx } from '../models/Request';
import { ServerError } from './server-error';

export class MessagesService {
    public async get(req: RequestEx, id: string): Promise<ServerError | Message> {
        if(id.length < 23) {
            return new ServerError("Error on get message",
                "error_retrieve",
                3,
                "Message id is incorrect format",
                131009
            );
        }
        try {
            const message: Message | any = await (req.client as ClientWhatsApp).getMessageById(id);
            if(message) {
    
                let resolve: Message = {
                    messaging_product: "whatsapp",
                    type: message.type as unknown as MessageType,
                    timestamp: message.timestamp,
                    to: message.to as string,
                    from: message.from,
                    recipient_type: (message.isGroupMsg) ? "group" : "individual",
                }
                if(message.type === "template_button_reply" || message.type === "buttons_response") {
                    resolve.template = "buttons";
                    resolve.hsm = null;
                }else if(message.type === "list_response") {
                    resolve.template = "list";
                    resolve.hsm = null;
                }
                if(message.quotedMsgId){
                    resolve.context = {
                        message_id: message.quotedMsgId as unknown as string,
                    }
                }
                if(message.type === "chat") {
                    resolve.text = {
                        body: message.body,
                    }
                }
    
                if(message.type === "image") {
                    resolve.image = {
                        caption: message.content,
                        mime_type: message.mimetype,
                        sha256: message.mediaKey,
                        id: message.id
                    }
                }
    
                if(message.type === "audio" || message.type === "ptt" ) {
                    // Check fix return for location
                    resolve.audio = {
                        mime_type: message.mimetype,
                        sha256: message.mediaKey,
                        id: message.id
                    }
                }
    
                if(message.type === "document") {
                    // Check fix return for location
                    resolve.document = {
                        mime_type: message.mimetype,
                        sha256: message.mediaKey,
                        id: message.id
                    }
                }
    
                if(message.type === "location") {
                    // Check fix return for location
                    resolve.location = {
                        latitude: message.lat as unknown as number,
                        longitude: message.lng ,
                        name: message.loc,
                        address: message.loc,
                    }
                }
    
                if(message.type === "vcard" || message.type === "multi_vcard") {
                    // Check fix return for location
                    resolve.contacts = 
                        [
                            {
                                name: {
                                    formatted_name: message.sender.formattedName,
                                },
                                phones: [
                                    {
                                        phone: message.sender.id._serialized.replace("@c.us", "")
                                    }
                                ]
                            }
                        ]
                }

                if(message.type === "template_button_reply" || message.type === "buttons_response" || message.type === "list_response") {
                    let type: "button" | "list" | "product" | "product_list" = "button";
                    if(message.type === "list_response") type = "list";
    
                    // Fix interactive buttons
                    resolve.interactive = {
                        action: {
                            button: message.button,
                            //buttons: null,
                        },
                        body: message.body,
                        footer: message.footer,
                        header: message.header,
                        type: type,
                    }
                }
    
                return resolve;
            } else {
                return new ServerError("Error on get message",
                    "error_retrieve",
                    3,
                    "Message not found",
                    131009
                );
            }

        } catch (error: any) {
            return new ServerError("Error on get message",
                "error_retrieve",
                3,
                error,
                131009);
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