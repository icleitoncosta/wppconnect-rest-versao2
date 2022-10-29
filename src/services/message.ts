import { ReturnSendedMessage, MessageType, Buttons, SessionExtra, TextMessageObject, MediaObject, LocationMessageObject, ContactObject, InteractiveObject, PollMessageObject } from '../models/Messages';
import { Message as MessageWPP } from '@wppconnect-team/wppconnect';
import { ClientWhatsApp, RequestEx } from '../models/Request';
import { Error } from '../models/Error';
import { ServerError } from './server-error';
import { SendAudio, SendContact, SendDocument, SendImage, SendInteractive, SendLocation, SendPoll, SendReaction, SendSticker, SendText, SendVideo } from '../models/SendMessage';
import { ReceivedAndGetMessage } from '../models/Webhook';
import config from '../config';
import vCard from "vcf";
import { StatusMessage } from '../models/StatusMessages';

export class MessagesService {
    public async get(req: RequestEx, id: string): Promise<ServerError | ReceivedAndGetMessage> {
        if(id.length < 23) {
            return new ServerError("Error on get message",
                "error_retrieve",
                3,
                "Message not found",
                131009
            );
        }
        try {
            const message: MessageWPP | any = await (req.client as ClientWhatsApp).getMessageById(id);
            if(message) {
                return this.returnGetMessage(message);
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
    private returnGetMessage(message: SessionExtra): Promise<ReceivedAndGetMessage> {
        let resolve: ReceivedAndGetMessage = {
            object: "whatsapp_business_account",
            entry: [
                {
                    id: message.session,
                    changes: [
                        {
                            value: {
                                messaging_product: "whatsapp",
                                metadata: {
                                    display_phone_number: message.sender.formattedName,
                                    phone_number_id: message.sender.id._serialized,
                                },
                                contacts: [
                                  {
                                    wa_id: message.sender.id._serialized,
                                    profile: {
                                      name: (!message.sender.name) ? message.sender.pushname as string : message.sender.formattedName,
                                    }
                                  },
                                ],
                                messages: [
                                  {
                                    messaging_product: "whatsapp",
                                    id: message.id,
                                    type: this.getMessageType(message),
                                    to: (message.isGroupMsg) ? message.from : message.to,
                                    from: (message.isGroupMsg) ? message.sender.id._serialized : message.from,
                                    timestamp: message.timestamp,
                                    context: this.getMessageContext(message),
                                    recipient_type: message.isGroupMsg ? "group" : "individual",
                                    text: this.getTextObject(message),
                                    image: this.getMediaObject(message, "image"),
                                    audio: this.getMediaObject(message, "audio"),
                                    video: this.getMediaObject(message, "video"),
                                    document: this.getMediaObject(message, "document"),
                                    sticker: this.getMediaObject(message, "sticker"),
                                    interactive: this.getInteractiveObject(message),
                                    contacts: this.getContactObject(message),
                                    location: this.getLocationObject(message),
                                    poll: this.getPollObject(message),
                                  }
                                ]
                            },
                            field: "messages",
                        }
                    ]
                }
            ]
          }
        return Promise.resolve(resolve);
    }
    private getMessageType(message: SessionExtra): MessageType {
        if(message.type === "chat" && message.replyButtons) return "interactive";
        else if(message.type === "chat") return "text";
        else if(message.type === "unknown") return "poll";
        else if(message.type === "audio" || message.type === "ptt") return "audio";
        else if(message.type === "vcard" || message.type === "multi_vcard" ) return "contacts";
        else if(message.type === "template_button_reply") return "interactive";
        else if(message.type === "list") return "interactive";
        else if(message.type === "location" 
        || message.type === "image" 
        || message.type === "video" 
        || message.type === "document" 
        || message.type === "hsm" 
        || message.type === "sticker") return message.type;
        else return "unknown";
    }
    private getTextObject(message: SessionExtra): TextMessageObject | undefined {
        if(this.getMessageType(message) === "text") {
            return {
                body: message.content,
            }
        }else return undefined;
    }
    private getMediaObject(message: SessionExtra, mediaType: string): MediaObject | undefined {
        if(this.getMessageType(message) === mediaType) {
            return {
                id: message.id,
                link: `${config.host}:${config.port}/${message.id}`,
                sha256: message.mediaKey,
                caption: message.caption,
                mime_type: message.mimetype
            }
        }else return undefined;
    }
    private getLocationObject(message: SessionExtra): LocationMessageObject | undefined {
        if(this.getMessageType(message) === "location") {
            return {
                latitude: message.lat as number,
                longitude: message.lng as number,
                name: message.loc?.split("\n")[0] as string,
                address: message.loc?.split("\n")[1] as string
            }
        }else return undefined;
    }
    private getPollObject(message: SessionExtra): PollMessageObject | undefined {
        if(this.getMessageType(message) === "poll") {
            return {
                title: message.poll?.title as string,
                options: message.poll.options as string[],
                selectableCount: message.poll.selectableCount,
            }
        }else return undefined;
    }
    private getContactObject(message: SessionExtra): ContactObject[] | undefined {
        try {
            if(message.type === "vcard") {
                const vcard = new vCard().parse(message.body.replace("\n", "\r\n"));
    
                return [{
                    name: {
                        formatted_name: vcard.data.fn ? vcard.data.fn.valueOf() as string : "",
                        first_name: vcard.data.fn ? vcard.data.fn.valueOf() as string : "",
                        last_name: vcard.data.ln ?vcard.data.ln.valueOf() as string : "",
                        middle_name: "",
                        suffix: "",
                        prefix: "",
                        
                    },
                    phones: [{
                        type: "CELL",
                        phone: vcard.data.tel ? vcard.data.tel.valueOf() as string : undefined,
                        wa_id: "",
                    }]
                }]
            }else if(message.type === "multi_vcard") {
                let arrayContacts: ContactObject[] = [];
                for(const contact of message.vcardList as Array<any>) {
                    const vcard = new vCard().parse(contact.vcard.replace("\n", "\r\n"));
                    arrayContacts.push({
                        name: {
                            formatted_name: vcard.data.fn.valueOf() as string,
                            first_name: vcard.data.fn.valueOf() as string,
                            last_name: vcard.data.ln.valueOf() as string,
                            middle_name: "",
                            suffix: "",
                            prefix: "",
                            
                        },
                        phones: [{
                            type: "CELL",
                            phone: vcard.data.tel.valueOf() as string,
                            wa_id: "",
                        }]
                    })
                }
                return arrayContacts;
            } else return undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
        
    }
    private getInteractiveObject(message: SessionExtra): InteractiveObject | undefined {
        if(this.getMessageType(message) === "interactive") {
            let replyBtn = [];
            if(message.type === "chat") {
                replyBtn = message.replyButtons as Array<any>;
                replyBtn["title" as any] = replyBtn["displayText" as any] as any;
                delete replyBtn["displayText" as any];
            }
            return {
                action: {
                    button: (message.type === "list") ? message.list?.buttonText as string : "",
                    buttons: (message.type === "chat") ? replyBtn : undefined,
                    sections: (message.type === "list") ? message.list?.sections : undefined,
                },
                type: (message.type === "chat") ? "button" : "list",
                body: {
                    text: message.list?.description as string
                },
                header: (message.type === "list") ? { type: "text",text: message.list?.title as string } : undefined,
                footer: (message.type === "list") ? { text: message.list?.footerText as string } : undefined
            }
        }else return undefined;
    }
    private getMessageContext(message: SessionExtra) : { message_id: string } | undefined {
        if(message.quotedMsgId) return { message_id: message.quotedMsgId}
        else return undefined;
    }
    /**
     * Function to create and send message to contact
     */
    public async create(req: RequestEx, payload: SendText | SendImage | SendAudio | SendDocument | SendSticker | SendVideo | SendContact | SendLocation | SendReaction | SendInteractive | SendPoll): Promise<ReturnSendedMessage | Error> {
        try {
            let message;
            let options;
            if(payload.type !== "reaction" && payload.type !== "interactive" && payload.type !== "poll" && payload.context?.message_id) {
                options = {
                    quotedMsg: payload.context.message_id
                }
            }
            if(payload.type === "text") {
                message = await req.client?.sendText(payload.to, payload.text.body as string, options);
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
            }else if(payload.type === "image") {
                if(payload.image.link?.includes("base64")) {
                    message = await req.client?.sendImageFromBase64(payload.to, payload.image?.link as string, "image.jpg", payload.image?.caption, (payload.context?.message_id ? payload.context?.message_id : undefined));
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
                } else {
                    message = await req.client?.sendImage(payload.to, payload.image?.link as string, undefined, payload.image?.caption, (payload.context?.message_id ? payload.context?.message_id : undefined));
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
                }
            }else if(payload.type === "audio") {
                if(payload.audio.link?.includes("base64")) {
                    message = await req.client?.sendPttFromBase64(payload.to, payload.audio.link as string, "audio.mp3", undefined, (payload.context?.message_id ? payload.context?.message_id : undefined));
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id as string));
                } else {
                    message = await req.client?.sendPtt(payload.to, payload.audio.link as string, undefined, undefined, (payload.context?.message_id ? payload.context?.message_id : undefined)) as MessageWPP;
                    return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
                }
            }else if(payload.type === "document") {
                message = await req.client?.sendFile(payload.to, payload.document.link as string, options) as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "video") {
                message = await req.client?.sendFile(payload.to, payload.video.link as string, options) as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "sticker") {
                message = await req.client?.sendImageAsSticker(payload.to, payload.sticker?.link as string) as unknown as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "location") {
                message = await req.client?.sendLocation(payload.to, { lat: payload.location.latitude, lng: payload.location.longitude, address: payload.location.address, name: payload.location.name}) as unknown as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, message?.id));
            }else if(payload.type === "poll") {
                if(!payload.to.includes("@g.us") || payload.recipient_type === 'individual') {
                    return {
                        error: {
                            message: "Error on send message",
                            type: "error_delivery_message",
                            code: 1,
                            error_data: {
                                messaging_product: "whatsapp",
                                details: "Poll messages can only be sent to groups.",
                            },
                            error_subcode: 135000,
                            fbtrace_id: undefined,
                        }
                    }
                }
                //Await wppconnect release a version for implement sendPollMessage

                //message = await req.client?.sendPollMessage(payload.to, payload.poll.title, payload.poll.options, { selectableCount: payload.poll.selectableCount} ) as unknown as MessageWPP;
                return Promise.resolve(this.returnMessageSucess(payload.to, "Please, implement release on WPPConnect"));
            }else if(payload.type === "reaction") {
                message = await req.client?.sendReactionToMessage(payload.reaction.message_id, payload.reaction.emoji) as unknown as MessageWPP;
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

    /**
     * Mark status message as read and played
     */
    public async markStatusMessage(req: RequestEx, payload: StatusMessage): Promise<any> {
        try {
            if(payload.status === "read") {
                try {
                    await req.client?.sendSeen(this.getChatIdByMessageId(payload.message_id));
                    return Promise.resolve({ sucess: true });
                } catch (error) {
                    return Promise.reject(new ServerError("Error on get markstatus message",
                        "error_set_status",
                        3,
                        error,
                        131009));
                }
            } else if(payload.status === "played") {
                await req.client?.markPlayed(payload.message_id);
                return Promise.resolve({ sucess: true });
            } else if(payload.status === "deleted") {
                await req.client?.deleteMessage(this.getChatIdByMessageId(payload.message_id), payload.message_id, false);
                return Promise.resolve({ sucess: true });
            } else {
                Promise.resolve({ sucess: false });
            }
        } catch (error: any) {
            return Promise.reject(new ServerError("Error on get markstatus message",
                "error_set_status",
                3,
                error,
                131009));
        }
    }
    private getChatIdByMessageId(messageId: string): string {
        let msgId = "";
        if(messageId.includes("@c.us")) {
            msgId = messageId.replace("false_","").replace("true_","").split("@c.us")[0];
        } else {
            msgId = messageId.replace("false_","").replace("true_","").split("@g.us")[0];
        }
        return msgId;
    }
}