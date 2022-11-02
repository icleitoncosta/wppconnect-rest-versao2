import config from "../config";
import { ClientWhatsApp } from "../models/Request";
import api from 'axios';
import { ReceivedAndGetMessage } from "../models/Webhook";
import { logger } from "../app";
import { MessagesService } from "./message";
import { SessionExtra } from "../models/Messages";
import { Ack, ParticipantEvent } from "@wppconnect-team/wppconnect";
import { StatusMessage } from "src/models/StatusMessages";

export class Webhook {
    public async send(client: ClientWhatsApp, event: any, dataEv: any) {
        const webhook = config.webhook.url || false;
        const chatId = dataEv.from || dataEv.chatId || (dataEv.chatId ? dataEv.chatId._serialized : null);
        if (webhook) {
          try {
            const data: ReceivedAndGetMessage = {
                object: "whatsapp_business_account",
                entry: [{
                    id: client.session,
                    changes: []
                }]
            }
            if(event === "message") {
                this.sendMessage(webhook, dataEv, client, chatId)
            } else if(event === "call" && config.webhook.calls) {
                this.sendCall(webhook, dataEv, data, client)
            } else if(event === "presence" && config.webhook.presence) {
                this.sendPresence(webhook, dataEv, data, client)
            } else if(event === "participantsChangeGroup" && config.webhook.presence) {
                this.sendParticipantsChange(webhook, dataEv, data, client)
            } else if(event === "ack" && config.webhook.presence) {
                this.sendAckStatus(webhook, dataEv, data, client)
            } else if(event === "status-find" && config.webhook.presence) {
                this.sendStatusSession(webhook, dataEv, data, client)
            } else if(event === "reaction" && config.webhook.presence) {
                this.sendReaction(webhook, dataEv, data, client)
            }
          } catch (e) {
            logger.error(e);
          }
        }
    }
    private async sendMessage(webhook: string, message: SessionExtra, client: ClientWhatsApp, chatId: string): Promise<any> {
        try {
            const data = await new MessagesService().returnGetMessage(message);
            await api.post(webhook, data)
            if (config.webhook.readMessage) await client.sendSeen(chatId);
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }

    private async sendCall(webhook: string, call: any, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getContact(call.peerJid);
            data.entry[0].changes.push({
                field: "call",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.formattedName,
                        phone_number_id: contact.id._serialized,
                    },
                    contacts: [
                      {
                        wa_id: contact.id._serialized,
                        profile: {
                          name: (!contact.name) ? contact.pushname as string : contact.formattedName,
                        }
                      },
                    ],
                    call: data
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }

    private async sendPresence(webhook: string, presence: any, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getContact(presence.id);
            data.entry[0].changes.push({
                field: "presence",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.formattedName,
                        phone_number_id: presence.id,
                    },
                    presence: presence
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }

    private async sendParticipantsChange(webhook: string, participants: ParticipantEvent, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getChatById(participants.groupId);
            data.entry[0].changes.push({
                field: "participants_change",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.name,
                        phone_number_id: participants.groupId,
                    },
                    participants_change: participants
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }
    private async sendAckStatus(webhook: string, ack: Ack, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getChatById(ack.from);
            let status = "read" as StatusMessage["status"];
            if(ack.ack == 1) status = "sent";
            if(ack.ack == 2) status = "delivered";
            if(ack.ack == 3) status = "read";
            if(ack.ack == 4) status = "played";
            if(ack.ack == -1) status = "failed";
            if((ack as any).deleted) status = "deleted";

            data.entry[0].changes.push({
                field: "status",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.name,
                        phone_number_id: contact.id._serialized,
                    },
                    statuses: [{
                        messaging_product: "whatsapp",
                        message_id: ack.id._serialized,
                        status: status,
                    }]
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }
    private async sendStatusSession(webhook: string, status: string, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getChatById((await client.getHostDevice()).id);

            data.entry[0].changes.push({
                field: "session",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.name,
                        phone_number_id: contact.id._serialized,
                    },
                    session: [{
                        status: status,
                        qrCode: client.qrcode,
                        urlCode: client.urlcode,
                    }]
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }
    private async sendReaction(webhook: string, reaction: any, data: ReceivedAndGetMessage, client: ClientWhatsApp) {
        try {
            const contact = await client.getChatById((await client.getHostDevice()).id);
            const message = await client.getMessageById(reaction.msgId._serialized);

            data.entry[0].changes.push({
                field: "session",
                value: {
                    messaging_product: "whatsapp",
                    metadata: {
                        display_phone_number: contact.name,
                        phone_number_id: contact.id._serialized,
                    },
                    messages: [{
                        messaging_product: "whatsapp",
                        from: message.sender.id._serialized,
                        to: message.to,
                        id: reaction.msgId._serialized,
                        timestamp: message.timestamp,
                        type: "reaction",
                        reaction: {
                            emoji: reaction.emoji,
                            message_id: reaction.msgId._serialized,
                        }
                    }]
                }
            });
            
            await api.post(webhook, data)
        } catch (error) {
            logger.error("Error calling webook: "+error);
        }
    }
}