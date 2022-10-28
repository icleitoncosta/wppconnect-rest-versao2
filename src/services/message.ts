import { Message, ReturnSendedMessage, MessageType, Buttons } from '../models/Messages';
import { Message as MessageWPP } from '@wppconnect-team/wppconnect';
import { ClientWhatsApp, RequestEx } from '../models/Request';
import { Error } from '../models/Error';
import { ServerError } from './server-error';
import { SendAudio, SendContact, SendDocument, SendImage, SendInteractive, SendLocation, SendReaction, SendSticker, SendText, SendVideo } from '../models/SendMessage';

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
    public async create(req: RequestEx, payload: SendText | SendImage | SendAudio | SendDocument | SendSticker | SendVideo | SendContact | SendLocation | SendReaction | SendInteractive): Promise<ReturnSendedMessage | Error> {
        try {
            let message;
            let options;
            if(payload.type !== "reaction" && payload.type !== "interactive" && payload.context?.message_id) {
                options = {
                    quotedMsg: payload.context.message_id
                }
            }
            if(payload.type === "text") {
                message = await req.client?.sendText(payload.to, payload.text.body as string, options);
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
            }else if(payload.type === "image") {
                message = await req.client?.sendImage(payload.to, payload.image?.link as string, undefined, payload.image?.caption, (payload.context?.message_id ? payload.context?.message_id : undefined));
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
            }else if(payload.type === "audio") {
                message = await req.client?.sendPtt(payload.to, payload.audio.link as string, undefined, undefined, (payload.context?.message_id ? payload.context?.message_id : undefined)) as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "document") {
                message = await req.client?.sendFile(payload.to, payload.document.link as string, options) as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "video") {
                message = await req.client?.sendFile(payload.to, payload.video.link as string, options) as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "sticker") {
                message = await req.client?.sendImageAsSticker(payload.to, payload.sticker?.link as string) as unknown as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "interactive") {
                if(payload.interactive?.type === "button") {
                    let buttons = [];
                    for(const btn of payload?.interactive?.action?.buttons as Buttons[]) {
                        buttons.push({
                            id: btn.reply.id,
                            text: btn.reply.title
                        });
                    }
                    message = await req.client?.sendText(payload.to, payload.interactive?.body?.text as string, {
                        useTemplateButtons: false,
                        buttons: buttons
                    })
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
                }else {
                    if(payload.interactive?.type !== "list") {
                        return {
                            error: {
                                message: "Error on send message",
                                type: "error_delivery_message",
                                code: 1,
                                error_data: {
                                    messaging_product: "whatsapp",
                                    details: "Error in your request, parameters not found.",
                                },
                                error_subcode: 135000,
                                fbtrace_id: undefined,
                            }
                        }
                    }
                    message = await req.client?.sendListMessage(payload.to, {
                        buttonText: payload.interactive.action.button as string,
                        description: payload.interactive.body?.text as string,
                        sections: payload.interactive.action.sections as any,
                        footer: payload.interactive.footer?.text,
                        title: payload.interactive.header?.text
                    }) as unknown as MessageWPP;
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
                }
            }
            else {
                return {
                    error: {
                        message: "Error on send message",
                        type: "error_delivery_message",
                        code: 1,
                        error_data: {
                            messaging_product: "whatsapp",
                            details: "Error in your request, parameters not found.",
                        },
                        error_subcode: 135000,
                        fbtrace_id: undefined,
                    }
                }
            }
        } catch (error: any) {
            return {
                error: {
                    message: "Error on send message",
                    type: "error_delivery_message",
                    code: 1,
                    error_data: {
                        messaging_product: "whatsapp",
                        details: error,
                    },
                    error_subcode: 131000,
                    fbtrace_id: undefined,
                }
            }
        }
    }
    private returnMessageSucess(to: string, msgId: string): ReturnSendedMessage{
        return {
            messaging_product: "whatsapp",
            contacts: {
                input: to,
                wa_id: to,
            },
            messages: {
                id: msgId as string,
            }
        }
    }
}